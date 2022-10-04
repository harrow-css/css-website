<template>
  <div>
    <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Demos</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              Check out some cool demos
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div
        class="col"
      >
      <div class="col">
        <Nuxt-Link
          style="text-decoration: none; color: inherit"
          :to="'/demos/gravitron'"
        >
          <div
            class="card card-cover h-100 overflow-hidden rounded-4 shadow mover"
            v-bind:style="
              'background: linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' +
              require(`~/assets/images/pressups.jpg`) +
              '); '
            "
          >
            <div
              class="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 pt-6"
            >
              <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Gravitron</h2>
            </div>
          </div>
        </Nuxt-Link>
      </div>
      </div>
    </div>



  </div>
</template>

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

<script>
export default {
  middleware: 'isAuthenticated',
  async asyncData(context) {
    return {
      userdata: context.app.$auth.$storage.getUniversal('jwt_decoded'),
    }
  }
}
</script>

<style scoped>
.secondarystyledcard > h1 {
  font-size: 2rem;
}

.secondarystyledcard > p {
  font-size: 1rem;
}

.primarystyledcard {
  background-color: #393939;
  color: #fffbfe;
}

.secondarystyledcard {
  background-color: #7a7d7d;
  color: #fffbfe;
}
</style>
