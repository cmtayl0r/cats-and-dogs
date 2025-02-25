const getTimeInTimezone = (timezoneOffset) => {
  const utcTime = new Date();
  const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);

  return localTime.toLocaleString("en-GB", {
    timeZone: "UTC",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    // second: "2-digit",
  });
};

export default getTimeInTimezone;
