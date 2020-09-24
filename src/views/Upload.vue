<template>
  <v-container>
    <v-form>
      <v-file-input v-model="file" label="File" outlined/>

      <v-alert :type="retention > -1 || !file ? 'info' : 'error'">
        <div v-if="file">
          <span v-if="retention > -1">
            Your file is {{ fileSize }} MB and will last approximately {{ retention }} days.
          </span>
          <span v-else>
            Your file is {{ fileSize }} MB and is too large!
          </span>
        </div>
        <div v-else>
          Uploaded files will last between 30 and 90 days depending on their size. The maximum size for uploads is 256 MB.
        </div>
      </v-alert>

      <v-btn color="primary" @click="submit" class="mr-4" :disabled="!valid">Shorten</v-btn>
      <v-btn color="secondary" @click="clear">Clear</v-btn>
    </v-form>

    <result-snackbar v-model="hasUploaded" :result="result"/>
    <loading-overlay v-model="isLoading" :progress="uploadProgress" action="Uploading"/>
  </v-container>
</template>

<script>
import ResultSnackbar from '../components/ResultSnackbar';
import LoadingOverlay from '../components/LoadingOverlay';

export default {
  name: 'Upload',
  components: {
    ResultSnackbar,
    LoadingOverlay
  },
  data: () => ({
    hasUploaded: false,
    isLoading: false,
    result: {},
    file: null,
    minAge: 30,
    maxAge: 90,
    maxSize: 256,
    uploadProgress: 100
  }),
  computed: {
    fileSize() {
      if (!this.file) return -1;
      return (this.file.size / 1e+6).toFixed(2);
    },
    retention() {
      if (this.fileSize > this.maxSize || this.fileSize < 0) {
        return -1;
      }

      const result = (this.minAge + (-this.maxAge + this.minAge) * Math.pow((this.fileSize / this.maxSize - 1), 3));
      return Math.floor(result);
    },
    valid() {
      return this.file && this.retention > -1;
    }
  },
  methods: {
    onUploadProgress(e) {
      this.uploadProgress = (e.loaded / e.total) * 100;
    },
    clear() {
      this.file = null;
    },
    async submit() {
      if (this.valid) {
        this.isLoading = true;
        try {
          const data = await this.$api.upload(this.file, this.onUploadProgress);
          this.result = data;
          this.hasUploaded = true;
          this.clear();
        } catch (e) {
          // TODO: Make this better
          alert(`There was a problem while uploading! ${this.$api.parseError(e)}`);
        } finally {
          this.isLoading = false;
        }
      }
    }
  }
}
</script>
