<template>
<div class="form-signin primarystyledcard rounded-3 shadow">
  <div>
    <img class="mb-4 mx-auto d-block" src="~/assets/templogowhite.png" alt="logo" width="72" height="72">
    <h1 class="h3 mb-3 fw-normal text-center">Unsupported Account</h1>

    <p class="my-2 text-center">This is in beta, and you're not a beta tester</p>

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