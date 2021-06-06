import {Card} from '/Card.js';
import {FormValidator} from '/FormValidator.js'

const changeButton = document.querySelector('.profile__change-button');
const profilePopup = document.querySelector('#openPopup');
const profName = document.querySelector('.profile__name');
const profJob = document.querySelector('.profile__job');
const inputName = document.querySelector('.popup__input_profile_name');
const inputJob = document.querySelector('.popup__input_profile_job');
const placesTemplate = document.querySelector('#cards').content;
const places = document.querySelector('.places');
const placesButton = document.querySelector('.profile__add-button');
const newPopupOpen = document.querySelector('#openNewPopup');
const img = document.querySelector('.popup__input_places_img');
const placeName = document.querySelector('.popup__input_places_name');
export const popupBigImg = document.querySelector('#big-img');
export const bigImg = document.querySelector('.popup__image');
export const bigImgInfo = document.querySelector('.popup__info');
const profileSubmitForm = document.querySelector('#profilePopup');
const placesSubmitForm = document.querySelector('#placesPopup');
const placesSubmitBtn = document.querySelector(`#btn-submit-places`)
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const profileValidator = new FormValidator(config, profileSubmitForm);
profileValidator.enableValidation();
const cardsValidator = new FormValidator(config, placesSubmitForm);
cardsValidator.enableValidation();

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function (cards) {
  const cardElement = createCard(cards.name, cards.link)
  places.append(cardElement);
})

function createCard(name, link) {
  const card = new Card(name, link, '#cards');
  const cardElement = card.newCard();
  return cardElement;
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  places.prepend(createCard(placeName.value, img.value));
  closePopup(newPopupOpen);
  placesSubmitBtn.disabled = true;
}

export function openPopup(popup) {
  popup.classList.add('popup_open');
  document.addEventListener('keydown', closePopupEsc)
}

function closePopup(popup) {
  popup.classList.remove('popup_open');
  document.removeEventListener('keydown', closePopupEsc)
}


function handleProfileFormSubmit(event) {
  event.preventDefault();
  profName.textContent = inputName.value;
  profJob.textContent = inputJob.value;
  closePopup(profilePopup);
};




changeButton.addEventListener('click', () => {
  inputJob.value = profJob.textContent;
  inputName.value = profName.textContent;
  openPopup(profilePopup);
});

function closePopupEsc(evt) {
  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_open');
    closePopup(popupIsOpened);
  }
}

placesSubmitForm.addEventListener('submit', handleCardFormSubmit);

profileSubmitForm.addEventListener('submit', handleProfileFormSubmit);

placesButton.addEventListener('click', function () { 
  placesSubmitForm.reset();
  openPopup(newPopupOpen) });


const popups = document.querySelectorAll('.popup')

popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('popup_open')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__button-close')) {
          closePopup(popup)
        }
    })
})
