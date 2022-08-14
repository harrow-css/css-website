<template>
  <div>
    <h1 class="display-1">Error {{error.statusCode}}</h1>
    <h1 v-if="error.statusCode === 404">Page not found</h1>
    <h1 v-else>An error occurred - {{ error.statusCode }} </h1>
   
    
    <img :src="'https://http.cat/'+error.statusCode"/>
    
    <br> 
    <NuxtLink class="btn btn-outline-dark my-3" to="/">Go back to home page</NuxtLink>
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>