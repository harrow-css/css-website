<template>
  <div>
    <h1>Harrow School Advent of Code 2022 Leaderboard</h1>

    <div class="card mb-3">
      <div class="card-body">
        <p>Join our board ID <code>1521149-62ec2e41</code> <a href="https://adventofcode.com/2022">here</a> to compete with us.</p>
      </div>
    </div>

    <table class="table">
      <thead>
        <tr class="border-bottom border-dark">
          <th scope="col">#</th>
          <th scope="col">Points</th>
          <th scope="col">Total Stars</th>

          <th v-for="MonthNumber in new Date().getDate()"><a style="text-decoration:none" :href="'https://adventofcode.com/2022/day/'+MonthNumber">{{ MonthNumber }}</a></th>

          <th scope="col"><span class="float-end">Name</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(member, index) in membersArray">
          <th scope="col">{{ index + 1 }}</th>
          <th>{{ member.local_score }}</th>
          <th>{{ member.stars }}</th>

          <th v-for="MonthNumber in new Date().getDate()" scope="col">
            <span v-if="member.completion_day_level[MonthNumber.toString()]">
              <span
                v-if="
                  Object.keys(
                    member.completion_day_level[MonthNumber.toString()]
                  ).length == 1
                "
                >★</span
              >
              <span
                v-if="
                  Object.keys(
                    member.completion_day_level[MonthNumber.toString()]
                  ).length == 2
                "
                >⭐</span
              >
            </span>
          </th>

          <td>
            <span class="float-end">{{ member.name }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-7">
            <h6 class="float-start">
              Last Updated <b>{{ new Date(advent[0].timestamp) }}</b>
            </h6>
          </div>
          <div class="col-5">
            <h6 class="float-end">
              Next Update in <b>{{ mins }} minutes</b> and <b>{{seconds}} seconds</b></b>
            </h6>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-2">
      <div class="card-body">
        <h3>How this leaderboard works</h3>
        <img src="~assets/images/howitworks.jpg" class="img-fluid"> 
      </div>
    </div>

    
    
  </div>
</template>

<script>
export default {
  middleware: 'isAuthenticated',
  data() {
    return {
      interval: null,
      mins: null,
      seconds: null
    }
  },
  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval)
  },
  created() {
    // update the time every second
    this.interval = setInterval(() => {
      // Concise way to format time according to system locale.
      // In my case this returns "3:48:00 am"
      
        // return the number of mins until the next 15 min mark
        const mins = 15 - new Date().getMinutes() % 15

        // return the number of seconds until the next minute
        const seconds = 60 - new Date().getSeconds()
        
        this.mins = mins
        this.seconds = seconds

        //refresh the page if mins = 0
        if (mins == 0 && seconds == 0) {
          location.reload()
        }

    }, 1000)
  },
  async asyncData({ $axios }) {
    var advent = await $axios.$get('/getAdvent')
    var members = advent[0].data.members

    // convert members to array
    var membersArray = Object.keys(members).map(function (key) {
      return members[key]
    })

    // sort members by local_score
    membersArray = membersArray.sort(function (a, b) {
      return b.local_score - a.local_score
    })

    return { membersArray, advent }
  },
}
</script>
