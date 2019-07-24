import http from "./http";
import cart from "./apis/cart";
import customer_address from "./apis/customer_address";
import customer_order from "./apis/customer_order";
import customer from "./apis/customer";
import device from "./apis/device";
import event from "./apis/event";
import hotel from "./apis/hotel";
import image from "./apis/image";
import page from "./apis/page";
import room_order from "./apis/room_order";
import util from "./apis/util";

const setup = (axiosOptions, defaultParams, fly) => {
  http.setup(axiosOptions, defaultParams, fly);
};

const apis = {
  http,
  cart,
  customer_address,
  customer_order,
  customer,
  device,
  event,
  hotel,
  image,
  page,
  room_order,
  util
};

const install = function(Vue, initOptions) {
  if (install.installed) return;
  install.installed = true;
  let { axiosOptions, defaultParams, fly } = initOptions;
  setup(axiosOptions, defaultParams, fly);
  Vue.prototype.$api = { ...apis, setup };
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  setup,
  ...apis
};
