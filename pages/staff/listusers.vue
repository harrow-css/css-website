<template>
  <div>
    <div>
      <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid">

        <table class="table">
  <thead>
    <tr>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Email</th>
      <th scope="col">Points</th>
      <th scope="col">Eligibility</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="user in users">
      <td>{{ user.given_name }}</td>
      <td>{{ user.family_name }}</td>
      <td>{{ user.email }}</td>
      <td>{{ user.points}}</td>
      <td><span class="badge bg-primary" v-if=" user.points >= 48">Tie</span></td>
    </tr>
  </tbody>
</table>

  
        </div>
      </div>


     
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
  async asyncData({ $axios, context }) {
    const users = await $axios.$get('getUsers?id=' + context.app.$auth.$storage.getUniversal('jwt_decoded').oid)

    // sort users on user.points, treat undefinded as 0
    users.sort((a, b) => {
      return (b.points || 0) - (a.points || 0)
    })

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
