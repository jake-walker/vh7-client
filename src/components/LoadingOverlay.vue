<template>
  <v-overlay :value="show">
    <v-card>
      <v-card-text>
        <v-progress-circular :indeterminate="progress >= 100" color="primary" class="mr-2" :value="progress"/>
        {{ loadingText }}
      </v-card-text>
    </v-card>
  </v-overlay>
</template>

<script>
export default {
  name: "LoadingOverlay",
  props: {
    value: Boolean,
    progress: {
      type: Number,
      default: 100
    },
    action: {
      type: String,
      default: "Loading"
    }
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
    loadingText() {
      if (this.progress < 100) {
        return `${this.action} ${this.progress.toFixed(1)}%...`;
      }

      return `${this.action}...`;
    }
  }
}
</script>
