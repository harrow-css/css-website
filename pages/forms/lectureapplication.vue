<template>
  <div>
    <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Form</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              Form 02: Apply for a Lecture
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch mb-4 mt-4">
      <div class="col-md-12 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column"
        >
          <h4>Spring 2023</h4>
          <h1>
            <i
              >You're submiting this form as
              <u
                >{{ this.$auth.$storage.getUniversal('jwt_decoded').name }}
                {{
                  this.$auth.$storage.getUniversal('jwt_decoded').family_name
                }}</u
              ></i
            >
          </h1>

          <br />

          <h1>About You</h1>
          <h3 class="mt-2">What year group are you in?</h3>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioYear"
              id="RadioYearGroup"
              value="U6"
              v-model="RadioYearGroup"
            />
            <label class="form-check-label" for="RadioYearGroup">
              Upper Sixth
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioYear"
              id="RadioYearGroup"
              value="L6"
              v-model="RadioYearGroup"
            />
            <label class="form-check-label" for="RadioYearGroup">
              Lower Sixth
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioYear"
              id="RadioYearGroup"
              value="Fifth"
              v-model="RadioYearGroup"
            />
            <label class="form-check-label" for="RadioYearGroup">
              Fifth Form
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioYear"
              id="RadioYearGroup"
              value="Remove"
              v-model="RadioYearGroup"
            />
            <label class="form-check-label" for="RadioYearGroup">
              Remove
            </label>
          </div>
          <div class="form-check">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioYear"
              id="RadioYearGroup"
              value="Shell"
              v-model="RadioYearGroup"
            />
            <label class="form-check-label" for="RadioYearGroup"> Shell </label>
          </div>

          <h3 class="mt-2">What house are you in?</h3>
          <div class="form-check" v-for="(initial, house) in houselist">
            <input
              class="form-check-input"
              type="radio"
              name="flexRadioHouse"
              id="RadioHouse"
              :value="initial"
              v-model="RadioHouse"
            />
            <label class="form-check-label" for="RadioHouse">
              {{ house }}
            </label>
          </div>

          <h3 class="mt-2">Is this a group lecture?</h3>
          <div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                v-model="JointLectureBool"
              />
              <label class="form-check-label" for="flexSwitchCheckDefault"
                ><span v-if="!JointLectureBool">No</span
                ><span v-if="JointLectureBool">Yes</span></label
              >
            </div>
            <div></div>
            <div v-if="JointLectureBool">
              <h3 class="mt-2">How many other speakers are there?</h3>
              <input
                type="number"
                class="form-control"
                min="1"
                max="3"
                style="width: 5vw"
                v-model="SpeakerNumber"
              />
              <h3 class="mt-2">
                What's the email address(es) of the other speaker(s)?
              </h3>
              <div>
                <input
                  type="text"
                  class="form-control"
                  placeholder="example@harrowschool.org.uk"
                  v-model="ExtraSpeaker"
                />
              </div>
            </div>
          </div>

          <h3 class="mt-2">Have you given a lecture before at Harrow?</h3>
          <div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                v-model="LectureAlreadyGiven"
              />
              <label class="form-check-label" for="flexSwitchCheckDefault"
                ><span v-if="!LectureAlreadyGiven">No</span
                ><span v-if="LectureAlreadyGiven">Yes</span></label
              >
            </div>
          </div>

          <h1>About Your Lecture</h1>

          <h3 class="mt-2">Is your lecture joint with another society?</h3>
          <div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                v-model="SocietyLectureBool"
              />
              <label class="form-check-label" for="flexSwitchCheckDefault"
                ><span v-if="!SocietyLectureBool">No</span
                ><span v-if="SocietyLectureBool">Yes</span></label
              >
            </div>
          </div>

          <h3 class="mt-2">Is your lecture overclocked?</h3>
          <p>
            We will have already told you via email if it is, please confirm
            below.
          </p>
          <div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                v-model="Overclocked"
              />
              <label class="form-check-label" for="flexSwitchCheckDefault"
                ><span v-if="!Overclocked">No</span
                ><span v-if="Overclocked">Yes</span></label
              >
            </div>
          </div>

          <h3 class="mt-2">What's the title of your lecture?</h3>
          <p>
            The title should be short and informative about the content of your
            lecture.
          </p>
          <input
            type="text"
            class="form-control"
            v-model="LectureTitle"
            placeholder="A great title."
          />

          <h3 class="mt-2">What's the strapline of your lecture?</h3>
          <p>
            The title should be about two sentences long and will be used on
            society posters
          </p>
          <textarea
            class="form-control"
            v-model="LectureStrapline"
            rows="2"
            placeholder="An introduction to their uses, products and technologies."
          ></textarea>

          <h3 class="mt-2">What's the description of your lecture?</h3>
          <p>
            The description can be a little longer. Give us a short introduction
            to your topic. This text won't be displayed on posters, but will
            help us pick images for posters and will appear on the society
            website
          </p>
          <textarea
            class="form-control"
            v-model="LectureDescription"
            rows="3"
            placeholder="We discuss the way the computer developed, starting with the Antikythera mechanism and telling it's story all the way to quantum computers, these changes are visible in architecture and component developments..."
          ></textarea>

          <h3 class="mt-2">Have you already made the presentation slides?</h3>
          <div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                v-model="SlidesAlreadyDone"
              />
              <label class="form-check-label" for="flexSwitchCheckDefault"
                ><span v-if="!SlidesAlreadyDone">No</span
                ><span v-if="SlidesAlreadyDone">Yes</span></label
              >
            </div>
          </div>

          <h1 class="mt-2">Wrapping up</h1>
          <h3 class="mt-2">Do you have any final comments or requirements?</h3>
          <textarea
            class="form-control"
            v-model="comments"
            rows="3"
            placeholder="We need a whiteboard for performing crazy complicated maths..."
          ></textarea>

          <h3 class="mt-2">Do you want an email copy of your response?</h3>
          <div>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                v-model="EmailMeACopy"
                checked
              />
              <label class="form-check-label" for="flexSwitchCheckDefault"
                ><span v-if="!EmailMeACopy">No</span
                ><span v-if="EmailMeACopy">Yes</span></label
              >
            </div>
          </div>

          <button
            @click="senddata"
            class="btn btn-lg btn-primary mt-2"
            style="width: 10vw"
            type="submit"
            v-if="sendstage != 10"
            :disabled="sendstage!=0"
          >
            <span v-if="sendstage == 0">Submit</span>
            <span v-if="sendstage == 1"
              ><div class="spinner-border text-light" role="status"></div
            ></span>
            <span v-if="sendstage == 2">✔️</span>
          </button>

          <span v-if="sendstage == 2">Thank you for submitting</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.primarystyledcard {
  background-color: #393939;
  color: #fffbfe;
}

.secondarystyledcard {
  background-color: #7a7d7d;
  color: #fffbfe;
}
.card {
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover !important;
  transition: 0.3s;
}
</style>

<script>
export default {
  data() {
    return {
      EmailMeACopy: true,
      comments: '',
      LectureStrapline: '',
      SlidesAlreadyDone: false,
      Overclocked: false,
      SocietyLectureBool: false,
      SpeakerNumber: 1,
      ExtraSpeaker: '',
      LectureAlreadyGiven: false,
      JointLectureBool: false,
      sendstage: 0,
      RadioYearGroup: this.$auth.$storage
        .getUniversal('jwt_decoded')
        .name.split('(')[1]
        .split(')')[0]
        .split('-')[1],
      houselist: {
        'West Acre': 'W',
        Newlands: 'N',
        Bradbys: 'B',
        'The Park': 'P',
        Moretons: 'M',
        Druries: 'D',
        "The Headmaster's": 'H',
        'The Grove': 'G',
        Rendalls: 'R',
        'The Knoll': 'K',
        Elmfield: 'E',
        Lyons: 'L',
      },
      RadioHouse: this.$auth.$storage
        .getUniversal('jwt_decoded')
        .name.split('(')[1]
        .split(')')[0]
        .split('-')[0],
    }
  },
  mounted() {
    console.log(
      this.$auth.$storage
        .getUniversal('jwt_decoded')
        .name.split('(')[1]
        .split(')')[0]
    )
  },
  middleware: 'isAuthenticated',
  methods: {
    senddata() {
      this.sendstage = 1
      this.$axios
        .$post('postFormLectureApplication', {
          lecturedetails: {
            title: this.LectureTitle,
            description: this.LectureDescription,
            strapline: this.LectureStrapline,
          },
          lecturemeta: {
            jointWithSociety: this.SocietyLectureBool,
            slidesAreadyDone: this.SlidesAlreadyDone,
            overclocked: this.Overclocked,
          },
          people: {
            mainspeaker: {
              lectureAlreadyGiven: this.LectureAlreadyGiven,
              name: this.$auth.$storage.getUniversal('jwt_decoded').name,
              house: this.RadioHouse,
              yeargroup: this.RadioYearGroup,
              email:
                this.$auth.$storage.getUniversal('jwt_decoded').unique_name,
              oid: this.$auth.$storage.getUniversal('jwt_decoded').oid,
            },
            isGroupLecture: this.JointLectureBool,
            extraSpeaker: this.ExtraSpeaker,
            speakerNumbers: this.SpeakerNumber,
          },
          comments: this.comments,
          EmailMeACopy: this.EmailMeACopy,
        })
        .then(() => {
          this.sendstage = 2
        })
    },
  },
}
</script>
