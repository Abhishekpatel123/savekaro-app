export const getDate = (predate) => {
  let date = new Date(predate);
  let month = parseInt(date.getMonth()) + 1;
  return date.getDate() + "-" + month + "-" + date.getFullYear();
  //   let date = predate?.split(" ");
  //   return date[0] + "-" + date[1] + "-" + date[2] + "-" + date[3];
  //   return date[0] + "-" + date[1] + "-" + date[2] + "-" + date[3];
};
