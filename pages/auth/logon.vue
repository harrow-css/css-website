<template>
<div class="form-signin primarystyledcard rounded-3 shadow">
  <div v-if="!this.$auth.loggedIn">
    <img class="mb-4 mx-auto d-block" src="~/assets/templogowhite.png" alt="logo" width="72" height="72">
    <h1 class="h3 mb-3 fw-normal text-center">Please sign in</h1>


    <a class="signinbutton" @click="$auth.loginWith('aad')"><img class="mb-5 mx-auto d-block" src="~/assets/microsoftsignindark.svg" alt="Sign in with Microsoft"></a>

    

    <p class="my-2 text-center text-secondary">Please sign in with your HarrowSchool.org.uk account. <br> (work or school account)</p>
    <p class="my-2 text-center text-secondary">We won't take any information apart from your name, email and an identifier token.</p>
  </div>
  <div v-if="this.$auth.loggedIn">
      <h1 class="h3 mb-3 fw-normal text-center">Hey, {{userdata.given_name }} {{userdata.family_name}}</h1>
      <hr class="m-6">
      <p class="my-2 text-center">You're sucessfully logged in!</p>
      <Nuxt-Link class="btn btn-outline-light mt-auto mx-auto d-block" type="button" to="/">Go Home</Nuxt-Link>
  </div>
</div>
  
</template>

<style scoped>
html,
body {
  height: 100%;
}

.signinbutton:hover{
   cursor: pointer; 
}

.primarystyledcard {
  background-color: #393939;
  color: #fffbfe;
}

.form-signin {
  width: 100%;
  max-width: 500px;
  padding: 15px;
  margin: auto;
}

</style>
<script>
export default {
  asyncData (context) {
    return {
      userdata: context.app.$auth.$storage.getUniversal('jwt_decoded')
    }
  },
  data () {
    return { userdata: null }
  }
}
</script>