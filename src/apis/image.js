import http from "../http";

const image = {
  get() {
    return http.request.get(`/image/`);
  }
};
export default image;
