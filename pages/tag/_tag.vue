<template>
  <div>
    <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">{{ $route.params.tag }}</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              Projects tagged {{ $route.params.tag }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="$route.params.tag == 'Team Enigma'"
      class="p-5 mb-4 rounded-3 shadow"
      style="background-color: #3c6967; color: white; font-family: Poppins"
    >
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Team Enigma Website</h1>
            <p>Team Enigma Projects are available on their website.</p>
          </div>
          <div class="col my-auto">
            <div
              class="h-100 p-5 rounded-3 shadow d-flex flex-column"
              style="background-color:#2F5452"
            >
              <h1>Visit TE.</h1>
              <a type="button" class="btn btn-outline-light btn-lg" href="https://teamenigma.ml/">Let's Go</a>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5"
      v-if="filtered"
    >
      <div
        class="col"
        v-for="(project, id) in filteredprojects"
        v-bind:key="id"
      >
        <ProjectCard :projectdata="project" :projectid="id" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      filteredprojects: {},
      filtered: false,
    }
  },
  mounted() {
    for (let x in this.$store.state.projects) {
      if (this.$store.state.projects[x].tags.includes(this.$route.params.tag)) {
        this.filteredprojects[x] = this.$store.state.projects[x]
      }
    }
    this.filtered = true
  },
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

.primarystyledcard {
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('~assets/images/esp1.jpg');
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;

  transition: 0.3s;
}

.primarystyledcard:hover {
  background-position: 50% 65%;
}
</style>
