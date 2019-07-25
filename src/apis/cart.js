import http from "../http";

const cart = {
  get() {
    return http.request.get(`/cart/`);
  },
  size() {
    return http.get(`/cart/size/`);
  },
  post({
    lang_agnostic_id,
    quantity = 1,
    select = 1,
    variants = [],
    note = ""
  }) {
    return http.post(`/cart/`, {
      lang_agnostic_id,
      quantity,
      select,
      variants,
      note
    });
  },
  update({ cart_id, quantity, note, selected }) {
    let options = { quantity };
    if (note) options.note = note;
    if (selected) options.selected = selected;
    return http.put(`cart/${cart_id}/`, options);
  },
  delete(id) {
    return http.delete(`cart/${id}/`);
  },
  place_order({
    expected_delivery_time = 0,
    note = "",
    recipient_name,
    recipient_phone,
    address
  }) {
    return http.post(`/cart/place_order/`, {
      expected_delivery_time,
      note,
      recipient_name,
      recipient_phone,
      address
    });
  },
  request_service(lang_agnostic_id, expected_delivery_time = 0) {
    return http.post(`/cart/request_service/`, {
      quantity: 1,
      lang_agnostic_id,
      expected_delivery_time,
      variants: [],
      note: ""
    });
  },
  single_merchandise_order({
    lang_agnostic_id,
    quantity = 1,
    select = 1,
    variants = [],
    note = ""
  }) {
    return http.post(`/cart/single_merchandise_order/`, {
      lang_agnostic_id,
      quantity,
      select,
      variants,
      note
    });
  }
};
export default cart;
