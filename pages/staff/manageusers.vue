<template>
  <div>
    <div>
      <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid">
          <h1>Search for a user</h1>
          <div class="pb-3">
            <div
              class="form-check"
              v-for="elemsearchtype in ['First Name', 'Surname', 'Email']"
            >
              <input
                class="form-check-input"
                type="radio"
                name="flexRadioDefault"
                id="flexRadioDefault1"
                v-model="searchtype"
                :value="elemsearchtype"
              />
              <label class="form-check-label" for="flexRadioDefault1">
                {{ elemsearchtype }}
              </label>
            </div>
          </div>

          <div
            class="dropdown-menu d-block position-static pt-0 mx-0 rounded-3 shadow overflow-hidden w-280px"
          >
            <form class="p-2 mb-2 bg-light border-bottom">
              <input
                type="search"
                class="form-control"
                autocomplete="false"
                placeholder="Type to filter..."
                v-model="search"
              />
            </form>
            <ul class="pl-3 mb-0" style="list-style: none; cursor: pointer">
              <li
                v-for="user in filteredsearchedusers"
                @click="viewuser = user"
              >
                <span v-if="searchtype == 'First Name'">
                  <b>{{ user.given_name }}</b> {{ user.family_name }}
                </span>
                <span v-if="searchtype == 'Surname'">
                  {{ user.given_name }} <b>{{ user.family_name }}</b>
                </span>
                <span v-if="searchtype == 'Email'">
                  {{ user.email }}
                </span>

                <span v-if="user == viewuser">
                  <span
                    class="d-inline-block bg-success rounded-circle p-1"
                  ></span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="p-5 mb-4 bg-light rounded-3" v-if="viewuser">
        <div class="container-fluid py-2">
          <h1>{{ viewuser.given_name }} {{ viewuser.family_name }}</h1>
          <p>{{ viewuser.email }}</p>
          <p>{{ viewuser.points }} points</p>

          <table class="table">
            <thead>
              <tr>
                <th scope="col">Reason</th>
                <th scope="col">Amount</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in viewuser.record">
                <td>{{ item.reason }}</td>
                <td>{{ item.points }}</td>
                <td>
                  {{ new Date(item.date).toLocaleDateString() }}
                </td>
              </tr>
            </tbody>
          </table>

          <i
            >* Note, not all points are shown on the register as it was a
            feature added later on.</i
          >

          <br>
          <br>

          <p>
          <span>HMSU Awarded: {{ viewuser.awardedHMSU || false}}</span><br>
          <span>Tie Awarded: {{ viewuser.awardedTie || false}}</span>
          <span>Pi Awarded: {{ viewuser.awardedpi || false}}</span>
          </p>

            
          <h2 class="pt-3">Award points</h2>

          <textarea style="width:80%" v-model="pointsbuffer.reason" placeholder="Reason" />
          <br>
          <input v-model="pointsbuffer.points" placeholder="bits" /> 

          <button
            @click="
              awardPoints(
                parseInt(pointsbuffer.points),
                viewuser._id,
                pointsbuffer.reason
              )
            "
            class="btn btn-primary"
          >
            send data
          </button>

          ( {{pointsbuffer.points}} bits, {{pointsbuffer.points/8}} bytes)
        </div>
      </div>

      <!--
      <p v-for="user in users">
        {{ user.given_name }} {{ user.family_name }} {{ user._id }} {{ user }}
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'isAuthenticated',
  data() {
    return {
      viewuser: null,
      pointsbuffer: {
        id: '',
        reason: '',
        points: 0,
      },
      searchtype: 'First Name',
      search: '',
    }
  },
  async asyncData({ $axios }) {
    const users = await $axios.$get('getUsers')
    return { users }
  },
  computed: {
    filteredsearchedusers() {
      return this.users.filter((user) => {
        // if more than 3 letters are typed in the search bar, filter the users
        if (this.search.length > 1) {
          if (this.searchtype == 'First Name') {
            return user.given_name
              .toLowerCase()
              .includes(this.search.toLowerCase())
          } else if (this.searchtype == 'Surname') {
            return user.family_name
              .toLowerCase()
              .includes(this.search.toLowerCase())
          } else if (this.searchtype == 'Email') {
            return user.email.toLowerCase().includes(this.search.toLowerCase())
          }
        }
      })
    },
  },
  methods: {
    async awardPoints(points, oid, reason) {
      await this.$axios
        .$post('postAwardPoints', {
          points: points,
          oid: oid,
          reason: reason,
        })
        .then((response) => {
          console.log('Points awarded successfully')
          alert("Points awarded successfully")
        })
        .catch((error) => {
          console.log(error)
          console.log('Error awarding points')
        })
      this.users = await this.$axios.$get('getUsers')
    },
  },
}
</script>
