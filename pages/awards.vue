<template>
  <div>
  <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Awards</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              Check out society rewards
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
          <div class="row align-items-start">
            <div class="col-lg-12">
              <h1>
                You've got
                <i
                  >{{ Math.floor(userpoints / 8) }} byte<span
                    v-if="Math.floor(userpoints / 8) || userpoints < 8"
                    >s</span
                  >
                  <span v-if="userpoints % 8 != 0"
                    >and {{ userpoints % 8 }} bit<span
                      v-if="userpoints % 8 != 1"
                      >s</span
                    ></span
                  >
                </i>
              </h1>
            </div>
          </div>

          <div v-if="userpoints < 32">
            <h3 class="mt-5">
              You're {{ Math.round((userpoints * 100) / 32) }}% of the way to a
              head masters send up!
            </h3>
            <div class="progress mt-2">
              <div
                class="progress-bar"
                role="progressbar"
                :style="'width: ' + Math.round((userpoints * 100) / 32) + '%'"
                :aria-valuenow="Math.round((userpoints * 100) / 32)"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>

          <div v-if="userpoints >= 32">
            <h3 class="mt-5">
              🎉 Congrats, you're due a head master's send up!
            </h3>
          </div>

          <div v-if="userpoints < 48">
            <h3 class="mt-5">
              You're {{ Math.round((userpoints * 100) / 48) }}% of the way to
              the society tie!
            </h3>
            <div class="progress mt-2">
              <div
                class="progress-bar"
                role="progressbar"
                :style="'width: ' + Math.round((userpoints * 100) / 48) + '%'"
                :aria-valuenow="Math.round((userpoints * 100) / 48)"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>

          <div v-if="userpoints >= 48">
            <h3 class="mt-5">🎉 Congrats, you're due the society tie!</h3>
          </div>

          <div v-if="userpoints < 80">
            <h3 class="mt-5">
              You're {{ Math.round((userpoints * 100) / 80) }}% of the way a
              raspberry pi zero!
            </h3>
            <div class="progress mt-2">
              <div
                class="progress-bar"
                role="progressbar"
                :style="'width: ' + Math.round((userpoints * 100) / 80) + '%'"
                :aria-valuenow="Math.round((userpoints * 100) / 80)"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>

          <div v-if="userpoints >= 80">
            <h3 class="mt-5">🎉 Congrats, you're due a raspberry pi zero!</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-2 g-4">
      <div class="col" style="height: 400px">
 
          <div
            class="card card-cover h-100 overflow-hidden rounded-4 shadow"
            v-bind:style="
              'background: linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' +
              require(`~/assets/images/tie.jpg`) +
              '); '
            "
          >
            <div
              class="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 pt-6"
            >
              
            </div>
          </div>
      </div>
      <div class="col" style="height: 400px">

          <div
            class="card card-cover h-100 overflow-hidden rounded-4 shadow"
            v-bind:style="
              'background: linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' +
              require(`~/assets/images/rpi.jpg`) +
              '); '
            "
          >
            <div
              class="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 pt-6"
            >
              
            </div>
          </div>
      </div>
    </div>

    <div class="row align-items-md-stretch mb-4 mt-4">
      <div class="col-md-12 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column" style="color:white"
        >
          <h1>How do I get bits and bytes?</h1>
          <table class="table" style="color:inherit">
            <thead>
              <tr>
                <th scope="col">Activity</th>
                <th scope="col">Reward (in Bytes)</th>
                <th scope="col">Reward (in Bits)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Leading a project</td>
                <td>5</td>
                <td>40</td>
              </tr>
              <tr>
                <td>Participating in a project</td>
                <td>4</td>
                <td>32</td>
              </tr>
              <tr>
                <td>Giving a lecture *</td>
                <td>3</td>
                <td>24</td>
              </tr>
              <tr>
                <td>Writing a challenge question</td>
                <td>2</td>
                <td>16</td>
              </tr>
              <tr>
                <td>Doing a Harrovian writeup *</td>
                <td>1</td>
                <td>8</td>
              </tr>
              <tr>
                <td>Solving a hackathon challenge question (+ unique solution)</td>
                <td>1</td>
                <td>8</td>
              </tr>
              <tr>
                <td>Attending a lecture</td>
                <td>0.5</td>
                <td>4</td>
              </tr>

              <tr>
                <td>Winner of <a style="color:white;" href="/memes">weekly meme competition</a> &nbsp; <span class="badge bg-primary">New</span></td>
                <td>0.5</td>
                <td>4</td>
              </tr>
               <tr>
                <td>Runner up in <a style="color:white;" href="/memes">weekly meme competition</a> &nbsp; <span class="badge bg-primary">New</span></td>
                <td>0.25</td> 
                <td>2</td>
              </tr>

            </tbody>
          </table>

          <p>* eligible for overclocking </p>
          
          <div class="my-3"></div>

          <h1>What are the reward thresholds?</h1>
          <table class="table" style="color:inherit">
            <thead>
              <tr>
                <th scope="col">Reward</th>
                <th scope="col">Threshold (in Bytes)</th>
                <th scope="col">Threshold (in Bits)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Head Master's Send-Up</td>
                <td>4</td>
                <td>32</td>
              </tr>
              <tr>
                <td><a href="https://www.theschoolwearspecialists.co.uk/computer-science-silk-tie-p1971.html#size=44" style="color:white;">Society Tie</a></td>
                <td>6</td>
                <td>48</td>
              </tr>
              <tr>
                <td><a href="https://www.raspberrypi.com/products/raspberry-pi-zero/" style="color:white;">RPi Zero</a></td>
                <td>10</td>
                <td>80</td>
              </tr>
            </tbody>
          </table>

          <div class="my-3"></div>

          <h1>What's Overclocking?</h1>
          <p>Overclocking is a society initiative to encourage members to give lectures at the start of term. If you apply to do one of the first three lectures (or writeups) of a term, you will gain an extra byte</p>

          <div class="my-3"></div>
          <h1>What are bits and bytes?</h1>
          <p>Bits and Bytes are the society points system units. You can earn bits and bytes by doing activities such as leading a project, giving a lecture, or writing a challenge question. You can then spend your bits and bytes on rewards such as a raspberry pi zero, a society tie, or a headmaster's send-up.</p>
          <p>We hope it doesn't need explaining that 8 bits are worth one byte</p>

        </div>
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  middleware: 'isAuthenticated',
  async asyncData(context) {
    const userpoints = await context.$axios.$get(
      'getUser?id=' + context.app.$auth.$storage.getUniversal('jwt_decoded').oid
    )

    return {
      userpoints: userpoints[0].points,
      userdata: context.app.$auth.$storage.getUniversal('jwt_decoded'),
    }
  },
}
</script>

<style scoped>
.card {
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover !important;
  border:0
}
</style>

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
