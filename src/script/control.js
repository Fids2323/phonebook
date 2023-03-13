import { createRow } from "./createElements.js";
import { setStorage, removeStorage } from "./serviceStorage.js";

const modalControl = (btnAdd, formOverlay) => {
  const openModal = () => {
    const allBtnsDel = document.querySelectorAll(".delete");
    allBtnsDel.forEach((item) => item.classList.remove("is-visible"));
    formOverlay.classList.add("is-visible");
  };
  const closeModal = () => {
    formOverlay.classList.remove("is-visible");
  };

  btnAdd.addEventListener("click", openModal);

  formOverlay.addEventListener("click", (e) => {
    const target = e.target;
    if (target === formOverlay || target.closest(".close")) {
      closeModal();
    }
  });
  return {
    closeModal,
  };
};

const deleteControl = (btnDel, list) => {
  btnDel.addEventListener("click", () => {
    document.querySelectorAll(".delete").forEach((del) => {
      del.classList.toggle("is-visible");
    });
  });
  list.addEventListener("click", (e) => {
    if (e.target.closest(".del-icon")) {
      const contact = e.target.closest(".contact");
      const phone = contact.querySelectorAll("td")[3].textContent;
      e.target.closest(".contact").remove();
      removeStorage("data", phone);
    }
  });
};

const addContactPage = (contact, list) => {
  list.append(createRow(contact));
};

const formControl = (form, list, closeModal) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newContact = Object.fromEntries(formData);
    setStorage("data", newContact);
    addContactPage(newContact, list);
    form.reset();
    closeModal();
  });
};

const hoverRow = (allRow, logo) => {
  const text = logo.textContent;
  allRow.forEach((contact) => {
    contact.addEventListener("mouseenter", () => {
      logo.textContent = contact.phoneLink;
    });
    contact.addEventListener("mouseleave", () => {
      logo.textContent = text;
    });
  });
};

export { modalControl, deleteControl, addContactPage, formControl, hoverRow };
