import http from "../http";
var qs = require("querystring");

const page = {
  get(id) {
    return http.get(`/page/${id}/`);
  },
  batch(ids) {
    return http.get(`page/batch/?page_id=${ids.join(",")}`);
  },
  // page_type: "info_list"
  search(lang_agnostic_id, page_type) {
    let params = {
      page_type,
      lang_agnostic_id
    };
    return http.get(`/page/search/?${qs.stringify(params)}`);
  },
  hotel() {
    return http.get(`/page/hotel/`);
  },
  butler_startpage() {
    return http.get(`/page/butler_startpage/`);
  },
  bulter_welcomePage() {
    return http.get(`/page/butler_welcomepage/`);
  },
  bulter_homepage: () => {
    return http.get(`/page/butler_homepage/`);
  },
  butler_tv_channels: () => {
    return http.get(`/page/butler_tv_channels/`);
  }
};
export default page;
