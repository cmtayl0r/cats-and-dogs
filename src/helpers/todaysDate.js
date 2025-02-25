const dateOptions = {
  weekday: "short",
  day: "numeric",
  month: "short",
  year: "numeric",
};

const getTodaysDate = (timezoneOffsetInSeconds) => {
  const timezoneOffsetInHours = timezoneOffsetInSeconds / 3600;
  const timeZone = `Etc/GMT${timezoneOffsetInHours >= 0 ? "-" : "+"}${Math.abs(
    timezoneOffsetInHours
  )}`;

  return new Date().toLocaleDateString("en-GB", {
    ...dateOptions,
    timeZone: timeZone,
  });
};

export default getTodaysDate;
