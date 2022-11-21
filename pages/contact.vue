<template>
  <div>
    <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Contact us</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              We'd love to hear from you.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch">
      <div class="col-md-8 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column"
        >
          <h1>Join our mailing list</h1>
          <p>
            Keep in the loop with all things about the society through our
            mailing list
          </p>

          <form
            method="post"
            action="https://listmonk.services.dylankainth.com/subscription/form"
            class="listmonk-form"
          >
            <div>
              <input type="hidden" name="nonce" />
              <p>
                <input
                  class="form-control"
                  type="email"
                  name="email"
                  required
                  placeholder="E-mail"
                />
              </p>
              <p>
                <input
                  class="form-control"
                  type="text"
                  name="name"
                  placeholder="Name (optional)"
                />
              </p>

              <p class="d-none">
                <input
                  id="4bba4"
                  type="checkbox"
                  name="l"
                  checked
                  value="4bba4380-94ea-47be-9227-a870d1cefe95"
                />
                <label for="4bba4">CSS Society List</label>
              </p>
              <button
                class="btn btn-outline-light mt-auto"
                type="submit"
                value="Subscribe"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-4 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column"
        >
          <h1>Ping us an email</h1>
          <p>
            You can email us at
            <a class="mailaddress" href="mailto:19Kainthd@harrowschool.org.uk"
              >19Kainthd@harrowschool.org.uk</a
            >,
            <a class="mailaddress" href="mailto:19SongY@harrowschool.org.uk"
              >19SongY@harrowschool.org.uk</a
            >
            or
            <a class="mailaddress" href="mailto:18vanaekenm@harrowschool.org.uk"
              >18vanaekenm@harrowschool.org.uk</a
            >. <br /><br />
            You could even email us at
            <a
              class="mailaddress"
              href="mailto:19Kainthd@harrowschool.org.uk,19SongY@harrowschool.org.uk,18vanaekenm@harrowschool.org.uk"
              >all three addresses</a
            >
            if you're feeling particularly enthusiastic
          </p>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch">
      <div class="col-md-4 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column"
        >
          <h1>Follow us on social media</h1>
          <p>
            We haven't set up any social media accounts yet, but we will soon!
          </p>
        </div>
      </div>
      <div class="col-md-8 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column"
        >
          <h1>Fill in a form</h1>
          <p>You can fill a contact form here.</p>

          <form @submit="postContactForm">
            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Your Name</label
              >
              <input
                type="text"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="John Doe"
                required
                v-model="form.name"
              />
            </div>

            <div class="mb-3">
              <label for="exampleFormControlInput1" class="form-label"
                >Your Email address</label
              >
              <input
                type="email"
                class="form-control"
                id="exampleFormControlInput1"
                placeholder="johndoe@example.com"
                required
                v-model="form.email"
              />
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label"
                >What's up?</label
              >
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                placeholder="I'd like to get in touch about..."
                required
                v-model="form.message"
              ></textarea>
            </div>

            <div
              class="g-recaptcha"
              data-sitekey="6Lcx2XUhAAAAAOg9DaKNIUnj-dIU2S4pfLpf26TY"
            ></div>
            <br />
            <input
              type="submit"
              value="Send"
              class="btn btn-outline-light"
              :class="{ 'disabled': !form.name || !form.email || !form.message}"
            />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      script: [{ src: 'https://www.google.com/recaptcha/api.js' }],
    }
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
    }
  },
  methods : {
    postContactForm() {
      this.$axios.post('postContactForm', {
        form: this.form 
      })
      .then(function (response) {
          console.log(response);
      })
      .catch(function (error) {
          console.log(error);
      });
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

.mailaddress {
  color: white;
}
</style>
