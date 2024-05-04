<template>
  <div />
</template>

<script>
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

export default {
  methods: {
    postNewUser() {
      var userdata  = this.$auth.$storage.getUniversal('jwt_decoded')

      return this.$axios.post('/postNewUser', { data: userdata } )
        .then(response => {
          // Handle the response here

          // Continue with the rest of your code
        })
        .catch(error => {
          // Handle the error here
          console.error(error)
        })
    }
  },
  mounted () {
    var token = this.$auth.$storage.getUniversal('_token.aad')
    
    const decodedBearer = jwt_decode(token)

    this.$auth.$storage.setUniversal('jwt_decoded', decodedBearer)

    this.postNewUser().then(() => {
      console.log("User data posted")
      // The request has completed, you can navigate away here
      const path = this.$auth.$storage.getUniversal('redirect') || '/';
      this.$auth.$storage.setUniversal('redirect', null);
      this.$router.push(path);
      
      console.log("decoded ", decodedBearer)
      this.$auth.setUser(decodedBearer)
      
    });
  }
}
</script>