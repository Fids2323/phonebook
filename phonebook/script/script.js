
'use strict';

{
  const getStorage = (key) => {
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    } else {
      return [];
    }
  };


  const setStorage = (key, obj) => {
    const data = getStorage(key);
    const isSome = data.some((item) => item.phone === obj.phone);
    !isSome && data.push(obj);
    localStorage.setItem(key, JSON.stringify(data));
  };

  const removeStorage = (phone) => {
    const data = getStorage('data');
    for (let i = 0; i < data.length; i++) {
      if (data[i].phone === phone) {
        data.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('data', JSON.stringify(data));
  };

  const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
  };
  const createHeader = () => {
    const header = document.createElement('header');
    header.classList.add('header');

    const headerContainer = createContainer();
    header.append(headerContainer);

    header.headerContainer = headerContainer;
    return header;
  };
  const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;

    return h1;
  };

  const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;

    return main;
  };

  const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
      const button = document.createElement('button');
      button.type = type;
      button.textContent = text;
      button.className = className;
      return button;
    });

    btnWrapper.append(...btns);

    return {
      btnWrapper,
      btns,
    };
  };

  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');
    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
		<tr>
			<th class ="delete">Удалить</th>
			<th>Имя</th>
			<th>Фамилия</th>
			<th>Телефон</th>
			<th></th>
		</tr>
		`);

    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
  };

  const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');
    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
			<button class ="close" type = "button"></button>
			<h2 class ="form-title">Добавить контакт</h2>
			<div class ="form-group">
				<label class= "form-label" for="name">Имя:</label>
				<input class ="form-input" name="name" 
				id="name" type ="text" required>
			</div>
			<div class ="form-group">
				<label class= "form-label" for="surname">Фамилия:</label>
				<input class ="form-input" name="surname" 
				id="surname" type ="text" required>
			</div>
			<div class ="form-group">
				<label class= "form-label" for="phone">Телефон:</label>
				<input class ="form-input" name="phone" 
				id="phone" type ="phone" required>
			</div>
		`);
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'submit',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'reset',
        text: 'Отмена',
      },
    ]);
    form.append(...buttonGroup.btns);
    overlay.append(form);

    return {
      overlay,
      form,
    };
  };

  const createFooter = (user) => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const footerInfo = document.createElement('div');
    footerInfo.textContent = `Все права защищены ©${user}`;
    const footerContainer = createContainer();
    footerContainer.append(footerInfo);
    footer.append(footerContainer);


    footer.footerContainer = footerContainer;
    return footer;
  };

  const renderPhoneBook = (app, title) => {
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const footer = createFooter(title);
    const buttonGroup = createButtonsGroup([
      {
        className: 'btn btn-primary mr-3',
        type: 'button',
        text: 'Добавить',
      },
      {
        className: 'btn btn-danger',
        type: 'button',
        text: 'Удалить',
      },
    ]);

    const table = createTable();
    const {form, overlay} = createForm();

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

  const createRow = ({name: firstName, surname, phone}) => {
    const tr = document.createElement('tr');
    tr.classList.add('contact');
    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);
    const tdName = document.createElement('td');
    tdName.textContent = firstName;
    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);
    const tdEdit = document.createElement('td');
    const btnEdit = document.createElement('button');
    btnEdit.className = ('btn btn-primary');
    btnEdit.textContent = 'Редактировать';
    tdEdit.append(btnEdit);


    tr.append(tdDel, tdName, tdSurname, tdPhone, tdEdit);
    return tr;
  };

  const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.append(...allRow);
    return allRow;
  };

  const hoverRow = (allRow, logo) => {
    const text = logo.textContent;
    allRow.forEach(contact => {
      contact.addEventListener('mouseenter', () => {
        logo.textContent = contact.phoneLink;
      });
      contact.addEventListener('mouseleave', () => {
        logo.textContent = text;
      });
    });
  };

  const modalControl = (btnAdd, formOverlay) => {
    const openModal = () => {
      const allBtnsDel = document.querySelectorAll('.delete');
      allBtnsDel.forEach((item) => item.classList.remove('is-visible'));
      formOverlay.classList.add('is-visible');
    };
    const closeModal = () => {
      formOverlay.classList.remove('is-visible');
    };

    btnAdd.addEventListener('click', openModal);

    formOverlay.addEventListener('click', (e) => {
      const target = e.target;
      if (target === formOverlay || target.closest('.close')) {
        closeModal();
      }
    });
    return {
      closeModal,
    };
  };

  const deleteControl = (btnDel, list) => {
    btnDel.addEventListener('click', () => {
      document.querySelectorAll('.delete').forEach(del => {
        del.classList.toggle('is-visible');
      });
    });
    list.addEventListener('click', e => {
      if (e.target.closest('.del-icon')) {
        const contact = e.target.closest('.contact');
        const phone = contact.querySelectorAll('td')[3].textContent;
        e.target.closest('.contact').remove();
        removeStorage(phone);
      }
    });
  };

  const addContactPage = (contact, list) => {
    list.append(createRow(contact));
  };

  const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newContact = Object.fromEntries(formData);
      setStorage('data', newContact);
      addContactPage(newContact, list);
      form.reset();
      closeModal();
    });
  };

  const sortData = (data, sortField, sortOrder) => data.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);

    const {list,
      logo,
      btnAdd,
      formOverlay,
      form,
      btnDel} = renderPhoneBook(app, title);

    // Функционал
    let allRow = renderContacts(list, getStorage('data'));
    const {closeModal} = modalControl(btnAdd, formOverlay);
    hoverRow(allRow, logo);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);

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
  window.phoneBookInit = init;
}


//
