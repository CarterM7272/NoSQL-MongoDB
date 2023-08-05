module.exports = timestamp => {
  let dateObject = new Date(timestamp);
  let date = dateObject.getDate();
  let month = dateObject.getMonth() + 1; // JavaScript months are 0-indexed.
  let year = dateObject.getFullYear();

  // Ensure that the month and date strings are padded with zeros if necessary.
  month = month < 10 ? `0${month}` : month;
  date = date < 10 ? `0${date}` : date;

  return `${month}/${date}/${year}`;
};