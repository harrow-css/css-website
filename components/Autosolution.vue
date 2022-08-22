<template>
  <div class="row">
    <div class="col-md-12">
      <h1 class="fw-bold">Python AutoSolution</h1>
      {{ this.$props.questionTests }}
      <div class="container">
        <div class="row">
          <div class="col-8">
            <div class="input-group py-3">
              <textarea
                style="height: 400px; font-family: 'Baloo Bhaijaan 2', cursive"
                v-model="code"
                class="form-control bg-dark text-white border-0"
                aria-label="With textarea"
                id="submission"
              ></textarea>
            </div>
          </div>
          <div class="col-4">
            <div class="input-group py-3">
              <textarea
                style="height: 400px; font-family: 'Baloo Bhaijaan 2', cursive"
                v-model="output"
                class="form-control bg-secondary text-white border-0"
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
     return {
      output: "",
      code: "# Paste your solution here",
      loaded: false,
      pyodide: null,
    };
  },
  props: ['questionTests'],
  async mounted() {
    if (!!this.$props.questionTests) {
      await this.initializePyodide();
      this.loaded = true;
    } else {
      this.loaded = true;
    }
  },
  methods: {
    initializePyodide: async function () {
      try {
        this.pyodide = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.18.1/full/',
        })
        // wait for pyodide ready
        await window.languagePluginLoader
        // load pandas lib
        //await window.pyodide.loadPackage(["pandas", "scikit-learn"]);
      } catch (error) {
        this.errorMsg = error
      }
    },
    run: async function main() {
      const  tests  = this.$props.questionTests
      const  functionname  ="test()"
      for (let i = 0; i < tests.length; i++) {
        this.pyodide
          .runPythonAsync(
            this.code + "\n" + String(functionname) + "(" + tests[i][0] + ")"
          )
          .then((output) => {
            console.log(output)
            // let success = "";
            // if (tests[i][1] == output) {
            //   success = "✔️";
            // } else {
            //   success = "❌";
            // }
            // this.output =
            //   this.output +
            //   "INPUT: " +
            //   tests[i][0] +
            //   " // " +
            //   "OUTPUT: " +
            //   output +
            //   " // " +
            //   "EXPECTED: " +
            //   tests[i][1] +
            //   " | " +
            //   success +
            //   "\n";
            // var textarea = document.getElementById("console");
            // textarea.scrollTop = textarea.scrollHeight;
          })
          .catch((err) => (console.log(err)));
      }
      this.output = this.output + "\n";
    },
  },
  
}
</script>
