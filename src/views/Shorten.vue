<template>
  <v-container>
    <v-form>
      <v-text-field v-model="url" :error-messages="urlErrors" label="URL" required @input="$v.url.$touch()" @blur="$v.url.$touch()" outlined></v-text-field>

      <v-btn color="primary" @click="submit" class="mr-4">Shorten</v-btn>
      <v-btn color="secondary" @click="clear">Clear</v-btn>
    </v-form>

    <result-snackbar v-model="hasShortened" :result="result"/>
    <loading-overlay v-model="isLoading" action="Shortening"/>
  </v-container>
</template>

<script>
import ResultSnackbar from '../components/ResultSnackbar';
import LoadingOverlay from '../components/LoadingOverlay';
import { validationMixin } from 'vuelidate';
import { required, url } from 'vuelidate/lib/validators';

export default {
  name: 'Shorten',
  mixins: [validationMixin],
  components: {
    ResultSnackbar,
    LoadingOverlay
  },
  validations: {
    url: { required, url }
  },
  data: () => ({
    hasShortened: false,
    isLoading: false,
    result: {},
    url: ""
  }),
  computed: {
    urlErrors() {
      const errors = [];
      if (!this.$v.url.$dirty) return errors;
      !this.$v.url.required && errors.push("URL is required");
      !this.$v.url.url && errors.push("URL must be a valid URL");
      return errors;
    }
  },
  methods: {
    async submit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.isLoading = true;
        try {
          const data = await this.$api.shorten(this.url);
          this.result = data;
          this.hasShortened = true;
          this.clear();
        } catch (e) {
          // TODO: Make this better
          alert(`There was a problem while shortening! ${this.$api.parseError(e)}`);
        } finally {
          this.isLoading = false;
        }
      }
    },
    clear() {
      this.$v.$reset();
      this.url = "";
    }
  },
  created() {
    this.url = this.$route.query.url || "";
  }
}
</script>
