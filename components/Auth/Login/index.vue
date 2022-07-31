<template>
  <form @submit.prevent="login">
    <img
      class="mb-4"
      src="/docs/5.1/assets/brand/bootstrap-logo.svg"
      alt=""
      width="72"
      height="57"
    />
    <h1 class="h1 mb-3 fw-heavy">Please sign in</h1>

    <div class="py-2">
      <div class="form-floating">
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="loginData.email"
          aria-describedby="emailHelp"
          placeholder="name@example.com"
        />
        <label for="email" style="color:black">Email address</label>
      </div>
    </div>

    <div class="py-2">
      <div class="form-floating">
        <input
          type="password"
          v-model="loginData.password"
          class="form-control"
          id="password"
          placeholder="Password"
        />
        <label for="password" style="color:black">Password</label>
      </div>
    </div>

    <div
      v-if="loginData.error"
      class="py-2 alert alert-dark d-flex align-items-center"
      role="alert"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="currentColor"
        class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2"
        viewBox="0 0 16 16"
        role="img"
        aria-label="Warning:"
      >
        <path
          d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        />
      </svg>
      <div>
        {{ loginData.error }}
      </div>
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      loginData: {
        email: "",
        password: "",
        error: null
      }
    };
  },
  methods: {
    async login() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.loginData
        });
        this.$router.push("/");
        console.log(response);
      } catch (err) {
        //set the error variable

        this.loginData.error = err.response.data.message;
      }
    }
  }
};
</script>

<style></style>
