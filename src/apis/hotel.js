import http from "../http";

const hotel = {
  guest_profile() {
    return http.request.get(`/hotel/guest_profile/`);
  }
};
export default hotel;
