import http from "../http";

const image = {
  get() {
    return http.get(`/image/`);
  }
};
export default image;
