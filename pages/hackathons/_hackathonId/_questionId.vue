<template>
  <div>
    <div class="p-5 mb-4 primarystyledcard rounded-3 shadow">
      <div class="container-fluid py-5">
        <div class="row align-items-start">
          <div class="col my-auto">
            <h1 class="display-2 fw-bold">Question</h1>
          </div>
          <div class="col my-auto">
            <p class="col-md-8 fs-4 text-md-end float-md-end">
              hackathons / <br />
              {{ hackathon.hackathonName }} / <br />
              {{ question.questionName }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch mb-4">
      <div class="col-md-12 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column"
        >
          <div class="row">
            <div class="col-md-12">
              <h1 class="fw-bold">{{ question.questionName }}</h1>

              <h3>
                Question {{ questionnumber + 1 }} of
                {{ hackathon.hackathonName }}
              </h3>

              <div
                class="mt-3"
                v-html="$md.render(question.questionDescription)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch mb-4">
      <div class="col-md-12 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column"
        >   
        
          <AutosolutionPython :question="question" />

          
        </div>
      </div>
    </div>

    <div class="row align-items-md-stretch mb-4">
      <div class="col-md-12 mb-4">
        <div
          class="h-100 p-5 secondarystyledcard rounded-3 shadow d-flex flex-column"
        >   
        
          <AutosolutionJavascript :question="question" />

        </div>
      </div>
    </div>

  </div>
</template>

<script>

export default {
    middleware: "isAuthenticated",
    computed: {
        // a computed getter
        questionnumber: function (context) {
            // `this` points to the vm instance
            return parseInt(context.$route.params.questionId);
        },
    },
    async asyncData(context) {
        return {
            hackathon: await context.app.$axios.$get("/hackathons/getone/" + context.params.hackathonId),
            question: await context.app.$axios.$get("/hackathons/getonequestion/" +
                context.params.hackathonId +
                "/" +
                context.params.questionId),
        };
    }
}
</script>

<style scoped>
.secondarystyledcard > h1 {
  font-size: 3.2rem;
}

.secondarystyledcard > p {
  font-size: 1rem;
}

.primarystyledcard {
  background-color: #393939;
  color: #fffbfe;
}

.secondarystyledcard {
  background-color: #7a7d7d;
  color: #fffbfe;
}
</style>
