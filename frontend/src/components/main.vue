<template>
  <div>
    <h1 class="main-heading">Generate Dynamic Docx Files</h1>
    <div class="container">
    <FilesList @file-selected="onFileSelected" class="grid-item" />
    <JsonEditor @input-json="onInputJson" :value="{}" class="grid-item" />
    <DocxGenerator :selectedFile="selectedFile" :selectedJson="selectedJson" class="grid-item" />
  </div>
  </div>
</template>

<script>
import DocxGenerator from './DocxGenerator.vue';
import FilesList from './FilesList.vue';
import JsonEditor from './JsonEditor.vue';

export default {
  name: 'MainApp',
  props: {
    msg: String
  },
  data() {
    return {
      selectedFile: {
        type: String,
        default: '',
      },
      selectedJson: {
        type: JSON,
        default: {},
      },
    };
  },
  methods: {
    onFileSelected(fileName) {
      this.selectedFile = fileName;
    },
    onInputJson(json) {
      this.selectedJson = json;
    },
  },
  components: {
    DocxGenerator,
    FilesList,
    JsonEditor,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

.main-heading {
  margin-bottom: 2rem;
}
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
}

.grid-item {
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 4px;
  background-color: #f9f9f9;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
