<template>
<Nuxt-Link  style="text-decoration: none; color: inherit;" :to="'/project/'+projectid">
  <div
    class="card card-cover h-100 overflow-hidden text-bg-dark rounded-4 shadow" v-bind:style=" 'background: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url('+require(`~/assets/images/projects/${projectdata.image}`)+');' "
  >
    <div
      class="d-flex flex-column h-100 px-5 pb-3 text-white text-shadow-1 pt-6"
    >
      <h2 class="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{{ projectdata.title }}</h2>
      <ul class="d-flex list-unstyled mt-auto">
        <li class="d-flex align-items-center me-auto">
          <span class="me-2 material-icons">{{ projectdata.people.icon }}</span>
          <small>{{ projectdata.people.status }}</small>
        </li>
        <li class="d-flex align-items-center me-3">
          <span class="me-2 material-icons">{{ projectdata.type.icon }}</span>
          <small>{{ projectdata.type.status }}</small>
        </li>
      </ul>
    </div>
  </div>
  </Nuxt-Link>
</template>

<style scoped>
.card {
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover !important;
  transition: 0.3s;
}

</style>

<style>
.pt-6 {
  padding-top: 6rem;
}
</style>

<script>
export default {
  props: ['projectdata','projectid'],
  computed: {
    style () {
        return 'background: ' + this.top + ';' + '...'
    }
    }
}
</script>
