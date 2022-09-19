const localDateTime = (iSOStringOrDate: string | Date) => {
  if (typeof iSOStringOrDate === "string") {
    const dateTime = new Date(iSOStringOrDate);
    return dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString();
  } else {
    return (
      iSOStringOrDate.toLocaleDateString() +
      " " +
      iSOStringOrDate.toLocaleTimeString()
    );
  }
};
export default localDateTime;
