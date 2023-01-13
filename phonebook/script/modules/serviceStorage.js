import sortData from './utils.js';
import {renderContacts} from './render.js';

const getStorage = key => JSON.parse(localStorage.getItem(key)) || [];

const setStorage = (key, obj) => {
  const data = getStorage(key);
  data.push(obj);
  localStorage.setItem(key, JSON.stringify(data));
};

const removeStorage = (key, phone) => {
  let data = getStorage(key);
  data = data.filter(item => item.phone !== phone);
  localStorage.setItem(key, JSON.stringify(data));
};

const sortStorage = (list, allRow) => {
  const thead = document.querySelector('thead');
  const tbody = document.querySelector('tbody');
  const savedSortField = localStorage.getItem('sortField');
  const savedSortOrder = localStorage.getItem('sortOrder');
  if (savedSortField) {
    const sortedData = sortData(getStorage('data'), savedSortField, savedSortOrder);
    tbody.textContent = '';
    allRow = renderContacts(list, sortedData);
  }

  thead.addEventListener('click', e => {
    const target = e.target;
    let sortField = '';
    let sortOrder = 'asc';
    if (target.textContent === 'Имя') {
      sortField = 'name';
    } else if (target.textContent === 'Фамилия') {
      sortField = 'surname';
    }
    if (localStorage.getItem('sortField') === sortField) {
      sortOrder = localStorage.getItem('sortOrder') === 'asc' ? 'desc' : 'asc';
    }
    localStorage.setItem('sortField', sortField);
    localStorage.setItem('sortOrder', sortOrder);
    tbody.textContent = '';
    const sortedData = sortData(getStorage('data'), sortField, sortOrder);
    renderContacts(list, sortedData);
  });
};

export {
  getStorage,
  setStorage,
  removeStorage,
  sortStorage,
};
