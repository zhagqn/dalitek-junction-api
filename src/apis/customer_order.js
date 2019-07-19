import http from "../http";

const customer_order = {
  get(id) {
    if (id) return http.post(`/customer_order/${id}/`);
    else return http.post(`/customer_order/`);
  },
  pay(orderId, type) {
    return http.post(`/customer_order/${orderId}/pay/?pay_method=${type}`);
  },
  is_paid(orderId) {
    return http.get(`/customer_order/${orderId}/is_paid/`);
  },
  mark_paid(orderId, payment, money) {
    return http.post(
      `/customer_order/${orderId}/mark_paid/?${payment}=${money}`
    );
  }
};
export default customer_order;
