<template>
  <prism-editor
    class="my-editor"
    v-model="code"
    :highlight="highlighter"
    line-numbers
  ></prism-editor>
</template>

<script>
// import Prism Editor
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css' // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-python'

import 'prismjs/themes/prism-tomorrow.css' // import syntax highlighting styles

export default {
  components: {
    PrismEditor,
  },
  props: ['lang','functionname'],

  created() {
    if ((this._props.lang == 'python')) {
      this.code = `def ${this._props.functionname}(x):
  # write your code here
  return x
  
# uncomment line below to run your code and see output
# print(${this._props.functionname}(2))
# make sure to recomment it out before testing`;
  
    } else if ((this._props.lang == 'javascript')) {
      this.code = `function ${this._props.functionname}(x) {
  // write your code here
  return x
}`;
    }
  },
  data: () => ({ code: '' }),
  methods: {
    highlighter(code) {
      if ((this._props.lang == 'python')) {
        return highlight(code, languages.python)
      } else if ((this._props.lang == 'javascript')) {
        return highlight(code, languages.js)
      }
    },
  },
  watch: {
    code(newCode) {
      this.$emit('input', newCode)
    },
  },
}
</script>

<style>
.my-editor {
  background: #2d2d2d;
  color: #ccc;

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
}

.prism-editor__textarea:focus {
  outline: none;
}
</style>
