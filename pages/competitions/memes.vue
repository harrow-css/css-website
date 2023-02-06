<template>
  <div>

  <!-- modal for reporting a meme -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Report a meme</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div class="mb-3">
            <label for="recipient-name" class="col-form-label">Meme ID</label>
            <input type="text" class="form-control" id="recipient-name" v-model="report.memeid">
          </div>

          <div
                    style="display: block; text-align: center; height: 225px"
                    class="primarystyledcard rounded"
                  >
                    <img
                      :src="
                        'https://ucarecdn.com/' +
                        report.imageid +
                        '/'
                      "
                      alt="meme"
                      style="height: 225px; overflow:hidden;"
                    />
                  </div>


          <div class="mb-3">
            <label for="message-text" class="col-form-label">Comment</label>
            <textarea class="form-control" id="message-text" v-model="report.comments"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="submitReport()" data-bs-dismiss="modal">Send message</button>
      </div>
    </div>
  </div>
</div>


    <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Meme Competition</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              <img
                src="https://66.media.tumblr.com/tumblr_m9wk2ozqr81rfjowdo1_500.gif"
                width="100"
              />
              <br />
              Computer Science Society Competition of Internet Culture
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row my-3">
      <h1 class="col text-start">Last Week's Winners 🥇</h1>
      <h1 class="col text-end">
        Topic: <strong>{{ lastWeeksCompetition.topic }}</strong>
      </h1>
    </div>

    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <div class="col" v-for="meme, place in submittingStatus.lastWeeksWinners">
        <div class="card shadow-sm">
          <div class="card-body fw-bold display-4"><span v-if="place==0">1st Place</span> <span v-if="place==1">2nd Place</span><span v-if="place==2">3rd Place</span></div>
          

    
          <div
                    style="display: block; text-align: center; height: 225px; overflow:hidden;"
                    class="primarystyledcard rounded"
                  >
                    <img
                      :src="
                        'https://ucarecdn.com/' + meme.meme +'/'
                      "
                      alt="meme"
                      style="height: 225px; overflow:hidden;"
                    />
                  </div>

          <div class="card-body">
            <p class="card-text">{{
              meme.user.name
          }}</p>
          </div>
        </div>
      </div>
    </div>

      

      

    <div class="row my-3" v-show="votingTime">
      <h1 class="col text-start">Vote for your favourite 🗳️</h1>
      <h1 class="col text-end">
        Topic: <strong>{{ thisWeeksCompetition.topic }}</strong>
      </h1>
    </div>

    <div class="row align-items-md-stretch mb-4 mt-4" v-show="votingTime">
      <div class="col-md-12 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column"
          style="color: white"
        >
          <h1>Voting Times 🕒</h1>

          <h5>Submissions close <b>every Sunday at 9pm.</b></h5>

          <!-- convert nextSaturdayDate (a timer in milliseconds) to countdown in seconds, mins, hours and days -->
          <h1>Voting Rules ⚖️</h1>
          <ul>
            <li>You can only vote once</li>
            <li>You cannot vote for yourself</li>
            <li>Report any memes that break the rules</li>
          </ul>
        </div>
      </div>
    </div>

    <div
      class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3"
      v-show="votingTime"
    >
      <div class="col" v-for="submission in submittingStatus.compVoting">
        <div class="card shadow-sm">
          <div
            style="display: block; text-align: center; height: 225px; overflow:hidden;"
            class="primarystyledcard rounded"
          >
            <img
            
              :src="'https://ucarecdn.com/' + submission.meme + '/'"
              alt="meme"
              style="height: 225px; overflow:hidden;"
            />
          </div>

          <div class="card-body">
            <div class="row d-flex align-items-center">
              <div class="col">
               
                  <button
                    class="btn btn-primary disabled "
                    v-if="
                      submission.votes.includes(
                        $auth.$storage.getUniversal('jwt_decoded').oid
                      )
                    "
                  >
                    Voted
                  </button>
                  <button
                    class="btn btn-primary "
                    v-if="
                      !submission.votes.includes(
                        $auth.$storage.getUniversal('jwt_decoded').oid
                      )

                      && !userVoted
                    "
                    @click="voteMeme(submission._id)"
                    :disabled="userVoted"
                  >
                    <span v-if="!userVoted">Vote</span
                    >
                  </button>
                  <button class="btn btn-outline-danger" :data-bs-imageid="submission.meme" :data-bs-memeid="submission._id"  data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Report
                  </button>
                
              </div>
              <div class="col text-end">
                <p class="card-text">Votes: {{ submission.votes.length }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row my-3" v-show="!votingTime">
      <h1 class="col text-start">Submit a meme 🤣</h1>
      <h1 class="col text-end">
        Topic: <strong>{{ thisWeeksCompetition.topic }}</strong>
      </h1>
    </div>

    <div class="row align-items-md-stretch mb-4 mt-4" v-show="!votingTime">
      <div class="col-md-12 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column"
          style="color: white"
        >
          <h1>Submitting Times 🕒</h1>
          <h5>Submissions close <b>every Saturday at 2pm.</b></h5>

          <!-- convert nextSaturdayDate (a timer in milliseconds) to countdown in seconds, mins, hours and days -->
          <span>
            That's in
            {{ floorFunction(nextSaturdayDate / (1000 * 60 * 60 * 24)) }} days,
            {{
              floorFunction(
                (nextSaturdayDate -
                  floorFunction(nextSaturdayDate / (1000 * 60 * 60 * 24)) *
                    24 *
                    60 *
                    60 *
                    1000) /
                  (1000 * 60 * 60)
              )
            }}
            hours,
            {{
              floorFunction(
                ((nextSaturdayDate -
                  floorFunction(nextSaturdayDate / (1000 * 60 * 60 * 24)) *
                    24 *
                    60 *
                    60 *
                    1000) /
                  (1000 * 60 * 60) -
                  floorFunction(
                    (nextSaturdayDate -
                      floorFunction(nextSaturdayDate / (1000 * 60 * 60 * 24)) *
                        24 *
                        60 *
                        60 *
                        1000) /
                      (1000 * 60 * 60)
                  )) *
                  60
              )
            }}
            minutes and
            {{
              floorFunction(
                (((nextSaturdayDate -
                  floorFunction(nextSaturdayDate / (1000 * 60 * 60 * 24)) *
                    24 *
                    60 *
                    60 *
                    1000) /
                  (1000 * 60 * 60) -
                  floorFunction(
                    (nextSaturdayDate -
                      floorFunction(nextSaturdayDate / (1000 * 60 * 60 * 24)) *
                        24 *
                        60 *
                        60 *
                        1000) /
                      (1000 * 60 * 60)
                  )) *
                  60 -
                  floorFunction(
                    ((nextSaturdayDate -
                      floorFunction(nextSaturdayDate / (1000 * 60 * 60 * 24)) *
                        24 *
                        60 *
                        60 *
                        1000) /
                      (1000 * 60 * 60) -
                      floorFunction(
                        (nextSaturdayDate -
                          floorFunction(
                            nextSaturdayDate / (1000 * 60 * 60 * 24)
                          ) *
                            24 *
                            60 *
                            60 *
                            1000) /
                          (1000 * 60 * 60)
                      )) *
                      60
                  )) *
                  60
              )
            }}
            seconds</span
          >

          <h1>Submitting Rules ⚖️</h1>
          <ul>
            <li>
              <strong>Memes only.</strong> Please do not submit images that are
              just text. GIF's are permitted.
            </li>

            <li>
              <strong>Appropriate content:</strong> Memes should be appropriate
              for a school setting, with no offensive or inappropriate content,
              such as hate speech, bullying, or material that is not suitable
              for minors.
            </li>
            <li>
              <strong>Respectful behavior:</strong> Participants should treat
              other participants, teachers, and school staff with respect and
              professionalism in their memes.
            </li>
            <li>
              <strong>Relevance to school activities:</strong> Memes should not
              depict or reference illegal or dangerous activities that occur
              within or outside of school.
            </li>
            <li>
              <strong>Personal information:</strong>
              <u
                >Memes should not contain personal information of any students,
                teachers, or staff members.</u
              >
            </li>
            <li>
              <strong>Language:</strong> Memes should not contain language that
              is discriminatory, hate-filled, or defamatory.
            </li>
            <li>
              <strong>Moderation:</strong> The school or the organizing staff
              reserve the right to remove or disqualify memes that violate these
              content guidelines.
            </li>
            <li>
              <strong>Compliance with school policies:</strong> Participants
              must comply with all relevant school policies and guidelines for
              student conduct.
            </li>
          </ul>

          <h5>
            Normal School rules apply.
            <u>Offensive content will be reported to NP.</u>
          </h5>

          <br />

          <div class="input-group mb-3">
            <div>
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                aria-label="Checkbox for following text input"
                v-model="submittingRules"
              />
            </div>
            <label class="form-check-label px-3" for="flexCheckDefault">
              I agree to the rules above in practice and in spirit.
            </label>
          </div>

          <br />

          <div v-show="submittingRules">
            <h1>Upload your meme 📁</h1>
            <h5>
              This week's topic is <u>{{ thisWeeksCompetition.topic }}</u>
            </h5>
            <p>
              You're allowed to upload
              {{ 2 - thisWeeksUserMemes.length }} memes. <br />
              Memes can only be uploaded once, and cannot be reuploaded or
              edited
            </p>
            <p></p>
          </div>

          <div v-show="submittingRules">
            <div
              class="row row-cols-1 row-cols-sm-2 row-cols-md-2 g-3 text-black"
            >
              <div class="col">
                <div
                  class="card shadow-sm"
                  v-if="thisWeeksUserMemes[0]"
                >
                  <div
                    style="display: block; text-align: center; height: 225px"
                    class="primarystyledcard rounded"
                  >
                    <img
                      :src="
                        'https://ucarecdn.com/' +
                        thisWeeksUserMemes[0].meme +
                        '/'
                      "
                      alt="meme"
                      style="height: 225px; overflow:hidden;"
                    />
                  </div>

                  <div class="card-body">
                    <p>You've already uploaded this meme</p>
                  </div>
                </div>

                <div
                  class="card shadow-sm"
                  v-if="!thisWeeksUserMemes[0]"
                >
                  <div
                    v-if="submittingMemes[1].status == 'uploading...'"
                    style="display: block; text-align: center; height: 225px"
                    class="primarystyledcard rounded"
                  >
                    <div class="spinner-border text-light" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <div
                    v-if="submittingMemes[1].file"
                    style="display: block; text-align: center; height: 225px; overflow:hidden;"
                    class="primarystyledcard rounded"
                  >
                    <img
                      :src="
                        'https://ucarecdn.com/' + submittingMemes[1].file + '/'
                      "
                      alt="meme"
                      style="height: 225px; overflow:hidden;"
                    />
                  </div>
                  <div
                    v-if="
                      !submittingMemes[1].file &&
                      submittingMemes[1].status != 'uploading...'
                    "
                  >
                    <svg
                      class="bd-placeholder-img card-img-top"
                      width="100%"
                      height="225"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Placeholder: Thumbnail"
                      preserveAspectRatio="xMidYMid slice"
                      focusable="false"
                    >
                      <rect width="100%" height="100%" fill="#393939"></rect>
                    </svg>
                  </div>

                  <div class="card-body">
                    <form id="uploadMemes1">
                      <input
                        class="form-control"
                        type="file"
                        id="uploadMemesInput1"
                        @change="uploadFile(1)"
                        accept="image/*"
                      />
                    </form>
                  </div>
                </div>
              </div>
              <div class="col">
                <div
                  class="card shadow-sm"
                  v-if="thisWeeksUserMemes[1]"
                >
                  <div
                    style="display: block; text-align: center; height: 225px"
                    class="primarystyledcard rounded"
                  >
                    <img
                      :src="
                        'https://ucarecdn.com/' +
                        thisWeeksUserMemes[1].meme +
                        '/'
                      "
                      alt="meme"
                      style="height: 225px; overflow:hidden;"
                    />
                  </div>

                  <div class="card-body">
                    <p>You've already uploaded this meme</p>
                  </div>
                </div>

                <div
                  class="card shadow-sm"
                  v-if="!thisWeeksUserMemes[1]"
                >
                  <div
                    v-if="submittingMemes[2].status == 'uploading...'"
                    style="display: block; text-align: center; height: 225px"
                    class="primarystyledcard rounded"
                  >
                    <div class="spinner-border text-light" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <div
                    v-if="submittingMemes[2].file"
                    style="display: block; text-align: center"
                    class="primarystyledcard rounded"
                  >
                    <img
                      :src="
                        'https://ucarecdn.com/' + submittingMemes[2].file + '/'
                      "
                      alt="meme"
                      style="height: 225px; overflow:hidden;"
                    />
                  </div>
                  <div
                    v-if="
                      !submittingMemes[2].file &&
                      submittingMemes[2].status != 'uploading...'
                    "
                  >
                    <svg
                      class="bd-placeholder-img card-img-top"
                      width="100%"
                      height="225"
                      xmlns="http://www.w3.org/2000/svg"
                      role="img"
                      aria-label="Placeholder: Thumbnail"
                      preserveAspectRatio="xMidYMid slice"
                      focusable="false"
                    >
                      <rect width="100%" height="100%" fill="#393939"></rect>
                    </svg>
                  </div>

                  <div class="card-body">
                    <form id="uploadMemes2">
                      <input
                        class="form-control"
                        type="file"
                        id="uploadMemesInput2"
                        @change="uploadFile(2)"
                        accept="image/*"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <button
              class="btn btn-primary mt-3"
              @click="submitMemes()"
              :disabled="thisWeeksUserMemes.length >= 2"
            >
              <span v-if="thisWeeksUserMemes.length < 2">Submit</span>
              <span v-else
                >You've hit your submission limit for this week!</span
              >
            </button>

            <br />
            <br />
            <h3 v-if="thisWeeksUserMemes.length >= 1">
              Make sure to look out for voting from <u>Saturday at 2pm</u>!
            </h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.secondarystyledcard > h1 {
  font-size: 2rem;
}

.secondarystyledcard > p {
  font-size: 1rem;
}

.primarystyledcard {
  background-color: #393939;
  color: #fffbfe;
}

.secondarystyledcard {
  background-color: #7a7d7d;
  color: #fffbfe;
}
</style>

<script>
export default {
  mounted() {
    this.updateNow()
    setInterval(this.updateNow.bind(this), 1000)

    const exampleModal = document.getElementById('exampleModal')
exampleModal.addEventListener('show.bs.modal', (event) => {
  // Button that triggered the modal
  const button = event.relatedTarget
  // Extract info from data-bs-* attributes
  const imageid = button.getAttribute('data-bs-imageid')
  const memeid = button.getAttribute('data-bs-memeid')
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  const modalTitle = exampleModal.querySelector('.modal-title')
  const modalBodyInput = exampleModal.querySelector('.modal-body input')

  this.report.memeid =  memeid
  this.report.imageid  = imageid
})

  },

  async asyncData({ $axios }) {
    const competitionDetails = await $axios.$get('getMemeCompetitionDetails')
    const submittingStatus = await $axios.$get('getUserAndPlatformMemeStatus')

    return { competitionDetails, submittingStatus }
  },

  data() {
    return {
      report: {
        memeid: null,
        imageid: null,
        comments: null
      },
      submittingStatus: null,
      dateTimeNow: new Date(),
      submittingRules: false,
      submittingMemes: {
        1: {
          file: null,
          status: null,
        },

        2: {
          file: null,
          status: null,
        },
      },
    }
  },

  computed: {
    userVoted: {
      get() {
        // for each meme in submittingStatus.compVoting, check if the user has voted
        for (let meme in this.submittingStatus.compVoting) {
          if (
            this.submittingStatus.compVoting[meme].votes.includes(
              this.$auth.$storage.getUniversal('jwt_decoded').oid
            )
          ) {
            return true
          }
        }
        return false
      },
    },
    lastWeeksCompetition: {
      get() {
        // get the date of last last monday (2 mondays ago)
        let lastMonday = new Date()
        lastMonday.setDate(
          lastMonday.getDate() - ((lastMonday.getDay() + 6) % 7) - 7
        )

        // get the date in yyyy-mm-dd
        let lastMondayString = lastMonday.toISOString().split('T')[0]

        // check if the yyyy-mm-dd is in the competitionDetails object
        if (this.competitionDetails.calendar[lastMondayString]) {
          return {
            topic: this.competitionDetails.calendar[lastMondayString],
            startday: lastMondayString,
          }
        } else {
          return null
        }
      },
    },
    thisWeeksCompetition: {
      get() {
        // get the date of last monday
        let lastMonday = new Date()
        lastMonday.setDate(
          lastMonday.getDate() - ((lastMonday.getDay() + 6) % 7)
        )

        // get the date in yyyy-mm-dd
        let lastMondayString = lastMonday.toISOString().split('T')[0]

        // check if the yyyy-mm-dd is in the competitionDetails object
        if (this.competitionDetails.calendar[lastMondayString]) {
          return {
            topic: this.competitionDetails.calendar[lastMondayString],
            startday: lastMondayString,
          }
        } else {
          return null
        }
      },
    },
    thisWeeksUserMemes:{ 
      get() {
        // get the date of last monday
        let lastMonday = new Date()

        lastMonday.setDate(
          lastMonday.getDate() - ((lastMonday.getDay() + 6) % 7)
        )

        // get the date in yyyy-mm-dd
        let lastMondayString = lastMonday.toISOString().split('T')[0]

        // return memes in submittingStatus.usermemes that are from this week
        return this.submittingStatus.usermemes.filter(meme => meme.round.startday == lastMondayString)

      }
    },
    votingTime: {
      get() {
        // return true if the day is saturday after 2pm or sunday before 9pm
        // return false;
        return (
          (this.dateTimeNow.getDay() == 6 &&
            this.dateTimeNow.getHours() >= 14) ||
          (this.dateTimeNow.getDay() == 0 && this.dateTimeNow.getHours() < 21)
        )
      },
    },
    nextSaturdayDate: {
      // return number of seconds until next Saturday at 2pm using dateTimeNow variable as a reference
      get() {
        let nextSaturday = new Date(this.dateTimeNow)
        nextSaturday.setDate(
          this.dateTimeNow.getDate() + ((6 + 7 - this.dateTimeNow.getDay()) % 7)
        )
        nextSaturday.setHours(14)
        nextSaturday.setMinutes(0)
        nextSaturday.setSeconds(0)
        nextSaturday.setMilliseconds(0)
        return nextSaturday - this.dateTimeNow
      },
    },
  },
  methods: {
    async submitReport() {
      console.log('submitting report')
      // submit using a post request to the api
      const response = await this.$axios.$post('postMemeReport', {
        memeid: this.report.memeid,
        imageid: this.report.imageid,
        comments: this.report.comments,
        user: {
          id: this.$auth.$storage.getUniversal('jwt_decoded').oid,
          name: this.$auth.$storage.getUniversal('jwt_decoded').name,
          email: this.$auth.$storage.getUniversal('jwt_decoded').upn,
        },
      })
      console.log(response)
    },
  
    floorFunction(input) {
      return Math.floor(input)
    },
    updateNow() {
      this.dateTimeNow = new Date()
    },
    async submitMemes() {
      console.log('submitting memes')
      // check if the user has submitted meme 1
      if (
        this.submittingMemes[1].status == 'done' &&
        !this.submittingStatus.usermemes[0]
      ) {
        // submit using a post request to the api
        const response = await this.$axios.$post('postMeme', {
          meme: this.submittingMemes[1].file,
          round: this.thisWeeksCompetition,
          user: {
            id: this.$auth.$storage.getUniversal('jwt_decoded').oid,
            name: this.$auth.$storage.getUniversal('jwt_decoded').name,
            email: this.$auth.$storage.getUniversal('jwt_decoded').upn,
          },
          votes: {},
        })

        console.log(this.$auth.user)
        console.log(response)

        this.updateSubmittingStatus()
      }

      if (
        this.submittingMemes[2].status == 'done' &&
        !this.submittingStatus.usermemes[1]
      ) {
        // submit using a post request to the api
        const response = await this.$axios.$post('postMeme', {
          meme: this.submittingMemes[2].file,
          round: this.thisWeeksCompetition,
          user: {
            id: this.$auth.$storage.getUniversal('jwt_decoded').oid,
            name: this.$auth.$storage.getUniversal('jwt_decoded').name,
            email: this.$auth.$storage.getUniversal('jwt_decoded').upn,
          },
          votes: {},
        })

        console.log(this.$auth.user)
        console.log(response)

        this.updateSubmittingStatus()
      }
    },
    async uploadFile(num) {
      const form = document.getElementById('uploadMemes' + num)

      const fileInput = document.getElementById('uploadMemesInput' + num)

      const formData = new FormData(form)
      formData.append('file', fileInput.files[0])

      // const form = new FormData();
      formData.append('UPLOADCARE_PUB_KEY', '3d395e3f484a5b742e04')
      // UPLOADCARE_AUTOSTORE = true;
      formData.append('UPLOADCARE_STORE	', '1')
      // form.append('my_file.jpg', File(['<data goes here>'], 'my_file.jpg'));

      this.submittingMemes[num].status = 'uploading...'

      const response = await fetch('https://upload.uploadcare.com/base/', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          return data
        })

      this.submittingMemes[num].status = 'done'

      this.submittingMemes[num].file = response.file

      console.log(response)
    },
    async voteMeme(id) {
      const response = await this.$axios.$post('postMemeVote', {
        memeId: id,
        userVoting: {
          id: this.$auth.$storage.getUniversal('jwt_decoded').oid,
        },
      })

      this.updateSubmittingStatus()
    },
    async updateSubmittingStatus() {
      this.submittingStatus = await this.$axios.$get(
        'getUserAndPlatformMemeStatus'
      )
    },
  },

  middleware: 'isAuthenticated',
}
</script>
