<template>
  <div>
    <div class="p-5 mb-4 tertiarystyledcard rounded-3 shadow">
      <div class="row align-items-md-stretch">
        <div class="col-md-6 mb-4">
          <h1 class="display-3">{{ projectdata.title }}</h1>

          <div class="d-flex flex-column">
            <ul class="d-flex list-unstyled mt-auto">
              <li class="d-flex align-items-center me-auto">
                <span class="me-2 material-icons">{{
                  projectdata.people.icon
                }}</span>
                <small>{{ projectdata.people.status }}</small>
              </li>
              <li class="d-flex align-items-center me-auto">
                <span class="me-2 material-icons">{{
                  projectdata.type.icon
                }}</span>
                <small>{{ projectdata.type.status }}</small>
              </li>
            </ul>
          </div>

          <div v-html="$md.render(projectdata.longdescription)"></div>

        </div>
        <div class="col-md-6 mb-4">
          <div
            id="carouselExampleIndicators"
            class="carousel carousel-fade slide"
            data-bs-ride="true"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
            </div>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img src="https://images.unsplash.com/photo-1658238124313-d69e9f20949b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="https://images.unsplash.com/photo-1658250585128-10ce39a7d198?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item">
                <img src="https://images.unsplash.com/photo-1658232190602-be6cd5b976f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" class="d-block w-100" alt="..." />
              </div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projectdata: this.$store.state.projects[this.$route.params.id]
    }
  },
}
</script>

<style scoped>
.tertiarystyledcard {
  background-color: #373f51;
}
</style>
