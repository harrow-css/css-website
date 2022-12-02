<template>
<div>

</div>
</template>

<script>
export default {
    middleware: 'isAuthenticated',
    async asyncData({ $axios }) {
        const ip = await $axios.$get('/getAdventLeaderboard')
        return { ip }
    }
    

    
}
</script>
