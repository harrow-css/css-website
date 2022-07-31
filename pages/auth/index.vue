<template>
  <div />
</template>

<script>
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

export default {
  created () {
    var token = this.$auth.$storage.getUniversal('_token.aad')

    console.log(token)
    
    
    const decodedBearer = jwt_decode(token)
    this.$auth.$storage.setUniversal('jwt_decoded', decodedBearer)
    

  }
}
</script>
