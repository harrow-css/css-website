<template>
  <article>
    <h1>{{ page.title }}</h1>
    <nuxt-content :document="page" />
  </article>
</template>

<script>
export default {
  async asyncData ({ $content }) {

    
    const page = await $content('2023-multithreading-main/'+$nuxt.$route.path.split('/threads/')[1]+'/README').fetch()
    
    
    return {
      page
    } 
  }
}
</script>
