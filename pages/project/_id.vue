<template>
  <div>
    <div class="p-5 mb-4 tertiarystyledcard rounded-3 shadow">
      <div class="row align-items-md-stretch">
        <div class="col-lg-6 mb-4 position-relative">
          <h1 class="display-3" style="word-wrap: break-word; ">{{ projectdata.title }}</h1>

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
              <li class="d-flex align-items-center me-auto">
                <span class="me-2 material-icons">event</span>
                <small>{{ projectdata.timeframedescription }}</small>
              </li>
            </ul>
          </div>

          <div class="d-flex flex-column">
            <ul class="d-flex list-unstyled mt-auto">
              <li class="d-flex align-items-center me-auto">
                <span class="me-2 material-icons">tag</span>
                <small>Tags: <span v-for="(tag,index) in projectdata.tags" v-bind:key="tag"><Nuxt-Link class="taglink" :to="'/tag/'+tag">{{tag}}</Nuxt-Link><span v-if="index!=projectdata.tags.length-1">, </span></span></small>
              </li>
            </ul>
          </div>


          <div v-html="description" class="description"></div>

          <div class="bottom-0" v-if="projectdata.buttons">
            <a v-for="button in projectdata.buttons" v-bind:key="button.text" type="button" :class="'btn btn-sm btn-'+button.color+' m-2'" :href="button.hyperlink" target="_blank">{{button.text}}</a>
          </div>  

        </div>
        <div class="col-lg-6 mb-4 order-first order-lg-0" v-if="projectdata.longimages.length >0">
          <div
            id="carouselExampleIndicators"
            class="carousel carousel-fade slide"
            data-bs-ride="true"
          >
            <div class="carousel-inner rounded-3">
              <div class="carousel-item active">
                <img :src="require(`~/assets/images/projects/${projectdata.longimages[0]}`)" class="d-block w-100" alt="..." />
              </div>
              <div class="carousel-item" v-for="image in projectdata.longimages.slice(1)" v-bind:key="image">
                <img :src="require(`~/assets/images/projects/${image}`)" class="d-block w-100" alt="..." />
              </div>
              <!-- <div class="carousel-item">
                <img :src="require(`~/assets/images/projects/${projectdata.image}`)" class="d-block w-100 first-carousel-image" alt="..." />
              </div> -->
            </div>
            <div v-if="projectdata.longimages.length >1">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: '',
      model: '# Hello World!',
      projectdata: this.$store.state.projects[this.$route.params.id],
    }
  },
  mounted(){
    var a = ((this.$store.state.projects[this.$route.params.id].longdescription))
    this.model = a
    this.description = this.$md.render(a)
  }
}
</script>

<style>

a { color: white}
a:link{  color:white};
a:visited{  color:rgb(221, 221, 221)};
a:hover{  color:rgb(194, 194, 194)};
a:active{  color:rgb(221, 221, 221)};

</style>

<style scoped>
.tertiarystyledcard {
  background-color: #373f51;
}

.first-carousel-image {
  filter : brightness(0.5)
}

.carousel-item {
  height: 60vh
}

.carousel-item > img {
  height: inherit;
  object-fit:cover;
}

.taglink:link {
  color:white
}
.taglink:visited {
  color:rgb(221, 221, 221)
}
.taglink:hover {
  color:rgb(194, 194, 194)
}
.taglink:active {
  color:rgb(221, 221, 221)
}

</style>
