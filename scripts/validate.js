
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, config);
  }
  else {
    hideInputError(formElement, inputElement, config);
  }
}

const setEventListeners = (formElement, config) => {
  const { inputSelector, submitButtonSelector, ...resetConfig } = config
  formElement.addEventListener('submit', evt => {
    evt.preventDefault();
  });
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, resetConfig);
      toggleButtonState(buttonElement, inputList);
      console.log(buttonElement)
    })
  })
  toggleButtonState(buttonElement, inputList);
  console.log(buttonElement)
};

const enableValidation = ({ formSelector, ...resetConfig }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, resetConfig);
  })
};

const showInputError = (formElement, inputElement, config) => {
  const { inputErrorClass, errorClass } = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

const hideInputError = (formElement, inputElement, config) => {
  const { inputErrorClass, errorClass } = config;
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  console.log(errorClass, inputErrorClass)
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

const toggleButtonState = (buttonElement, inputList) => {
  if (!hasInvalidInput(inputList)) {
    buttonElement.disabled = false;
  }
  else {
    buttonElement.disabled = true;
  }
}

