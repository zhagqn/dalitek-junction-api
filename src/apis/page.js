import http from "../http";
var qs = require("querystring");

const page = {
  get(id) {
    return http.request.get(`/page/${id}/`);
  },
  batch(ids) {
    return http.request.get(`page/batch/?page_id=${ids.join(",")}`);
  },
  // page_type: "info_list" "info_page"
  search(lang_agnostic_id, page_type) {
    let params = {
      page_type,
      lang_agnostic_id
    };
    return http.request.get(`/page/search/?${qs.stringify(params)}`);
  },
  hotel() {
    return http.request.get(`/page/hotel/`);
  },
  butler_startpage() {
    return http.request.get(`/page/butler_startpage/`);
  },
  bulter_welcomepage() {
    return http.request.get(`/page/butler_welcomepage/`);
  },
  bulter_homepage: () => {
    return http.request.get(`/page/butler_homepage/`);
  },
  butler_tv_channels: () => {
    return http.request.get(`/page/butler_tv_channels/`);
  }
};
export default page;
