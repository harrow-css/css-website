<template>
  <div>
    <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            
            <h1 class="display-2 fw-bold">The Computer Science Society.</h1>

          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              We're a group of Computer Scientists at Harrow School
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch">
      <div class="col-md-6 mb-4">
        <div class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column ">
          <h1>Get Involved</h1>
          <p>Contact the society leadership and get involved with events and projects.</p>
          <Nuxt-Link class="btn btn-outline-light mt-auto" to="getinvolved" type="button">Go</Nuxt-Link>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column">
          <h1>Check out our previous projects</h1>
          <p>Have a look at our recent projects and apply to become a beta tester for new ones when they arrive.</p>
          <Nuxt-Link class="btn btn-outline-light mt-auto" type="button" to="projects">Go</Nuxt-Link>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {}
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
