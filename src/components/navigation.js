import * as display from '../library/display.js';
//header button
const header = document.querySelector('#header');
const home = document.querySelector('#home');
const homeBtn = document.querySelector('.header__menu-mobile');

//paths of the page
const main = document.querySelector('#main');
const slider = document.querySelector('#slider');
const homeProduct = document.querySelector('#home-product');
const productContainer = document.querySelector('#product-container');

export function run() {
    homeBtn.addEventListener('click', function (e) {
        display.openDisplay(home);
        display.openDisplay(homeProduct);
        display.closeDisplay(productContainer);
    });
    console.log(homeBtn);
}
