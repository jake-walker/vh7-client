<template>
  <v-snackbar v-model="show">
    Shortened to {{ $api.base + result.link }} and copied to clipboard.
    <span v-if="result.upload">It will expire {{ uploadExpiry }}.</span>

    <template v-slot:action="{ attrs }">
      <v-btn color="primary" text v-bind="attrs" @click="show = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { DateTime } from "luxon";

export default {
  name: "ResultSnackbar",
  props: {
    value: Boolean,
    result: Object
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        return this.$emit("input", value);
      }
    },
    uploadExpiry() {
      if (!this.result.upload) { return ""; }

      return DateTime.fromISO(this.result.upload.expires).toLocaleString(DateTime.DATE_FULL);
    }
  },
  watch: {
    show(val) {
      if (val === true) {
        this.copyToClipboard();
      }
    }
  },
  methods: {
    copyToClipboard() {
      var shortenedUrl = this.$api.base + this.result.link;
      this.$copyText(shortenedUrl).then(function(e) {
        console.log("Copied to clipboard!", e);
      }, function(e) {
        console.log("cannot copy", e);
      })
    }
  }
}
</script>
