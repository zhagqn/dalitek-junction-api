import http from "../http";

const util = {
  now() {
    return http.request.get(`/util/now/`);
  },
  qr_code(code) {
    return http.request.get(`/util/qr_code/?code=${code}`);
  }
};
export default util;
