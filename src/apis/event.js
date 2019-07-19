import http from "../http";

const event = {
  get() {
    return http.get(`/event/`);
  },
  event_result: {
    get(id) {
      return http.get(`/event/${id}/event_result/`);
    },
    post(id, event_type) {
      return http.post(`/event/${id}/event_result/`, { event_type });
    }
  },
  event_result_address({ event_id, recipient_name, recipient_phone, address }) {
    return http.post(`/event/${event_id}/event_result_address/`, {
      recipient_name,
      recipient_phone,
      address
    });
  },
  claim_item({ airline_code, airline_card_number, redeem_code }) {
    return http.post(`/event/claim_item/`, {
      airline_code,
      airline_card_number,
      redeem_code
    });
  }
};
export default event;
