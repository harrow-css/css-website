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

          <button type="button" class="btn btn-success btn-lg" v-on:click="test">
            Test
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
    test() {
      this.runtesting = true;

        var blob = new Blob([`onmessage = (event) => {
  const { data } = event;
  const output = drones(parseInt(data));
  postMessage(output);
};
` +this.code.toString()], { type: "text/javascript" });

        var worker = new Worker(window.URL.createObjectURL(blob));

        var results = [];
        var iterationcounter = 0
        var numberoftrials = Object.keys(this.question.questionTests).length;
        
        // The view model.
        var vm = this;

        // on web worker message, add the result to the results array
        worker.onmessage = function(event,context) {
          results.push(event.data);
          iterationcounter++;
  
          if (iterationcounter == numberoftrials) {
            for (let i = 0; i < results.length; i++) {
              // console.log(results[i])

              console.log(vm.question.questionTests[i])
            
            }
          }
        }

        const tests = this.question.questionTests
        
        for (const [key, value] of Object.entries(tests)) {
          worker.postMessage(key); 
        }


        
    } 
  },
  props: ['question']
}
</script>
