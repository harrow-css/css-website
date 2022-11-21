<template>
  <div>
    <div class="row align-items-md-stretch mb-4 mt-4">
      <div class="col-md-12 mb-4">

      
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column"
        >
        
          <div class="row align-items-start">
            <div class="col-lg-12">
              <h1>
                You've got
                <i>{{ Math.floor(userpoints / 8) }} byte<span v-if="Math.floor(userpoints / 8) || userpoints<8">s</span> <span v-if="userpoints%8!=0">and {{ userpoints%8 }} bit<span v-if="userpoints%8!=1">s</span></span> </i>
              </h1>
            </div>
          </div> 

          <div v-if="userpoints<32">
            <h3 class="mt-5">You're {{Math.round((userpoints*100)/32)}}% of the way to a head masters send up!</h3>
            <div class="progress mt-2">
              <div class="progress-bar" role="progressbar" :style="'width: '+Math.round((userpoints*100)/32)+'%'" :aria-valuenow="Math.round((userpoints*100)/32)" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>

          <div v-if="userpoints>=32">
            <h3 class="mt-5">🎉 Congrats, you're due a head master's send up!</h3>
          </div>

          <div v-if="userpoints<48">
            <h3 class="mt-5">You're {{Math.round((userpoints*100)/48)}}% of the way to the society tie!</h3>
            <div class="progress mt-2">
              <div class="progress-bar" role="progressbar" :style="'width: '+Math.round((userpoints*100)/48)+'%'" :aria-valuenow="Math.round((userpoints*100)/48)" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>

          <div v-if="userpoints>=48">
            <h3 class="mt-5">🎉 Congrats, you're due the society tie!</h3>
          </div>

          <div v-if="userpoints<80">
            <h3 class="mt-5">You're {{Math.round((userpoints*100)/80)}}% of the way a raspberry pi zero!</h3>
            <div class="progress mt-2">
              <div class="progress-bar" role="progressbar" :style="'width: '+Math.round((userpoints*100)/80)+'%'" :aria-valuenow="Math.round((userpoints*100)/80)" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
          </div>

          <div v-if="userpoints>=80">
            <h3 class="mt-5">🎉 Congrats, you're due a raspberry pi zero!</h3>
          </div>

        </div>
        


      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'isAuthenticated',
  async asyncData(context) {
    const userpoints = await context.$axios.$get(
      'getUser?id=' + context.app.$auth.$storage.getUniversal('jwt_decoded').oid
    )

    return {
      userpoints: userpoints[0].points,
      userdata: context.app.$auth.$storage.getUniversal('jwt_decoded'),
    }
  },
}
</script>

<style scoped>
.card {
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover !important;
  transition: 0.3s;
}
</style>

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
