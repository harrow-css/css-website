<template>
  <nav class="navbar navbar-expand-lg fixed-top container pt-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        Dylan Kainth</a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h2 class="offcanvas-title" id="offcanvasNavbarLabel">
            Dylan Kainth
          </h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
              
            <li class="nav-item" v-for="(value,key) in routes" v-bind:key="key">
                <NuxtLink class="nav-link" :to="value">
                    {{key}}
                </NuxtLink>
            </li>
          
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data(){
    return {
      routes : {"Home":"/","Projects":"/projects","Contact":"/contact"}
    }
  }
}
</script>

<style scoped>
.navbar {
  background-color: transparent;
  position: relative;
}

a.navbar-brand {
  color: #fffbfe;
  font-size:1.8rem;
  font-weight: 600

}

/* offcanvas */
@media only screen and (max-width: 992px) {
  .offcanvas-body > .navbar-nav > .nav-item > a.nav-link.nuxt-link-exact-active.nuxt-link-active {
      color:#393939
  } 
  .offcanvas-body > .navbar-nav > .nav-item > a.nav-link {
      color:#7A7D7D
  } 
  .offcanvas-body > .navbar-nav > .nav-item {
      font-size:2rem
  }
}

/* desktop */
@media only screen and (min-width: 992px) {
  .offcanvas-body > .navbar-nav > .nav-item > a.nav-link {
      color:#7A7D7D
  } 
  .offcanvas-body > .navbar-nav > .nav-item > a.nuxt-link-exact-active {
      color:#FFFBFE
  } 
  .offcanvas-body > .navbar-nav > .nav-item {
      font-size:1.6rem;
      font-weight: 500;
  }
 
}

.offcanvas-title {
  color: #0E1242;
  font-weight: 600;
  font-size:2.5rem
}
.navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath  stroke='rgba(255,251,254,0.9)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")
}

.offcanvas {
  transition: transform 0.15s ease-in-out;
}
</style>
