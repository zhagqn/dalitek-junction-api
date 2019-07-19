import http from "../http";

const util = {
  now() {
    return http.get(`/util/now/`);
  },
  qr_code(code) {
    return `/util/qr_code/?code=${code}`;
  }
};
export default util;
