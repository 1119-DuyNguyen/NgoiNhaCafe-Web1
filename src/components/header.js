import { openFormSearch } from './formSearch.js';
import { openformAccount, logoutAccount } from './formAccount.js';
import { closeDisplay, openDisplay } from '../library/display.js';
import { callMenu } from './listProduct.js';
import { Data } from '../database/data.js';
import { openCartPage } from './order.js';

var data = new Data();

let closeBtn = document.getElementById('close-btn');
let menuBarBackground = document.querySelector('.layout-dark');
let menuBtn = document.getElementById('menu-btn');
let menuList = document.querySelectorAll('.board__item');

// icon
const userIcon = document.getElementById('User-icon');
const logoutIcon = document.getElementById('user-icon-logout');
const searchIcon = document.querySelector('#header-icon .search-icon');
const cartIcon = document.querySelector('#header-icon .cart-icon');

//header button
const home = document.querySelector('#home');
const homeBtn = document.querySelector('.header__menu-mobile');
// xử lý tên user đăng nhập đang xuất
let headerMbAcount = document.querySelector('.header-mb-acount');

let headerAcount = document.querySelector('.header-acount');

//footer
const dksd = document.querySelector('.dksd');
const csbmtt = document.querySelector('.csbmtt');
const mainStore = document.querySelector('.main-store');

//paths nav content of the page
// const main = document.querySelector('#main');
const productContainer = document.getElementById('product-container');
var homePage = document.getElementById('home-page');
var orderPage = document.getElementById('order-page');
const aboutUs = document.querySelector('#about-us');
const navPages = [
    homePage,
    productContainer,
    orderPage,
    csbmtt,
    dksd,
    mainStore,
    aboutUs,
];
// console.log(typeof menuInner);
// dùng disappear thay vì --hide vì hide có !important
export const run = function (dataImgs) {
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            let menuBar = document.querySelector('.menu__board');
            if (menuBar.classList.contains('--disappear'))
                menuBar.classList.remove('--disappear');
            else menuBar.classList.add('--disappear');
        });
    }

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
            let subMenu = btn.querySelector('.header__modal');
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
            openCartPage();
        });
    }
    if (data.getCurrentUser()) {
        closeDisplay(userIcon);
        openDisplay(logoutIcon);
        headerAcount.innerHTML =
            'Chào mừng ' + data.getCurrentUser().username + ' quay lại';
        headerMbAcount.innerHTML =
            'Chào mừng ' + data.getCurrentUser().username + ' quay lại';
    } else {
        closeDisplay(logoutIcon);
        openDisplay(userIcon);
        headerAcount.innerHTML = '';
        headerMbAcount.innerHTML = '';
    }
    if (userIcon) {
        userIcon.addEventListener('click', () => {
            openformAccount(dataImgs);
        });
    }
    if (logoutIcon) {
        logoutIcon.addEventListener('click', () => {
            if (confirm('Bạn có muốn đăng xuất')) {
                logoutAccount();
            }
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
    const aboutUsHeader = document.querySelector('.h-about-us-btn');

    headerBtn.forEach(function (element, index) {
        element.addEventListener('click', function () {
            callMenu(index + 1);
            closeAllPage();
            openDisplay(productContainer);
        });
    });

    menuBtn.forEach(function (element, index) {
        element.addEventListener('click', function () {
            closeAllPage();
            openDisplay(productContainer);
            callMenu(index);
        });
    });

    aboutUsHeader.addEventListener('click', function () {
        closeAllPage();
        openDisplay(aboutUs);
    });

    //footer
    function footerNavigation() {
        const dksdBtn = document.querySelector('.dksd-btn');
        const csbmttBtn = document.querySelector('.csbmtt-btn');
        const mainStoreBtn = document.querySelector('.main-store-btn');
        const aboutUsFooter = document.querySelector('.f-about-us-btn');

        dksdBtn.addEventListener('click', function () {
            closeAllPage();
            openDisplay(dksd);
        });

        csbmttBtn.addEventListener('click', function () {
            closeAllPage();
            openDisplay(csbmtt);
        });

        mainStoreBtn.addEventListener('click', function () {
            closeAllPage();
            openDisplay(mainStore);
        });

        aboutUsFooter.addEventListener('click', function () {
            closeAllPage();
            openDisplay(aboutUs);
        });
    }
    footerNavigation();
}
