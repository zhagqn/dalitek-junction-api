/*!
 * junction-api v0.2.4 
 * (c) 2019 zhagqn
 * Released under the MIT License.
 */
import axios from 'axios';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

var http = {};
var defaultParams = {};

http.setup = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fly = arguments.length > 2 ? arguments[2] : undefined;
  var baseURL = options.baseURL;
  var hotel_id = params.hotel_id,
      restaurant_id = params.restaurant_id,
      device_type = params.device_type,
      device_id = params.device_id,
      device_name = params.device_name,
      app_name = params.app_name,
      point_type = params.point_type;

  if (fly) {
    http.request = fly;
    http.request.config.baseURL = baseURL;
  } else {
    http.request = axios.create();
    if (baseURL) http.request.defaults.baseURL = baseURL;
  }

  if (hotel_id) defaultParams.hotel_id = hotel_id;
  if (restaurant_id) defaultParams.restaurant_id = restaurant_id;
  if (device_type) defaultParams.device_type = device_type;
  if (device_id) defaultParams.device_id = device_id;
  if (device_name) defaultParams.device_name = device_name;
  if (app_name) defaultParams.app_name = app_name;
  if (point_type) defaultParams.point_type = point_type;
  http.defaultParams = defaultParams;
  http.request.interceptors.request.use(function (config) {
    config.params = config.params || {};
    Object.assign(config.params, defaultParams);
    return config;
  }, function (error) {
    Promise.reject(error);
  });
  http.request.interceptors.response.use(function (res) {
    return res.data.data;
  }, function (error) {
    var msg = "";

    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          msg = "请求错误";
          break;

        case 404:
          msg = "\u8BF7\u6C42\u5730\u5740\u51FA\u9519: ".concat(error.response.config.url);
          break;

        case 408:
          msg = "请求超时";
          break;

        case 500:
          {
            msg = {
              msg: "服务器错误",
              error: error.response.data
            };
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
  });
};

http.setup();

var cart = {
  get: function get() {
    return http.request.get("/cart/");
  },
  size: function size() {
    return http.get("/cart/size/");
  },
  post: function post(_ref) {
    var lang_agnostic_id = _ref.lang_agnostic_id,
        _ref$quantity = _ref.quantity,
        quantity = _ref$quantity === void 0 ? 1 : _ref$quantity,
        _ref$select = _ref.select,
        select = _ref$select === void 0 ? 1 : _ref$select,
        _ref$variants = _ref.variants,
        variants = _ref$variants === void 0 ? [] : _ref$variants,
        _ref$note = _ref.note,
        note = _ref$note === void 0 ? "" : _ref$note;
    return http.post("/cart/", {
      lang_agnostic_id: lang_agnostic_id,
      quantity: quantity,
      select: select,
      variants: variants,
      note: note
    });
  },
  update: function update(_ref2) {
    var cart_id = _ref2.cart_id,
        quantity = _ref2.quantity,
        note = _ref2.note,
        selected = _ref2.selected;
    var options = {
      quantity: quantity
    };
    if (note) options.note = note;
    if (selected) options.selected = selected;
    return http.put("cart/".concat(cart_id, "/"), options);
  },
  delete: function _delete(id) {
    return http.delete("cart/".concat(id, "/"));
  },
  place_order: function place_order(_ref3) {
    var _ref3$expected_delive = _ref3.expected_delivery_time,
        expected_delivery_time = _ref3$expected_delive === void 0 ? 0 : _ref3$expected_delive,
        _ref3$note = _ref3.note,
        note = _ref3$note === void 0 ? "" : _ref3$note,
        recipient_name = _ref3.recipient_name,
        recipient_phone = _ref3.recipient_phone,
        address = _ref3.address;
    return http.post("/cart/place_order/", {
      expected_delivery_time: expected_delivery_time,
      note: note,
      recipient_name: recipient_name,
      recipient_phone: recipient_phone,
      address: address
    });
  },
  request_service: function request_service(lang_agnostic_id) {
    var expected_delivery_time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return http.post("/cart/request_service/", {
      quantity: 1,
      lang_agnostic_id: lang_agnostic_id,
      expected_delivery_time: expected_delivery_time,
      variants: [],
      note: ""
    });
  },
  single_merchandise_order: function single_merchandise_order(_ref4) {
    var lang_agnostic_id = _ref4.lang_agnostic_id,
        _ref4$quantity = _ref4.quantity,
        quantity = _ref4$quantity === void 0 ? 1 : _ref4$quantity,
        _ref4$select = _ref4.select,
        select = _ref4$select === void 0 ? 1 : _ref4$select,
        _ref4$variants = _ref4.variants,
        variants = _ref4$variants === void 0 ? [] : _ref4$variants,
        _ref4$note = _ref4.note,
        note = _ref4$note === void 0 ? "" : _ref4$note;
    return http.post("/cart/single_merchandise_order/", {
      lang_agnostic_id: lang_agnostic_id,
      quantity: quantity,
      select: select,
      variants: variants,
      note: note
    });
  }
};

var customer_address = {
  get: function get() {
    return http.request.get("/customer_address/");
  }
};

var customer_order = {
  get: function get(id) {
    if (id) return http.request.post("/customer_order/".concat(id, "/"));else return http.request.post("/customer_order/");
  },
  pay: function pay(orderId, type) {
    return http.request.post("/customer_order/".concat(orderId, "/pay/?pay_method=").concat(type));
  },
  is_paid: function is_paid(orderId) {
    return http.request.get("/customer_order/".concat(orderId, "/is_paid/"));
  },
  mark_paid: function mark_paid(orderId, payment, money) {
    return http.request.post("/customer_order/".concat(orderId, "/mark_paid/?").concat(payment, "=").concat(money));
  }
};

var customer = {
  login: function login( // phone 手机号登录
  // wechat 微信公众号/小程序登录
  // test 测试环境CTS顾客登录
  // uuid UUID登录
  type, _ref) {
    var phone = _ref.phone,
        password = _ref.password,
        security_code = _ref.security_code,
        hotel_id = _ref.hotel_id,
        restaurant_id = _ref.restaurant_id,
        wechat_official_login = _ref.wechat_official_login,
        wechat_mini_program_login = _ref.wechat_mini_program_login,
        auto_wechat_register = _ref.auto_wechat_register,
        code = _ref.code,
        cts_card_number = _ref.cts_card_number,
        cts_password = _ref.cts_password,
        uuid_register = _ref.uuid_register,
        customer_uuid = _ref.customer_uuid;

    switch (type) {
      case "phone":
        return http.request.post("/customer/login/", {
          phone: phone,
          password: password,
          security_code: security_code
        });

      case "wechat":
        return http.request.post("/customer/login/", {
          hotel_id: hotel_id ? hotel_id : http.defaultParams.hotel_id,
          restaurant_id: restaurant_id ? restaurant_id : http.defaultParams.restaurant_id,
          wechat_official_login: wechat_official_login ? wechat_official_login : 1,
          wechat_mini_program_login: wechat_mini_program_login ? wechat_mini_program_login : 1,
          auto_wechat_register: auto_wechat_register ? auto_wechat_register : 1,
          code: code
        });

      case "test":
        return http.request.post("/customer/login/", {
          cts_card_number: cts_card_number,
          cts_password: cts_password
        });

      case "uuid":
        return http.request.post("/customer/login/", {
          uuid_register: uuid_register ? uuid_register : 1,
          customer_uuid: customer_uuid
        });

      default:
        break;
    }
  },
  point: function point(customer_uuid, point_type) {
    return http.request.get("/customer/point/?customer_uuid=".concat(customer_uuid, "&point_type=").concat(point_type));
  },
  stats: function stats() {
    var _stats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ["num_unread_order_messages", "num_pending_orders"];

    return http.request.get("/customer/stats/?stats=".concat(_stats.toString()));
  },
  door_locks: function door_locks(door_password) {
    return http.request.get("/customer/door_locks/?door_password=".concat(door_password));
  }
};

var device = {
  get: function get() {
    return http.request.get("/device/get/?saveip=1");
  },
  register: function register(room, validation_code) {
    return http.request.post("/device/register/", {
      hotel_id: http.defaultParams.hotel_id,
      device_id: http.defaultParams.device_id,
      device_name: http.defaultParams.device_name,
      device_type: http.defaultParams.device_type,
      room: room,
      validation_code: validation_code
    });
  }
};

var event = {
  get: function get() {
    return http.request.get("/event/");
  },
  event_result: {
    get: function get(id) {
      return http.request.get("/event/".concat(id, "/event_result/"));
    },
    post: function post(id, event_type) {
      return http.request.post("/event/".concat(id, "/event_result/"), {
        event_type: event_type
      });
    }
  },
  event_result_address: function event_result_address(_ref) {
    var event_id = _ref.event_id,
        recipient_name = _ref.recipient_name,
        recipient_phone = _ref.recipient_phone,
        address = _ref.address;
    return http.request.post("/event/".concat(event_id, "/event_result_address/"), {
      recipient_name: recipient_name,
      recipient_phone: recipient_phone,
      address: address
    });
  },
  claim_item: function claim_item(_ref2) {
    var airline_code = _ref2.airline_code,
        airline_card_number = _ref2.airline_card_number,
        redeem_code = _ref2.redeem_code;
    return http.request.post("/event/claim_item/", {
      airline_code: airline_code,
      airline_card_number: airline_card_number,
      redeem_code: redeem_code
    });
  }
};

var hotel = {
  guest_profile: function guest_profile() {
    return http.request.get("/hotel/guest_profile/");
  },
  access_token: function access_token(door_password) {
    var token_type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "room_control";
    return http.request.get("/hotel/guest_profile/?token_type=".concat(token_type, "&door_password=").concat(door_password));
  }
};

var image = {
  get: function get() {
    return http.request.get("/image/");
  }
};

var qs = require("querystring");

var page = {
  get: function get(id) {
    return http.request.get("/page/".concat(id, "/"));
  },
  batch: function batch(ids) {
    return http.request.get("page/batch/?page_id=".concat(ids.join(",")));
  },
  // page_type: "info_list" "info_page"
  search: function search(lang_agnostic_id, page_type) {
    var params = {
      page_type: page_type,
      lang_agnostic_id: lang_agnostic_id
    };
    return http.request.get("/page/search/?".concat(qs.stringify(params)));
  },
  hotel: function hotel() {
    return http.request.get("/page/hotel/");
  },
  butler_startpage: function butler_startpage() {
    return http.request.get("/page/butler_startpage/");
  },
  bulter_welcomepage: function bulter_welcomepage() {
    return http.request.get("/page/butler_welcomepage/");
  },
  bulter_homepage: function bulter_homepage() {
    return http.request.get("/page/butler_homepage/");
  },
  butler_tv_channels: function butler_tv_channels() {
    return http.request.get("/page/butler_tv_channels/");
  },
  butler_room_ctrl: function butler_room_ctrl(door_password) {
    return http.request.get("/page/butler_room_ctrl/?door_password=".concat(door_password));
  }
};

var room_order = {
  get: function get(id) {
    if (id) return http.request.post("/room_order/".concat(id));else return http.request.post("/room_order/");
  },
  pay: function pay(orderId, type) {
    return http.request.post("/room_order/".concat(orderId, "/pay/?pay_method=").concat(type));
  },
  is_paid: function is_paid(orderId) {
    return http.request.get("/room_order/".concat(orderId, "/is_paid/"));
  },
  mark_paid: function mark_paid(orderId, payment, money) {
    return http.request.post("/room_order/".concat(orderId, "/mark_paid/?").concat(payment, "=").concat(money));
  }
};

var util = {
  now: function now() {
    return http.request.get("/util/now/");
  },
  qr_code: function qr_code(code) {
    return http.request.get("/util/qr_code/?code=".concat(code));
  }
};

var setup = function setup(axiosOptions, defaultParams, fly) {
  http.setup(axiosOptions, defaultParams, fly);
};

var apis = {
  http: http,
  cart: cart,
  customer_address: customer_address,
  customer_order: customer_order,
  customer: customer,
  device: device,
  event: event,
  hotel: hotel,
  image: image,
  page: page,
  room_order: room_order,
  util: util
};

var install = function install(Vue, initOptions) {
  if (install.installed) return;
  install.installed = true;
  var axiosOptions = initOptions.axiosOptions,
      defaultParams = initOptions.defaultParams,
      fly = initOptions.fly;
  setup(axiosOptions, defaultParams, fly);
  Vue.prototype.$api = _objectSpread2({}, apis, {
    setup: setup
  });
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

var index = _objectSpread2({
  install: install,
  setup: setup
}, apis);

export default index;
