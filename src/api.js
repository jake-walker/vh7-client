import axios from 'axios';
import store from './store';

export class ApiService {
  constructor() {
    this.base = "https://vh7.uk";
    this.url = `${this.base}/api`;
    this.headers = {};
    this.initialize();
  }

  async initialize() {
    if (store.state.apiKey) {
      console.log("Authorizing API requests");
      this.headers = {
        Authorization: `Bearer ${store.state.apiKey}`
      }
    }

    this.client = axios.create({
      baseURL: this.url,
      headers: this.headers
    });

    console.log("Intitialized client", this.url);
  }

  parseError(error) {
    if (error.response) {
      if (error.response.data != null && typeof error.response.data === 'object') {
        const errorObject = error.response.data;

        if (Object.prototype.hasOwnProperty.call(errorObject, "errors")) {
          const errorList = Object.values(errorObject["errors"]).flat().join(", ");
          return `The server returned an ${error.response.status} error: ${errorList}`;
        } else {
          return `The server returned an ${error.response.status} error: ${JSON.stringify(errorObject)}`;
        }
      } else if (error.response.status == 500) {
        return "The server could not handle your request at the moment. Please try again";
      } else {
        return `The server returned an ${error.response.status} error: ${error.response.data}`;
      }
    } else if (error.request) {
      return "The server did not respond!";
    } else {
      return `There was an unexpected error: ${error.message}`;
    }
  }

  async getUser() {
    if (!this.client) {
      await this.initialize();
    }

    const response = await this.client.get("/user");
    return response.data;
  }

  async shorten(url) {
    if (!this.client) {
      await this.initialize();
    }

    const response = await this.client.post("/shorten", {
      url
    });
    return response.data;
  }

  async paste(code, language) {
    if (!this.client) {
      await this.initialize();
    }

    const response = await this.client.post("/paste", {
      code,
      language
    });
    return response.data;
  }

  async upload(file, onUploadProgress) {
    if (!this.client) {
      await this.initialize();
    }

    let formData = new FormData();
    formData.append("file", file);

    const response = await this.client.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress: onUploadProgress
    });
    return response.data;
  }

  async getLanguages() {
    if (!this.client) {
      await this.initialize();
    }

    const response = await this.client.get("/languages");
    return response.data;
  }
}
