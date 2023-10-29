import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from "vue3-google-login";

const app = createApp(App);

app.use(vue3GoogleLogin, {
  clientId: "906215769112-fjas8ele0ohdths2vbg0cb9jkggnnugd.apps.googleusercontent.com",
});

app.use(router);

app.mount("#app");
