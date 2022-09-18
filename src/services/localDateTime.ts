const localDateTime = (iSOString: string) => {
  const dateTime = new Date(iSOString);
  return dateTime.toLocaleDateString() + " " + dateTime.toLocaleTimeString();
};
export default localDateTime;
