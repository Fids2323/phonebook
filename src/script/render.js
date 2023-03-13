import * as create from "./createElements.js";

const renderPhoneBook = (app, title) => {
  const header = create.createHeader();
  const logo = create.createLogo(title);
  const main = create.createMain();
  const footer = create.createFooter(title);
  const buttonGroup = create.createButtonsGroup([
    {
      className: "btn btn-primary mr-3",
      type: "button",
      text: "Добавить",
    },
    {
      className: "btn btn-danger",
      type: "button",
      text: "Удалить",
    },
  ]);

  const table = create.createTable();
  const { form, overlay } = create.createForm();

  header.headerContainer.append(logo);
  main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);

  app.append(header, main, footer);
  return {
    list: table.tbody,
    logo,
    btnAdd: buttonGroup.btns[0],
    btnDel: buttonGroup.btns[1],
    formOverlay: overlay,
    form,
  };
};

const renderContacts = (elem, data) => {
  const allRow = data.map(create.createRow);
  elem.append(...allRow);
  return allRow;
};

export { renderPhoneBook, renderContacts };
