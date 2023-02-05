<template>
  <div>
    <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Hackathon</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              hackathons / <br> {{ hackathon.hackathonName }}
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
          <div class="row">
            <div class="col-md-10">
              <h1>{{ hackathon.hackathonName }}</h1>
              <h3>by {{ hackathon.hackathonHost }}</h3>
              <h3>
                from
                {{
                  $moment(hackathon.hackathonStartDate).format('MMMM d, YYYY')
                }}
                to
                {{ $moment(hackathon.hackathonEndDate).format('MMMM d, YYYY') }}
              </h3>
            </div>

            <div class="col-md-2 d-none d-md-block">
              <img
                class="img-fluid rounded-start"
                style="height: 10rem"
                :src="hackathon.hackathonImage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div
        class="col"
        v-for="(question,key) in hackathon.questions"
        v-bind:key="key"
      >
        <Nuxt-Link
          :to="'/hackathons/' + hackathon._id + '/'+ key"
          style="text-decoration: none"
        >
          <div
            class="card secondarystyledcard lg-3 rounded-3 shadow border-0"
            style="max-width: 540px"
          >
            <div class="row g-0">
              <div class="col-md-10">
                <div class="card-body">
                  <h5 class="card-title">Question {{ parseInt(key) + 1}}</h5>
                  
                </div>
              </div>
              <div class="col-md-2">
                <div class="card-body">
                  <h5 class="card-title">/</h5>
                  
                </div>
              </div>
            </div>
          </div>
        </Nuxt-Link>
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  middleware: 'isAuthenticated',

  async asyncData(context) {
    return {
      hackathon: await context.app.$axios.$get(
        '/hackathons/getone/' + context.params.hackathonId
      ),
    }
  },
}
</script>

<style scoped>
.secondarystyledcard > h1 {
  font-size: 3.2rem;
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
