// const baseURL = "https://coupon-solicits-1.herokuapp.com";
// const baseURL = "https://coupon-backend-12.herokuapp.com";
// USE IP ADDRESS FORM YOUR NETWORK TAB IN LAPTOP
export const BACKEND_URL = "http://192.168.178.180:5000/api/v1";

const accessToken = "54f2785ab5306a340f186cf23cd00556";
const config = {
  login_url: BACKEND_URL + "/user/login",
  register_url: BACKEND_URL + "/user/register",
  changePassword_url: BACKEND_URL + "/user/change_password",
  forgotPassword_url: BACKEND_URL + "/user/forgotPassword",
  hotel_url: BACKEND_URL + "/user/hotels",
  advert_url: BACKEND_URL + "/user/advert",
  advert_suggestion_url: BACKEND_URL + "/user/advert/suggestion",
  updateProfile_url: BACKEND_URL + "/user/me",
  support_url: BACKEND_URL + "/user/support",
  locationApi_url: `http://api.positionstack.com/v1/reverse?access_key=${accessToken}&query=`,
  sanityProjectId: "tbbd5ztw",
};

export default config;
