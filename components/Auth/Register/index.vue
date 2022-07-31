<!-- 
<template>
  <div>
    <form @submit.prevent="register">
      <div class="mb-3">
        <label for="fullname" class="form-label">Full Name</label>
        <input
          type="text"
          v-model="registerData.fullname"
          class="form-control"
          id="fullname"
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="registerData.email"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          v-model="registerData.password"
          class="form-control"
          id="password"
        />
      </div>
      <button type="submit" class="btn btn-primary w-100">Register</button>
    </form>
  </div>
</template>
-->

<template>
  <form @submit.prevent="register">
    <img
      class="mb-4"
      src="/docs/5.1/assets/brand/bootstrap-logo.svg"
      alt=""
      width="72"
      height="57"
    />
    <h1 class="h1 mb-3 fw-heavy">Sign up</h1>

    <!-- name box -->
    <div class="py-2">
      <div class="form-floating">
        <input
          type="text"
          v-model="registerData.fullname"
          class="form-control"
          id="fullname"
          placeholder="John Doe"
        />
        <label for="email" style="color:black">Full Name</label>
      </div>
    </div>

    <!-- email box -->
    <div class="py-2">
      <div class="form-floating">
        <input
          placeholder="Email"
          type="email"
          class="form-control"
          id="email"
          v-model="registerData.email"
          aria-describedby="emailHelp"
        />
        <label for="password" style="color:black">Email</label>
      </div>
    </div>

    <!-- password box -->
    <div class="py-2">
      <div class="form-floating">
        <input
          type="text"
          v-model="registerData.password"
          class="form-control"
          id="password"
          placeholder="Password"
        />
        <label for="password" style="color:black">Password</label>
      </div>
    </div>

    <div
      v-if="registerData.error"
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
        {{ registerData.error }}
      </div>
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Register</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      registerData: {
        fullname: "",
        email: "",
        password: "",
        error: null
      }
    };
  },
  methods: {
    async register() {
      try {
        const user = await this.$axios.$post("/api/auth/signin", {
          fullname: this.registerData.fullname,
          email: this.registerData.email,
          password: this.registerData.password
        });
        console.log(user);
      } catch (err) {
        this.registerData.error = err.response.data.message;
      }
    }
  }
};
</script>

<style></style>
