<template>
  <v-container>
    <v-form>
      <v-textarea v-model="code" :error-messages="codeErrors" label="Code" required @input="$v.code.$touch()" @blur="$v.code.$touch()" outlined/>
      <v-select v-model="language" label="Language" :items="languages" item-text="name" item-value="id" required outlined/>

      <v-btn color="primary" @click="submit" class="mr-4">Paste</v-btn>
      <v-btn color="secondary" @click="clear">Clear</v-btn>
    </v-form>

    <result-snackbar v-model="hasPasted" :result="result"/>
    <loading-overlay v-model="isLoading" action="Pasting"/>
  </v-container>
</template>

<script>
import ResultSnackbar from '../components/ResultSnackbar';
import LoadingOverlay from '../components/LoadingOverlay';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

export default {
  name: 'Paste',
  mixins: [validationMixin],
  components: {
    ResultSnackbar,
    LoadingOverlay
  },
  validations: {
    code: { required },
  },
  data: () => ({
    code: "",
    language: "plaintext",
    languages: [],
    hasPasted: false,
    isLoading: false,
    result: {}
  }),
  computed: {
    codeErrors() {
      const errors = [];
      if (!this.$v.code.$dirty) return errors;
      !this.$v.code.required && errors.push("Code is required");
      return errors;
    },
  },
  methods: {
    async submit() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.isLoading = true;
        try {
          const data = await this.$api.paste(this.code, this.language);
          this.result = data;
          this.hasPasted = true;
          this.clear();
        } catch (e) {
          // TODO: Make this better
          alert(`There was a problem while uploading! ${this.$api.parseError(e)}`);
        } finally {
          this.isLoading = false;
        }
      }
    },
    clear() {
      this.$v.$reset();
      this.code = "";
      this.language = "plaintext";
    }
  },
  async mounted() {
    this.languages = await this.$api.getLanguages();
  }
}
</script>
