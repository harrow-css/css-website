<template>
  <div>
    <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Hackathons</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              This stuff may be cool.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch">
      <div class="col-md-12 mb-4">
        <div class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column ">
          <h1>404: Projects not found</h1>
          <p>We actually haven't written any articles for our projects page yet, since this website is new.</p>

          <img src="https://http.cat/404"/>
        </div>
      </div>
    </div>
    

  </div>
</template>

<script>
export default {
    middleware: "isAuthenticated"
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
