<template>
  <div />
</template>

<script>
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

export default {
  created () {
    var token = this.$auth.$storage.getUniversal('_token.aad')
    
    const decodedBearer = jwt_decode(token)

    this.$auth.$storage.setUniversal('jwt_decoded', decodedBearer)

var userdata  = this.$auth.$storage.getUniversal('jwt_decoded')
    this.$axios.post('/postNewUser', { data: userdata }  )
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });

  }
}
</script>
