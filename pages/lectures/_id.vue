<template>
<div>
<div class="row align-items-md-stretch mb-4 mt-4">
      <div class="col-md-12 mb-4">

      
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column"
        >   

            <h1 class="fs-1 fw-bold">{{ lecture.name }} </h1>
            <h3>{{ lecture.strapline }}</h3>
            <h5>From {{lecture.speakers.join(", ")}}</h5>
            <h5>In {{ lecture.Location }} on {{ ( new Date(lecture.date)).toLocaleDateString()}} at {{ ( new Date(lecture.date)).toLocaleTimeString()}}</h5>

            <img class="rounded-3" :src="require(`~/assets/images/lectures/${lecture.image}`)">

            <span class="mt-3" v-html="lecture.content"></span>
            
        </div>
        


      </div>
    </div>
</div>
</template>

<script>
export default {
    middleware: 'isAuthenticated',
    async asyncData(context) {
        const lecture = await context.$axios.$get(
        'getLecture',
        {
            params: {
            id: context.params.id
            }
        }
        )
        
    
        return {
        lecture: lecture[0]
        }
    },
}
</script>

<style>



.secondarystyledcard > h1 {
  font-size:2rem
}

.secondarystyledcard > p {
  font-size:1rem
}

.primarystyledcard {
  background-color: #393939;
  color: #fffbfe;
}

.secondarystyledcard {
  background-color: #7A7D7D;
  color: #fffbfe;
}
</style>