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

const getCurrentSeason = () => {
  const date = new Date();

  const year = date.getFullYear()
  const month = date.getMonth()

  if(month < 4) {
    return `${year}-winter`
  } else if(month < 7) {
    return `${year}-spring`
  } else if(month < 10) {
    return `${year}-summer`
  } else {
    return `${year}-autumn`
  }
}

const utilService = {
  sortBytimestamp,
  formatTimestamp,
  gender,
  getCurrentSeason
};

export default utilService;
