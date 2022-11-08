import { openFormSearch } from './formSearch.js';
import { openformAccount } from './formAccount.js';
let closeBtn = document.getElementById('close-btn');
let menuBarBackground = document.querySelector('.layout-dark');
let menuBtn = document.getElementById('menu-btn');
let menuList = document.querySelectorAll('.board__item');
//
let userIcon = document.getElementById('User-icon');
let crossBtnPC = document.getElementById('cross-btn');
const searchIcon = document.querySelector('#header .search-icon');
let menuInner = document.getElementsByClassName('board__item')[2];
// console.log(typeof menuInner);
export const run = function (dataImgs) {
    if (menuInner) {
        menuInner.addEventListener('click', (e) => {
            let headerModal = document.querySelector('.header__modal');
            console.log(headerModal);
            if (headerModal.classList.contains('--disappear'))
                headerModal.classList.remove('--disappear');
            else {
                headerModal.classList.add('--disappear');
            }
        });
    }
    //close-btn
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            let menuBar = document.querySelector('.menu__board');
            if (menuBar.classList.contains('--disappear'))
                menuBar.classList.remove('--disappear');
            else menuBar.classList.add('--disappear');
        });
    }

    //console.log(closeBtn);
    //menu bar background
    if (menuBarBackground) {
        menuBarBackground.addEventListener('click', (e) => {
            let menuBar = document.querySelector('.menu__board');
            if (!menuBar.classList.contains('--disappear'))
                menuBar.classList.add('--disappear');
        });
    }
    // console.log(menuBarBackground);

    //menu-btn
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            let menuBar = document.querySelector('.menu__board');
            if (menuBar.classList.contains('--disappear'))
                menuBar.classList.remove('--disappear');
            else menuBar.classList.add('--disappear');
        });
    }
    //menuList
    if (menuList) {
        menuList.forEach((btn, i) => {
            let subMenu = btn.querySelector('.board__item-inside');
            if (subMenu) {
                btn.addEventListener('click', () => {
                    //console.log('hear');
                    if (subMenu.classList.contains('--disappear'))
                        subMenu.classList.remove('--disappear');
                    else subMenu.classList.add('--disappear');
                });
            }
        });
    }

    //form-change-dir

    if (userIcon) {
        userIcon.addEventListener('click', () => {
            openformAccount(dataImgs);
        });
    }

    if (crossBtnPC) {
        crossBtnPC.addEventListener('click', () => {
            let formChange = document.querySelector('.form-change-dir');
            if (formChange.classList.contains('--disappear'))
                formChange.classList.remove('--disappear');
            else {
                formChange.classList.add('--disappear');
            }
        });
    }
    if (searchIcon) {
        searchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            openFormSearch(dataImgs);
        });
    }
};
