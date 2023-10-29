<template>
  <div
    class="relative flex flex-col justify-center min-h-screen overflow-hidden"
  >
    <div
      class="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md"
    >
      <h1 class="text-3xl font-semibold text-center text-purple-700 pb-5">
        Login
      </h1>

      <div class="flex justify-center">
        <GoogleLogin :callback="callback" />
      </div>
    </div>
  </div>
</template>

<script>
import { decodeCredential } from "vue3-google-login";

export default {
  name: "Login",

  methods: {
    callback(response) {
      const userData = decodeCredential(response.credential);
      console.log("Handle the userData", userData);
    },
  },
};
</script>
