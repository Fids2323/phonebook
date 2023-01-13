import {
  modalControl,
  deleteControl,
  formControl,
  hoverRow,
} from './modules/control.js';
import * as render from './modules/render.js';
import {
  getStorage,
  sortStorage,
} from './modules/serviceStorage.js';

{
  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel} = render.renderPhoneBook(app, title);
    const allRow = render.renderContacts(list, getStorage('data'));
    const {closeModal} = modalControl(btnAdd, formOverlay);
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
    sortStorage(list, allRow);
  };
  window.phoneBookInit = init;
}

