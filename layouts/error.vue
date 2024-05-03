<template>
  <div>
    <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">{{error.statusCode}}</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              <span v-if="error.statusCode === 404">Page not found</span>
              <span v-else>An error occurred - {{ error.statusCode }} </span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch">
      <div class="col-md-12 mb-4">
        <div class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column ">


          <img :src="'https://http.cat/'+error.statusCode"/>

          <NuxtLink class="btn btn-outline-dark my-3" to="/">Go back to home page</NuxtLink>

          <a
                class="btn btn-outline-light"
                type="button"
                @click="$auth.logout()"
                >Logout</a
              >
        </div>
      </div>
    </div>
    

  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>

<style scoped>

.secondarystyledcard > h1 {
  font-size:2rem
}

.secondarystyledcard > p {
  font-size:1rem
}

.primarystyledcard {
  background-color: #393939;
  color: #fffbfe;
}

.secondarystyledcard {
  background-color: #7A7D7D;
  color: #fffbfe;
}


</style>
