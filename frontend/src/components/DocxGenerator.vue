<template>
  <div class="docx-generator">
    <h2>(3) Generate Word Document</h2>
    <button @click="generateDocx">Generate Document</button>
  </div>
</template>

<script>
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import { toRaw } from "vue";

export default {
  name: "DocxGenerator",
  props: {
    selectedFile: String,
    selectedJson: JSON,
  },
  methods: {
    async generateDocx() {
      if(!this.selectedFile || Object.keys(this.selectedJson).length === 0 || toRaw(this.selectedJson).default){
        alert("Please select a file and valid input JSON data first.");
        return;
      }
      try {
        const template = await this.loadTemplate();
        const doc = new Docxtemplater(template, {
          paragraphLoop: true,
          linebreaks: true,
        });
        const data = {
          data :  this.selectedJson
        }

        doc.render(data);
        const output = doc.getZip().generate({ type: "blob" });

        saveAs(output, `${this.selectedFile}_new.docx`);
      } catch (error) {
        console.error("Error generating document:", error);
      }
    },

    async loadTemplate() {
      const response = await fetch(`http://localhost:3000/files/${this.selectedFile}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to load template");
      }
      const arrayBuffer = await response.arrayBuffer();
      return new PizZip(arrayBuffer);
    },
  },
};
</script>

<style scoped>
.docx-generator {
  text-align: center;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #369f74;
}
</style>
