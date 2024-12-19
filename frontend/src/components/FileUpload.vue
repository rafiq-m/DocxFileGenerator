<template>
    <div class="file-upload">
      <h2>(1) Upload a File</h2>
      <input
        type="file"
        accept=".doc, .docx"
        ref="fileInput"
        @change="handleFileChange"
        :multiple="multiple"
      />
      <button @click="uploadFiles">Upload</button>
  
      <div v-if="files.length">
        <h3>Selected Files:</h3>
        <ul>
          <li v-for="(file, index) in files" :key="index">
            {{ file.name }} ({{ (file.size / 1024).toFixed(2) }} KB)
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "FileUpload",
    props: {
      multiple: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        files: [],
      };
    },
    methods: {
      handleFileChange(event) {
        const selectedFiles = Array.from(event.target.files);
        this.files = [selectedFiles[0]];
      },
      async uploadFiles() {
        if (!this.files.length) {
          alert("Please select a file first.");
          return;
        }
  
        try {
          const formData = new FormData();
          this.files.forEach((file) => formData.append("file", file));
  
          const response = await fetch("http://localhost:3000/files/upload", {
            method: "POST",
            body: formData,
          });
  
          if (!response.ok) {
            throw new Error("Failed to upload files.");
          }
  
          this.$emit("files-uploaded");
          alert("Files uploaded successfully!");
        } catch (error) {
          console.error(error);
          alert("Error uploading files: " + error.message);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .file-upload {
    padding: 20px;
    margin: 0 auto;
  }
  
  .file-upload h2 {
    margin-bottom: 16px;
  }
  
  .file-upload ul {
    list-style-type: none;
    padding: 0;
  }
  
  .file-upload li {
    margin: 4px 0;
  }
  
  button {
    margin-top: 12px;
    padding: 8px 16px;
    border: none;
    background-color: #42b983;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #369f74;
  }
  </style>
  