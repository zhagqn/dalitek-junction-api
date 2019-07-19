import http from "../http";

const device = {
  get() {
    return http.get(`/device/get/?saveip=1`);
  },
  register(room, validation_code) {
    return http.post("/device/register/", {
      hotel_id: http.defaultParams.hotel_id,
      device_id: http.defaultParams.device_id,
      device_name: http.defaultParams.device_name,
      device_type: http.defaultParams.device_type,
      room,
      validation_code
    });
  }
};
export default device;
