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
              Participate in Society Hackathons
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch">
      <div class="col-md-12 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column"
        >
          <div class="row align-items-start">
            <div class="col-lg-11">
              <h1>
                You're logged in as
                <i>{{ userdata.given_name }} {{ userdata.family_name }}</i>
              </h1>
              <p>
                Any hackathon problems you solve will be linked to your account.
              </p>
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
  </div>
</template>

<script>
export default {
  middleware: 'isAuthenticated',
  asyncData(context) {
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
