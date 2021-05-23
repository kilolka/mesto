const changeButton = document.querySelector('.profile__change-button');
const profilePopup = document.querySelector('#openPopup');
const profilePopupClose = document.querySelector('#closePopup');
const saveButtonProfile = document.querySelector('.popup__button-save');
const addButton = document.querySelector('.profile__add-button');
const profName = document.querySelector('.profile__name');
const profJob = document.querySelector('.profile__job');
const inputName = document.querySelector('.popup__input_profile_name');
const inputJob = document.querySelector('.popup__input_profile_job');
const likeButton = document.querySelector('.places__like');
const placesTemplate = document.querySelector('#cards').content;
const places = document.querySelector('.places');
const placesButton = document.querySelector('.profile__add-button');
const newPopupOpen = document.querySelector('#openNewPopup');
const newPopupClose = document.querySelector('#closeNewPopup');
const buttonPlacesSave = document.querySelector('#popupImage');
const img = document.querySelector('.popup__input_places_img');
const placeName = document.querySelector('.popup__input_places_name');
const imgClose = document.querySelector('#closeImg');
const popupBigImg = document.querySelector('#big-img');
const bigImg = document.querySelector('.popup__image');
const bigImgInfo = document.querySelector('.popup__info');
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

enableValidation(config);

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
// лайк
function like(e) {
  e.target.classList.toggle('places__like_turn_on')
}

function del(e) {
  e.target.closest('.places__cards').remove()
};

initialCards.forEach(function (cards) {
  places.prepend(newCard(cards));
})

function newCard(cards) {
  const cardContent = placesTemplate.querySelector('.places__cards').cloneNode(true);
  cardContent.querySelector('.places__image').src = cards.link;
  cardContent.querySelector('.places__name').textContent = cards.name;
  cardContent.querySelector('.places__image').alt = cards.name;
  cardContent.querySelector('.places__like').addEventListener('click', like);
  cardContent.querySelector('.places__delete-button').addEventListener('click', del);
  cardContent.querySelector('.places__image').addEventListener('click', function () {
    bigImg.src = cards.link;
    bigImg.alt = cards.name;
    bigImgInfo.textContent = cards.name;
    openPopup(popupBigImg);
  });
  return cardContent;
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const cardNew = {
    name: placeName.value,
    link: img.value
  }
  placeName.value = "";
  img.value = "";
  closePopup(newPopupOpen);
  places.prepend(newCard(cardNew));
  placesSubmitBtn.disabled = true;
}


// profilePopup.addEventListener('click', event => {
//   if (event.target === event.currentTarget) {
//     closePopup(profilePopup);
//   }
// });

// openNewPopup.addEventListener('click', event => {
//   if (event.target === event.currentTarget) {
//     closePopup(newPopupOpen);
//   }
// })

// popupBigImg.addEventListener('click', event => {
//   if (event.target === event.currentTarget) {
//     closePopup(popupBigImg);
//   }
// })

function openPopup(popup) {
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

//Очень спасибо, что помогли разобраться с Esc))
//В вот порешать вопрос с крестиком - пришлось по потеть)))


// imgClose.addEventListener('click', function () { closePopup(popupBigImg) });

placesSubmitForm.addEventListener('submit', handleCardFormSubmit);

// newPopupClose.addEventListener('click', function () { closePopup(newPopupOpen) });

// profilePopupClose.addEventListener('click', function () { closePopup(profilePopup) });

profileSubmitForm.addEventListener('submit', handleProfileFormSubmit);

placesButton.addEventListener('click', function () { openPopup(newPopupOpen) });


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