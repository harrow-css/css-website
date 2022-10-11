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
              This stuff may be cool.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">


      <div class="col">
        <a
          style="text-decoration: none; color: inherit"
          href="https://www.hackster.io/team-enigma/project-agouti-df34a4"
        >
          <div
            class="card card-cover h-100 overflow-hidden rounded-4 shadow mover"
            v-bind:style="
              'background: linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' +
              require(`~/assets/images/agoutithumbnail.jpg`) +
              '); '
            "
          >
            <div
              class="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 pt-6"
            >
              <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Project Agouti</h2>
            </div>
          </div>
        </a>
      </div>

      <div class="col">
        <a
          style="text-decoration: none; color: inherit"
          href="https://teamenigma.ml/projects#Project%20Eco"
        >
          <div
            class="card card-cover h-100 overflow-hidden rounded-4 shadow mover"
            v-bind:style="
              'background: linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' +
              require(`~/assets/images/projectecoimage.png`) +
              '); '
            "
          >
            <div
              class="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 pt-6"
            >
              <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Project Eco</h2>
            </div>
          </div>
        </a>
      </div>

      <div class="col">
        <a
          style="text-decoration: none; color: inherit"
          href="https://dylankainth.com/project/1dbc680c-77cf-401e-b56c-88fbbdd260ce"
        >
          <div
            class="card card-cover h-100 overflow-hidden rounded-4 shadow mover"
            v-bind:style="
              'background: linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' +
              require(`~/assets/images/communityday.png`) +
              '); '
            "
          >
            <div
              class="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 pt-6"
            >
              <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Community Day</h2>
            </div>
          </div>
        </a>
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

<style scoped>
.card {
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover !important;
  transition: 0.3s;
}
</style>

<style>
.pt-6 {
  padding-top: 6rem;
}
.mover:hover {
  background-position: 50% 65% !important;
}
</style>