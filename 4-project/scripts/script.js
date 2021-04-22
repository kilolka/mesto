const changeButton = document.querySelector('.profile__change-button');
const openPopup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__button-close');
const saveButton = document.querySelector('.popup__content');
const addButton = document.querySelector('.profile__add-button');
const likeButton = document.querySelectorAll('.places__like');
let profName = document.querySelector('.profile__name');
let profJob = document.querySelector('.profile__job');
let inputName = document.querySelector('.popup__input-name');
let inputJob = document.querySelector('.popup__input-job');

function popupToggle() {
    openPopup.classList.toggle('popup__open');
};

changeButton.addEventListener('click', popupToggle);

closePopup.addEventListener('click', popupToggle);

saveButton.addEventListener('submit', saveChanges);

openPopup.addEventListener('click', function(event) {
    if (event.target === event.currentTarget) {
        popupToggle(event);
    }
});

function saveChanges (event) {
    event.preventDefault();
    profName.textContent = inputName.value;
    profJob.textContent = inputJob.value;
    popupToggle();
};

for (let i = 0; i < likeButton.length; i += 1) {
    likeButton[i].addEventListener('click', function () {
        if (likeButton[i].classList.contains('places__like_turn_off') === true) {
            likeButton[i].classList.add('places__like_turn_on');
            likeButton[i].classList.remove('places__like_turn_off');
        } else {
            likeButton[i].classList.add('places__like_turn_off');
            likeButton[i].classList.remove('places__like_turn_on');
        }
    })
    };