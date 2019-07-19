import axios from "axios";

const http = axios.create();

let defaultParams = {};

http.setup = function(options, params) {
  let { baseURL } = options;
  let {
    hotel_id,
    restaurant_id,
    device_type,
    device_id,
    device_name,
    app_name,
    point_type
  } = params;

  if (baseURL) http.defaults.baseURL = baseURL;

  if (hotel_id) defaultParams.hotel_id = hotel_id;
  if (restaurant_id) defaultParams.restaurant_id = restaurant_id;
  if (device_type) defaultParams.device_type = device_type;
  if (device_id) defaultParams.device_id = device_id;
  if (device_name) defaultParams.device_name = device_name;
  if (app_name) defaultParams.app_name = app_name;
  if (point_type) defaultParams.point_type = point_type;

  http.defaultParams = defaultParams;
};

http.interceptors.request.use(
  config => {
    config.params = config.params || {};
    Object.assign(config.params, defaultParams);
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

http.interceptors.response.use(
  res => {
    return res.data.data;
  },
  error => {
    let msg = "";
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          msg = "请求错误";
          break;
        case 404:
          msg = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          msg = "请求超时";
          break;
        case 500: {
          msg = { msg: "服务器错误", error: error.response.data };
          break;
        }
        case 501:
          msg = "服务未实现";
          break;
        case 502:
          msg = "网关错误";
          break;
        case 503:
          msg = "服务不可用";
          break;
        case 504:
          msg = "网关超时";
          break;
        case 505:
          msg = "HTTP版本不受支持";
          break;
        default:
          break;
      }
    }
    return Promise.reject(msg);
  }
);

export default http;
