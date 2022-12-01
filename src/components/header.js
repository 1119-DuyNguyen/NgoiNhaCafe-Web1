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
    { isCurrent: 1, page: homePage },
    { isCurrent: 0, page: productContainer },
    { isCurrent: 0, page: orderPage },
    { isCurrent: 0, page: csbmtt },
    { isCurrent: 0, page: dksd },
    { isCurrent: 0, page: mainStore },
    { isCurrent: 0, page: aboutUs },
];
// console.log(typeof menuInner);
// dùng disappear thay vì --hide vì hide có !important
export const run = function (dataImgs) {
    headerNavigation(dataImgs);
    menuProductList();
    footerNavigation();
};
function headerNavigation(dataImgs) {
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
            openPage(homePage);

            window.scrollTo(0, 0);
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
            openPage(orderPage);
            openCartPage();
            window.scrollTo(0, 0);
        });
    }
    if (data.getCurrentUser()) {
        if (data.getCurrentUser().type === 'admin') {
            window.location.replace('admin/index.html');
        }
        closeDisplay(userIcon);
        openDisplay(logoutIcon);
        headerAcount.innerHTML =
            'Chào mừng ' + data.getCurrentUser().fullname + ' quay lại';
        headerMbAcount.innerHTML =
            'Chào mừng ' + data.getCurrentUser().fullname + ' quay lại';
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
}
/**
 *
 * nếu page chưa mở thì đóng page hiện tại mở page cần mở
 * page đã mở thì không làm gì
 * @param {element} page
 * @returns
 */
function openPage(page) {
    for (var i = 0; i < navPages.length; ++i) {
        // đã page đã mở thì sẽ không làm gì
        if (navPages[i].page === page && navPages[i].isCurrent === 1) {
            return;
        }
        // nếu page chưa mở

        // đóng cái page hiện tại đang mở
        if (navPages[i].isCurrent == 1) {
            navPages[i].isCurrent = 0;
            closeDisplay(navPages[i].page);
        }
        // mở page cần mở
        if (navPages[i].page === page) {
            navPages[i].isCurrent = 1;
            openDisplay(navPages[i].page);
        }
    }
}
function menuProductList() {
    //header on click
    const headerBtn = document.querySelectorAll('.header-btn');
    const menuBtn = document.querySelectorAll('.menu-btn');
    const aboutUsHeader = document.querySelector('.h-about-us-btn');

    headerBtn.forEach(function (element, index) {
        element.addEventListener('click', function () {
            callMenu(index + 1);
            openPage(productContainer);
            window.scrollTo(0, 0);
        });
    });

    menuBtn.forEach(function (element, index) {
        element.addEventListener('click', function () {
            openPage(productContainer);
            callMenu(index);
            window.scrollTo(0, 0);
        });
    });

    aboutUsHeader.addEventListener('click', function () {
        openPage(aboutUs);
        window.scrollTo(0, 0);
    });
}
//footer
function footerNavigation() {
    const dksdBtn = document.querySelector('.dksd-btn');
    const csbmttBtn = document.querySelector('.csbmtt-btn');
    const mainStoreBtn = document.querySelector('.main-store-btn');
    const aboutUsFooter = document.querySelector('.f-about-us-btn');
    const productFooterBtn = document.querySelector('.f-product-btn');

    dksdBtn.addEventListener('click', function () {
        openPage(dksd);

        window.scrollTo(0, 0);
    });

    csbmttBtn.addEventListener('click', function () {
        openPage(csbmtt);
        window.scrollTo(0, 0);
    });

    mainStoreBtn.addEventListener('click', function () {
        openPage(mainStore);

        window.scrollTo(0, 0);
    });

    aboutUsFooter.addEventListener('click', function () {
        openPage(aboutUs);

        window.scrollTo(0, 0);
    });

    productFooterBtn.addEventListener('click', function () {
        openPage(productContainer);

        callMenu(0);
        window.scrollTo(0, 0);
    });
}
