<template>
  <div>
    <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Projects</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              Things I've worked on.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">

      

      <div class="col" v-for="(project, id) in this.$store.state.projects" v-bind:key="id">
        <ProjectCard  :projectdata="project" :projectid="id"/>
      </div>


    </div>

    

  </div>
</template>

<style scoped>


.primarystyledcard {
  background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("~assets/images/iotdevkit.jpg");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  
  transition: 0.3s;
}

.primarystyledcard:hover {
  background-position: 50% 65%;
}

</style>
