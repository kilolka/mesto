import {bigImg, bigImgInfo, popupBigImg, openPopup} from './script.js'
export class Card {
    constructor(name, link, templateSelector) {
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
    }

    _getTemplate() {
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.places__cards')
        .cloneNode(true);

        return cardElement;
    }

    _like(e) {
        e.target.classList.toggle('places__like_turn_on')
    }

    _del(e) {
        e.target.closest('.places__cards').remove()
    }

    _popupBigImg() {
        openPopup(popupBigImg);
        bigImg.src = this._link;
        bigImg.alt = this._name;
        bigImgInfo.textContent = this._name;
    }

    _setEventListeners() {
        this._card.querySelector('.places__like').addEventListener('click', (e) => {
            this._like(e);
        });
        this._card.querySelector('.places__delete-button').addEventListener('click', (e) => {
            this._del(e);
        });
        this._card.querySelector('.places__image').addEventListener('click', () => {
            this._popupBigImg();
        });
    }

    newCard() {
        this._card = this._getTemplate();
        this._cardImg = this._card.querySelector('.places__image');
        this._setEventListeners();

        this._cardImg.src = this._link;
        this._cardImg.alt = this._name;
        this._card.querySelector('.places__name').textContent = this._name;

        return this._card;
    }
}