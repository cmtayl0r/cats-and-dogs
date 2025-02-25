const dateOptions = {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
};
const getTodaysDate = new Date().toLocaleDateString("en-GB", dateOptions);

export default getTodaysDate;
