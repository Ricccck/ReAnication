//for Message.js
const sortBytimestamp = (arr) => {
  return arr.sort(
    (prev, next) =>
      parseInt(prev.__createdtime__) - parseInt(next.__createdtime__)
  );
};

const formatTimestamp = (timestamp) => {
  timestamp = JSON.parse(timestamp);
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const gender = (value) => {
  if (typeof value === "number") {
    if (value === 1) return "Male";
    if (value === 2) return "Female";
    if (value === 3) return "";
  }
};

const utilService = {
  sortBytimestamp,
  formatTimestamp,
  gender,
};

export default utilService;
