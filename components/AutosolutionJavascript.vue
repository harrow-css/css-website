<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h1 class="fw-bold">JavaScript AutoSolution</h1>
        Write your solution with the Javascript function
        <code>{{ this.$props.question.questionFunctionName }}()</code>
        <div class="container">
          <div class="row">
            <div class="col-8">
              <div class="input-group py-3">
                <Editor
                  class="border-0 rounded"
                  lang="javascript"
                  :functionname="this.$props.question.questionFunctionName"
                  style="height: 400px"
                  @input="code = $event"
                />
              </div>
            </div>
            <div class="col-4">
              <div class="input-group py-3">
                <textarea
                  v-if="!runerror && !runtesting"
                  style="height: 400px"
                  v-model="output"
                  class="form-control bg-secondary text-white border-0"
                  aria-label="With textarea"
                  disabled
                  id="console"
                ></textarea>

                <textarea
                  v-if="runerror && !runtesting"
                  style="height: 400px"
                  v-model="output"
                  class="form-control bg-danger text-white border-0"
                  aria-label="With textarea"
                  disabled
                  id="console"
                ></textarea>

                <textarea
                  v-if="runtesting && !runerror"
                  style="height: 400px"
                  v-model="output"
                  class="form-control bg-success text-white border-0"
                  aria-label="With textarea"
                  disabled
                  id="console"
                ></textarea>
              </div>
            </div>
          </div>

          <button type="button" class="btn btn-primary btn-lg" v-on:click="run">
            Run
          </button>

          <!-- 
          <button
            type="button"
            class="btn btn-success btn-lg"
            v-on:click="test"
          >
            Test
          </button> -->
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      output: '',
      code: '',
      runerror: false,
      runtesting: false,
    }
  },
  methods : {
    run() {


        var blob = new Blob(["onmessage ="+this.code.toString()], { type: "text/javascript" });

        var worker = new Worker(window.URL.createObjectURL(blob));
        worker.onmessage = function(e) 
        { 
          this.output = e.data;
        }.bind(this);
        
        worker.postMessage("start"); 
    } 
  },
  props: ['question']
}
</script>
