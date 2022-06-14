const convertDate = (date) => {
  const newDate = new Date(date);
  if (!isValidDate(newDate)) return date;

  return new Intl.DateTimeFormat(["pt-br", "en-US"]).format(newDate);
};

const isValidDate = (date) => {
  return date instanceof Date && !isNaN(date);
};

export default { convertDate, isValidDate };
