import http from "../http";

const customer_address = {
  get() {
    return http.request.get("/customer_address/");
  }
};
export default customer_address;
