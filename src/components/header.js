import { openFormSearch } from './formSearch.js';
import { openformAccount } from './formAccount.js';
import {
    closeDisplay,
    openDisplay,
    toggleDisplay,
} from '../library/display.js';
import { callMenu } from './listProduct.js';

let closeBtn = document.getElementById('close-btn');
let menuBarBackground = document.querySelector('.layout-dark');
let menuBtn = document.getElementById('menu-btn');
let menuList = document.querySelectorAll('.board__item');

//popup icon
let userIcon = document.getElementById('User-icon');
const searchIcon = document.querySelector('#header .search-icon');
let cartIcon = document.querySelector('#header .cart-icon');

//header button
const home = document.querySelector('#home');
const homeBtn = document.querySelector('.header__menu-mobile');
let menuInnerMobile = document.getElementsByClassName('board__item')[2];

//paths nav content of the page
// const main = document.querySelector('#main');
const productContainer = document.getElementById('product-container');
var homePage = document.getElementById('home-page');
var orderPage = document.getElementById('order-page');
const navPages = [homePage, productContainer, orderPage];
// console.log(typeof menuInner);
// dùng disappear thay vì --hide vì hide có !important
export const run = function (dataImgs) {
    if (menuInnerMobile) {
        menuInnerMobile.addEventListener('click', (e) => {
            let headerModal = document.querySelector('.header__modal');
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
    if (homeBtn) {
        homeBtn.addEventListener('click', function (e) {
            closeAllPage();
            openDisplay(homePage);
        });
    }
    //modal popup icon

    if (userIcon) {
        userIcon.addEventListener('click', () => {
            openformAccount(dataImgs);
        });
    }
    if (searchIcon) {
        searchIcon.addEventListener('click', (e) => {
            e.preventDefault();
            openFormSearch(dataImgs);
        });
    }
    if (cartIcon) {
        cartIcon.addEventListener('click', () => {
            closeAllPage();
            openDisplay(orderPage);
        });
    }
    menuProductList();
};
function closeAllPage() {
    navPages.forEach((page) => {
        closeDisplay(page);
    });
}
function menuProductList() {
    //header on click
    const headerBtn = document.querySelectorAll('.header-btn');
    const menuBtn = document.querySelectorAll('.menu-btn');

    headerBtn.forEach(function (element, index) {
        element.addEventListener('click', function () {
            callMenu(index + 1);
            closeAllPage();
            openDisplay(productContainer);
        });
    });

    menuBtn[0].addEventListener('click', function (e) {
        showProduct();
        renderProductInfo();
    });
    menuBtn.forEach(function (element, index) {
        element.addEventListener('click', function () {
            closeAllPage();
            if (index != 0) {
                openDisplay(productContainer);
                callMenu(index);
            }
        });
    });
}
