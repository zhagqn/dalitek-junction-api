import http from "../http";

const hotel = {
  guest_profile() {
    return http.request.get(`/hotel/guest_profile/`);
  },
  access_token(door_password, token_type = "room_control") {
    return http.request.get(
      `/hotel/guest_profile/?token_type=${token_type}&door_password=${door_password}`
    );
  }
};
export default hotel;
