import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;
import api from "../src/index";
Vue.use(api, {
  axiosOptions: {
    baseURL: "junction/"
  },
  defaultParams: {
    hotel_id: "0086000029",
    restaurant_id: "r001",
    device_type: "tv",
    device_name: "tv"
  }
});

new Vue({
  render: h => h(App)
}).$mount("#app");
