<template>

<div> 

<div>
<p v-for="user in users">{{user.given_name}} {{user.family_name}} {{user._id}}</p>
</div>

<input v-model="pointsbuffer.id" placeholder="id"></input>
<input v-model="pointsbuffer.reason" placeholder="reason"></input>
<input v-model="pointsbuffer.points" placeholder="points"></input>
<button @click='awardPoints(parseInt(pointsbuffer.points),pointsbuffer.id,pointsbuffer.reason)' class="btn btn-primary">send data</button>
</div>
</template>

<script>
export default {
    data() {
        return {
            pointsbuffer: {
                id: "",
                reason: "",
                points: 0
            }
        }
    },
    async asyncData({ $axios }) {
        const users = await $axios.$get('getUsers')
        return { users }
    },
    methods: {
        awardPoints(points, oid, reason) {
            this.$axios.$post('postAwardPoints', {
                points: points,
                oid: oid,
                reason: reason
            }).then((response) => {
                console.log('Points awarded successfully')
            }).catch((error) => {
                console.log(error)
                console.log('Error awarding points')
            })
        }
    },
}

</script>