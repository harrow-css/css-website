<template>
  <div>
    <div class="row" v-if="!!pyodide">
      <div class="col-md-12">
        <h1 class="fw-bold">Python AutoSolution</h1>
        Write your solution with the Python function
        <code>{{ this.$props.question.questionFunctionName }}()</code>
        <div class="container">
          <div class="row">
            <div class="col-8">
              <div class="input-group py-3">
                <Editor
                  class="border-0 rounded"
                  lang="python"
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

          <button
            type="button"
            class="btn btn-success btn-lg"
            v-on:click="test"
          >
            Test
          </button>
        </div>
      </div>
    </div>

    <div class="row" v-if="!!!pyodide">
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status"></div>
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
      pyodide: null,
      runerror: false,
      runtesting: false,
    }
  },
  props: ['question'],

  async created() {
    await this.initializePyodide()
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

        this.pyodide.runPython(`
        def print(n):
          return(n)
        `)
      } catch (error) {
        this.errorMsg = error
      }
    },
    run: async function () {
      console.log('run', this.code)
      this.pyodide
        .runPythonAsync(this.code)
        .then((output) => {
          if (this.runerror || this.runtesting) {
            this.output = ''
          }
          console.log('output', output)
          this.runerror = false
          this.runtesting = false
          this.output = this.output + output + '\n'
        })
        .catch((err) => {
          this.runerror = true
          this.output = err
        })
    },

    test: async function () {
      console.log('run', this.code)
      this.runtesting = true
      // this.pyodide.runPythonAsync(
      //   this.code
      // ).then((output) => {
      //   console.log("output" , output)
      //   this.output = 'testing'+(output) + '\n'

      // }).catch((err) => {
      //   this.runerror = true
      //   this.output = err
      // })

      const tests = this.question.questionTests
      console.log(typeof(tests))
      const functionname = this.$props.question.questionFunctionName

      for (const [key, value] of Object.entries(tests)) {

        this.pyodide
          .runPythonAsync(
            this.code + '\n' + String(functionname) + '(' + key + ')'
          )
          .then((output) => {
            console.log(output)
            let success = "";
            if (value == output) {
              success = "✔️";
            } else {
              success = "❌";
            }
            this.output =
              this.output +
              "INPUT: " +
              key +
              " // " +
              "OUTPUT: " +
              output +
              " // " +
              "EXPECTED: " +
              value +
              " | " +
              success +
              "\n";
            var textarea = document.getElementById("console");
            textarea.scrollTop = textarea.scrollHeight;
          })
          .catch((err) => console.log(err))
      }

      this.output = this.output + '\n'
    },
  },
}
</script>
