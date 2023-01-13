const sortData = (data, sortField, sortOrder) => data.sort((a, b) => {
  if (sortOrder === 'asc') {
    return a[sortField] > b[sortField] ? 1 : -1;
  } else {
    return a[sortField] < b[sortField] ? 1 : -1;
  }
});

export default sortData;
