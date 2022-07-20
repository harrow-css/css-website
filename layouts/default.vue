<template>
  <div>
    <UtilsNavbar />
    <div class="container py-3">
      <Nuxt />
    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

html {
  

}
body {
  background-color: #1B1B1E !important;
  color: #D8DBE2;
  font-family: Inter, sans-serif !important;

}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

</style>
