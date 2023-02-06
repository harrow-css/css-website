<template>
  <div>
    <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Events</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              Check out past and upcoming lectures and workshops
            </p>
          </div>
        </div>
      </div>
    </div>


    <h1 class="mb-3" v-if="(lectures.filter(lecture => (new Date(lecture.date)) > (Date.now()))).length > 0">Upcoming</h1>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col" v-for="lecture in (lectures.filter(lecture => (new Date(lecture.date)) > (Date.now()))).sort((a, b) => new Date(a.date) - new Date(b.date))" v-bind:key="lecture._id">
        <Nuxt-Link
          style="text-decoration: none; color: inherit"
          :to="'/events/'+lecture._id"
        >
          <div
            class="card card-cover h-100 overflow-hidden rounded-4 shadow"
            v-bind:style=" 'background: linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url('+createLectureImageUrl(lecture.image)+');' "
          >
            <div
              class="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 pt-6"
            > 
              
              <span class="pt-5 mt-5 mb-4"><p>{{ (new Date(lecture.date)).toLocaleDateString() }}</p><h1 class="display-6 lh-1 fw-bold">{{lecture.name}}</h1></span>
              
            </div>
          </div>
        </Nuxt-Link>
      </div>
    </div>

    <h1 class="my-3">Completed</h1>
    <div class="row row-cols-1 row-cols-md-2 g-4">
      <div class="col" v-for="lecture in (lectures.filter(lecture => (new Date(lecture.date)) < (Date.now()))).sort((a, b) => new Date(b.date) - new Date(a.date))" v-bind:key="lecture._id">
        <Nuxt-Link
          style="text-decoration: none; color: inherit"
          :to="'/events/'+lecture._id"
        >
          <div
            class="card card-cover h-100 overflow-hidden rounded-4 shadow"
            v-bind:style=" 'background: linear-gradient( rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4) ), url('+createLectureImageUrl(lecture.image)+');' "
          >
            <div
              class="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 pt-6"
            > 
              
              <span class="pt-5 mt-5 mb-4"><p>{{ (new Date(lecture.date)).toLocaleDateString() }}</p><h1 class="display-6 lh-1 fw-bold">{{lecture.name}}</h1></span>
              
            </div>
          </div>
        </Nuxt-Link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.primarystyledcard {
  background-color: #393939;
  color: #fffbfe;
}

.secondarystyledcard {
  background-color: #7a7d7d;
  color: #fffbfe;
}
.card {
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover !important;
  transition: 0.3s;
}

</style>

<script>
export default {
  middleware: 'isAuthenticated',
  async asyncData({ $axios }) {
    const lectures = await $axios.$get('getLectures')
    return { lectures }
  },
  methods: {
    createLectureImageUrl(inputstring) {
      /* if the inputstring starts with https, then it is a url, otherwise it is a local file */
      if (inputstring.startsWith('https')) {
        return inputstring
      } else {
        return require(`~/assets/images/lectures/${inputstring}`)
      }

    }
  }
}
</script>


