import http from "../http";

const customer = {
  login(
    // phone 手机号登录
    // wechat 微信公众号/小程序登录
    // test 测试环境CTS顾客登录
    // uuid UUID登录
    type,
    {
      // type = phone
      // phone 用户的手机号码。手机号码必须是如下格式：+86-123456789，即加号后面是国家代码，然后减号，最后纯数字手机号码。
      // password 用户的密码
      // security_code 用户首次登录，或是换设备登录时，一定要有这个参数。这个参数来自于短信验证码接口
      phone,
      password,
      security_code,
      // type = wechat
      // hotel_id 酒店ID
      // restaurant_id 餐厅ID
      // wechat_official_login 必须传数值1，系统才会做微信公众号登录
      // wechat_mini_program_login 必须传数值1，系统才会做微信小程序登录
      // auto_wechat_register 必须传数值1，系统才会自动注册。
      // code 微信在用户同意后，生成的授权 code。见“获取微信公众号授权 code url 接口”
      hotel_id,
      restaurant_id,
      wechat_official_login,
      wechat_mini_program_login,
      auto_wechat_register,
      code,
      // type = test
      // cts_card_number 会员卡号
      // cts_password 会员密码
      cts_card_number,
      cts_password,
      // type = uuid
      // uuid_register 必须传数值1，系统才会做UUID登录
      // customer_uuid 顾客的UUID，必须严格按此示例格式设定： 3df12256-0d29-475d-81b2-4b35ac3442e9
      uuid_register,
      customer_uuid
    }
  ) {
    switch (type) {
      case "phone":
        return http.request.post(`/customer/login/`, {
          phone,
          password,
          security_code
        });
      case "wechat":
        return http.request.post(`/customer/login/`, {
          hotel_id: hotel_id ? hotel_id : http.defaultParams.hotel_id,
          restaurant_id: restaurant_id
            ? restaurant_id
            : http.defaultParams.restaurant_id,
          wechat_official_login: wechat_official_login
            ? wechat_official_login
            : 1,
          wechat_mini_program_login: wechat_mini_program_login
            ? wechat_mini_program_login
            : 1,
          auto_wechat_register: auto_wechat_register ? auto_wechat_register : 1,
          code
        });
      case "test":
        return http.request.post(`/customer/login/`, {
          cts_card_number,
          cts_password
        });
      case "uuid":
        return http.request.post(`/customer/login/`, {
          uuid_register: uuid_register ? uuid_register : 1,
          customer_uuid
        });
      default:
        break;
    }
  },
  point(customer_uuid, point_type) {
    return http.request.get(
      `/customer/point/?customer_uuid=${customer_uuid}&point_type=${point_type}`
    );
  },
  stats(stats = ["num_unread_order_messages", "num_pending_orders"]) {
    return http.request.get(`/customer/stats/?stats=${stats.toString()}`);
  },
  door_locks(door_password) {
    return http.request.get(
      `/customer/door_locks/?door_password=${door_password}`
    );
  },
  get_profile() {
    return http.request.get(`/customer/get_profile/`);
  }
};
export default customer;
