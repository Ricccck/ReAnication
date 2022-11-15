
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

const utilService = {
  sortBytimestamp,
  formatTimestamp,
}

export default utilService