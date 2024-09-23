import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import store from "./store/usersStore";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCnoe__VmM8vaX3AfbFQHDDXmVtg33WK3U",
    loading: "async",
  },
});
new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
