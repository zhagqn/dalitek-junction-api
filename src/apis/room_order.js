import http from "../http";

const room_order = {
  get(id) {
    if (id) return http.request.post(`/room_order/${id}`);
    else return http.request.post(`/room_order/`);
  },
  pay(orderId, type) {
    return http.request.post(`/room_order/${orderId}/pay/?pay_method=${type}`);
  },
  is_paid(orderId) {
    return http.request.get(`/room_order/${orderId}/is_paid/`);
  },
  mark_paid(orderId, payment, money) {
    return http.request.post(`/room_order/${orderId}/mark_paid/?${payment}=${money}`);
  }
};
export default room_order;
