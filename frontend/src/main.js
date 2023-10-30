import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from "vue3-google-login";

const app = createApp(App);

app.use(vue3GoogleLogin, {
  clientId:
    "932116579427-40n2t2gsf0b0h6gstlsl5lsid8st0rnb.apps.googleusercontent.com",
});

app.use(router);

app.mount("#app");
