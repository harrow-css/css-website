<template>
  <div>
    <div
      class="p-5 mb-4 primarystyledcard allcards rounded-3 shadow d-none d-md-block"
    >
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-5">Hello,</h1>
            <h1 class="display-2 fw-bold">I'm Dylan</h1>
            <h1 class="display-5">and I build things.</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              A student software developer from London that constructs cool
              projects to inspire others.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="p-5 mb-4 firstsmallprimarystyledcard allcards rounded-3 shadow d-block d-md-none"
    >
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-5">Hello,</h1>
            <h1 class="display-2 fw-bold">I'm Dylan</h1>
            <h1 class="display-5">and I build things.</h1>
          </div>
        </div>
      </div>
    </div>

    <div
      class="p-5 mb-4 secondsmallprimarystyledcard allcards rounded-3 shadow d-block d-md-none"
    >
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              I'm a student software developer from London who constructs cool
              projects to inspire others.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch">
      <div class="col-md-6 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard allcards rounded-3 shadow d-flex flex-column"
        >
          <h1>Check out some things I've built</h1>
          <p>Explore projects I've made or contributed towards</p>
          <Nuxt-Link
            class="btn btn-outline-light mt-auto"
            to="projects"
            type="button"
            >Go</Nuxt-Link
          >
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard allcards rounded-3 shadow d-flex flex-column"
        >
          <h1>Get in touch</h1>
          <p>Contact me using this page</p>
          <Nuxt-Link
            class="btn btn-outline-light mt-auto"
            type="button"
            to="contact"
            >Go</Nuxt-Link
          >
        </div>
      </div>
    </div>

    <!-- <div
      class="p-5 mb-4 secondarystyledcard allcards rounded-3 shadow d-none d-md-block"
    >
      <div class="container-fluid py-5">
        <h1 class="display-6">My Skills</h1>

        <div class="container px-4 py-5" id="featured-3">
          <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
            <div class="feature col">
              <div
                class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"
              >
                <svg class="bi" width="1em" height="1em">
                  <use xlink:href="#collection"></use>
                </svg>
              </div>
              <h2>Featured title</h2>
              <p>
                Paragraph of text beneath the heading to explain the heading.
                We'll add onto it with another sentence and probably just keep
                going until we run out of words.
              </p>
              <a href="#" class="icon-link d-inline-flex align-items-center">
                Call to action
                <svg class="bi" width="1em" height="1em">
                  <use xlink:href="#chevron-right"></use>
                </svg>
              </a>
            </div>
            <div class="feature col">
              <div
                class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"
              >
                <svg class="bi" width="1em" height="1em">
                  <use xlink:href="#people-circle"></use>
                </svg>
              </div>
              <h2>Featured title</h2>
              <p>
                Paragraph of text beneath the heading to explain the heading.
                We'll add onto it with another sentence and probably just keep
                going until we run out of words.
              </p>
              <a href="#" class="icon-link d-inline-flex align-items-center">
                Call to action
                <svg class="bi" width="1em" height="1em">
                  <use xlink:href="#chevron-right"></use>
                </svg>
              </a>
            </div>
            <div class="feature col">
              <div
                class="feature-icon d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-2 mb-3"
              >
                <svg class="bi" width="1em" height="1em">
                  <use xlink:href="#toggles2"></use>
                </svg>
              </div>
              <h2>Featured title</h2>
              <p>
                Paragraph of text beneath the heading to explain the heading.
                We'll add onto it with another sentence and probably just keep
                going until we run out of words.
              </p>
              <a href="#" class="icon-link d-inline-flex align-items-center">
                Call to action
                <svg class="bi" width="1em" height="1em">
                  <use xlink:href="#chevron-right"></use>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.secondarystyledcard > h1 {
  font-size: 2rem;
}

.secondarystyledcard > p {
  font-size: 1rem;
}

.primarystyledcard {
  background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('~assets/images/nyc.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: 0.3s;
}

.primarystyledcard:hover {
  background-position: 50% 55%;
}

.firstsmallprimarystyledcard {
  background: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    url('~assets/images/nyc.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: 0.3s;
}

.secondsmallprimarystyledcard {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('~assets/images/coventgarden.jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  transition: 0.3s;
}

h1 {
  pointer-events: none;
}
.allcards {
  -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
  -moz-animation: fadein 2s; /* Firefox < 16 */
  -ms-animation: fadein 2s; /* Internet Explorer */
  -o-animation: fadein 2s; /* Opera < 12.1 */
  animation: fadein 2s;
}

.secondarystyledcard {
  background-color: #373f51;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Firefox < 16 */
@-moz-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Safari, Chrome and Opera > 12.1 */
@-webkit-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Internet Explorer */
@-ms-keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }
  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }
  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }
  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }
  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }
  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }
  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }
  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }
  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }
  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }
  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}
</style>
