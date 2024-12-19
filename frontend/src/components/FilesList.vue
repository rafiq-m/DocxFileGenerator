<template>
  <div class="files-list">
    <FileUpload @files-uploaded="onFilesUploaded" />
    <hr />
    <h2>List of files</h2>
    <ul>
      <li v-for="(file, index) in files" :key="index" class="file-item">
        <label>
          <input
            type="radio"
            name="selectedFile"
            :value="file"
            v-model="selectedFile"
          />
          {{ file }}
        </label>
        <hr />
      </li>
    </ul>
  </div>
</template>

<script>
import FileUpload from "./FileUpload.vue";

export default {
  name: "FilesList",
  data() {
    return {
      files: {
        type: new Array() < String > [],
        default: [],
      },
    selectedFile: "",
    };
  },
  components: {
    FileUpload,
  },
  methods: {
    async onFilesUploaded() {
      await this.getFiles();
    },
    async getFiles() {
      const response = await fetch("http://localhost:3000/files/list", {
        method: "GET",
      });
      this.files = await response.json();
    },
  },
  async created() {
      await this.getFiles();
    },
  watch: {
    selectedFile(newVal) {
      this.$emit("file-selected", newVal);
    },
  },
};
</script>

<style scoped>
.files-list {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.file-item {
  margin: 5px 0;
}

label {
  cursor: pointer;
  display: flex;
  align-items: center;
}

input[type="radio"] {
  margin-right: 10px;
}
</style>
