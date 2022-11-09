<template>
  <div>
    <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Get Involved</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              Check out society Demos, Projects and Hackathons
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch mb-4">
      <div class="col-md-12 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column"
        >
          <div class="row align-items-start">
            <div class="col-lg-11">
              <h1>
                Hey,
                <i>{{ userdata.given_name }} {{ userdata.family_name }}</i>
              </h1>
            </div>
            <div class="col-lg-1">
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
    </div>

    <!-- <div class="row mb-2">
      <div class="col-md-6" v-for="hackathon in hackathons" v-bind:key="hackathon._id">
        <div
          class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow h-md-250 position-relative tertiarystyledcard"
        >
          <div class="col p-4 d-flex flex-column position-static">
            <strong class="d-inline-block mb-2 text-primary">{{hackathon._id}}</strong>
            <h3 class="mb-0">{{hackathon.hackathonName}}</h3>
            <div class="mb-1 text-muted">Nov 12</div>
            <p class="card-text mb-auto">
              This is a wider card with supporting text below as a natural
              lead-in to additional content.
            </p>
            <a href="#" class="stretched-link">Continue reading</a>
          </div>
          <div class="col-auto d-none d-lg-block">
            <svg
              class="bd-placeholder-img"
              width="200"
              height="250"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: Thumbnail"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#55595c"></rect>
              <text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text>
            </svg>
          </div>
        </div>
      </div>
    </div> -->

    <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col">
        <Nuxt-Link
          style="text-decoration: none; color: inherit"
          :to="'/projects/'"
        >
          <div
            class="card card-cover h-100 overflow-hidden rounded-4 shadow mover"
            v-bind:style="
              'background: linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' +
              require(`~/assets/images/agoutidemo.jpg`) +
              '); '
            "
          >
            <div
              class="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 pt-6"
            >
              <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Projects</h2>
            </div>
          </div>
        </Nuxt-Link>
      </div>
      <div class="col">
        <Nuxt-Link
          style="text-decoration: none; color: inherit"
          :to="'/demos/'"
        >
          <div
            class="card card-cover h-100 overflow-hidden rounded-4 shadow mover"
            v-bind:style="
              'background: linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' +
              require(`~/assets/images/enigmademo.jpg`) +
              '); '
            "
          >
            <div
              class="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 pt-6"
            >
              <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Demos</h2>
            </div>
          </div>
        </Nuxt-Link>
      </div>

      <div class="col">
        <Nuxt-Link
          style="text-decoration: none; color: inherit"
          :to="'/sixthformstudy/'"
        >
          <div
            class="card card-cover h-100 overflow-hidden rounded-4 shadow mover"
            v-bind:style="
              'background: linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' +
              require(`~/assets/images/sixthformdemo.jpg`) +
              '); '
            "
          >
            <div
              class="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 pt-6"
            >
              <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">6th Form Study</h2>
            </div>
          </div>
        </Nuxt-Link>
      </div>

      <div class="col">
        <Nuxt-Link
          style="text-decoration: none; color: inherit"
          :to="'/hackathons/'"
        >
          <div
            class="card card-cover h-100 overflow-hidden rounded-4 shadow mover"
            v-bind:style="
              'background: linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url(' +
              require(`~/assets/images/hackathons.jpeg`) +
              '); '
            "
          >
            <div
              class="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 pt-6"
            >
              <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Hackathons</h2>
            </div>
          </div>
        </Nuxt-Link>
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
  },
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
