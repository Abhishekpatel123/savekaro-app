export const socialLinks = ({ googleMapsURL, facebookURL, phone }) => {
  return [
    {
      icon: "https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png",
      name: "md-logo-facebook",
      link: facebookURL || "https://google.com",
      color: "#4272B8",
    },
    {
      icon: "https://cdn.vox-cdn.com/thumbor/pOMbzDvdEWS8NIeUuhxp23wi_cU=/1400x1400/filters:format(png)/cdn.vox-cdn.com/uploads/chorus_asset/file/19700731/googlemaps.png",
      name: "globe",
      link: googleMapsURL || "https://google.com",
      color: "#1B48A5",
    },
    {
      icon: "https://i.pinimg.com/originals/73/59/a8/7359a8e49a6fadcc653bd947f91df724.jpg",
      name: "location",
      link: googleMapsURL || "https://google.com",
      color: "#AA1818",
    },
    {
      icon: "https://i.pinimg.com/originals/73/59/a8/7359a8e49a6fadcc653bd947f91df724.jpg",
      name: "call",
      link: phone,
      color: "#0FA519",
    },
  ];
};
