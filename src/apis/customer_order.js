import http from "../http";

const customer_order = {
  get(id) {
    if (id) return http.request.post(`/customer_order/${id}/`);
    else return http.request.post(`/customer_order/`);
  },
  pay(orderId, type) {
    return http.request.post(`/customer_order/${orderId}/pay/?pay_method=${type}`);
  },
  is_paid(orderId) {
    return http.request.get(`/customer_order/${orderId}/is_paid/`);
  },
  mark_paid(orderId, payment, money) {
    return http.request.post(
      `/customer_order/${orderId}/mark_paid/?${payment}=${money}`
    );
  }
};
export default customer_order;
