<template>
  <div
    class="relative flex flex-col justify-center min-h-screen overflow-hidden"
  >
    <div
      class="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md"
    >
      <h1 class="text-3xl font-semibold text-center text-purple-700 pb-5">
        Register
      </h1>

      <form @submit.prevent="submitForm" class="space-y-4">
        <div
          v-if="error"
          class="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
          role="alert"
        >
          <svg
            class="flex-shrink-0 inline w-4 h-4 mr-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
            />
          </svg>
          <span class="sr-only">Info</span>
          <div>{{ error }}</div>
        </div>
        <div>
          <label for="title" class="block text-gray-700 font-medium mb-2"
            >Username:</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            required
            class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <label for="title" class="block text-gray-700 font-medium mb-2"
            >Email:</label
          >
          <input
            type="text"
            id="email"
            v-model="email"
            required
            class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <label for="title" class="block text-gray-700 font-medium mb-2"
            >Password:</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            required
            class="w-full px-4 py-2 border rounded-md focus:ring focus:ring-purple-400 focus:outline-none"
          />
        </div>

        <div>
          <button
            type="submit"
            class="w-full px-4 py-2 text-white bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
          >
            Register
          </button>
        </div>
      </form>

      <div class="flex justify-center p-6">OR</div>

      <div class="flex justify-center">
        <GoogleLogin :callback="callback" />
      </div>

      <div class="flex justify-center pt-2 w-100">
        <button
          @click="msLogin"
          class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
          style="width: 250px"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            style="width: 20px; margin-right: 5px"
          />
          <span>Microsoft</span>
        </button>
      </div>

      <div class="flex justify-center p-6">
        <small><a href="/login">Already have an account ? Login now</a></small>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../../api";
import { decodeCredential } from "vue3-google-login";
import { signInAndGetUser } from "../../microsoftGraph";

export default {
  name: "Register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      error: "",
    };
  },

  methods: {
    callback(response) {
      axios
        .post(`/api/auth/google`, {
          credential: response.credential,
        })
        .then((response) => {
          const resData = response.data;
          if (resData.user) {
            localStorage.setItem("user", JSON.stringify(resData.user));
            localStorage.setItem("token", resData.user.token);
            this.$router.push("/");
          } else {
            this.error = error.response.data.message;
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
          if (error.response.data.error) {
            this.error = error.response.data.message;
          }
        })
        .finally(() => {});
    },

    msLogin() {
      signInAndGetUser().then((auth) => {
        axios
          .post(`/api/auth/msal`, {
            credential: auth.accessToken,
          })
          .then((response) => {
            const resData = response.data;
            if (resData.user) {
              localStorage.setItem("user", JSON.stringify(resData.user));
              localStorage.setItem("token", resData.user.token);
              this.$router.push("/");
            } else {
              this.error = error.response.data.message;
            }
          })
          .catch((error) => {
            console.error("API Error:", error);
            if (error.response.data.error) {
              this.error = error.response.data.message;
            }
          })
          .finally(() => {});
      });
    },

    submitForm() {
      axios
        .post(`/api/auth/register`, {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          const resData = response.data;
          if (resData.user) {
            this.$router.push("/login");
          } else {
            this.error = error.response.data.message;
          }
        })
        .catch((error) => {
          console.error("API Error:", error);
          if (error.response.data.error) {
            this.error = error.response.data.message;
          }
        })
        .finally(() => {});
    },
  },
};
</script>
