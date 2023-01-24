const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getDate = (predate) => {
  let date = new Date(predate);
  let month = parseInt(date.getMonth()) + 1;
  return date.getDate() + " " + months[month - 1] + " " + date.getFullYear() + " " + "00:00PM";
  //   let date = predate?.split(" ");
  //   return date[0] + "-" + date[1] + "-" + date[2] + "-" + date[3];
  //   return date[0] + "-" + date[1] + "-" + date[2] + "-" + date[3];
};
