<template>
    <div class="json-editor">
        <h2>(2) Input your JSON</h2>
      <textarea 
        v-model="jsonString" 
        @input="updateJson" 
        spellcheck="false"
      ></textarea>
      <p v-if="error" class="error">Invalid JSON: {{ error }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'JsonEditor',
    props: {
      value: {
        type: JSON,
        default: {},
      },
    },
    data() {
      return {
        jsonString: JSON.stringify(this.value, null, 2),
        error: null,
      };
    },
    methods: {
      updateJson() {
        try {
          const parsedJson = JSON.parse(this.jsonString);
          this.error = null;
          this.$emit('input-json', parsedJson);
        } catch (e) {
          this.$emit('input-json', {});
          this.error = e.message;
        }
      },
    },
    watch: {
      value: {
        deep: true,
        handler(newValue) {
          this.jsonString = JSON.stringify(newValue, null, 2);
        },
      },
    },
  };
  </script>
  
  <style scoped>
  .json-editor {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
  
  textarea {
    height: 100%;
    font-family: monospace;
    margin: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
  }
  
  .error {
    color: red;
    margin-top: 5px;
  }
  </style>
  