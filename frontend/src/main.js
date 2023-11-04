import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import vue3GoogleLogin from "vue3-google-login";
import * as Sentry from "@sentry/vue";

const app = createApp(App);

app.use(vue3GoogleLogin, {
  clientId:
    "932116579427-40n2t2gsf0b0h6gstlsl5lsid8st0rnb.apps.googleusercontent.com",
});

Sentry.init({
  app,
  dsn: "https://434d6979792cccdc4722328820ad783c@o4506169767624704.ingest.sentry.io/4506169768476672",
  integrations: [
    new Sentry.BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
    new Sentry.Replay(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

app.use(router);

app.mount("#app");
