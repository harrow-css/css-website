<template>

<div> 
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
    methods: {
        awardPoints(points, oid, reason) {
            this.$axios.$post('postAwardPoints', {
                points: points,
                oid: oid,
                reason: reason
            }).then((response) => {
                this.$toast.success('Points awarded successfully')
            }).catch((error) => {
                this.$toast.error('Error awarding points')
            })
        }
    },
}

</script>