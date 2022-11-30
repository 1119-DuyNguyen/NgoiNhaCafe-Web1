import { Data } from './database/data.js';
import * as slider from './components/slider.js';
import * as header from './components/header.js';
import * as listProduct from './components/listProduct.js';
import * as homeProduct from './components/homeProduct.js';
import { openOrderHistory } from './components/orderHistory.js';
//------------dành cho trang user

//---- comment dòng display sẽ hiện trang để làm việc
//display.closeDisplay(document.getElementById('user-page'));
var data = new Data();
data.initData();
//order.init(data.getDataImgs());
header.run(data.getDataImgs());
slider.onLoad();
homeProduct.run(data.getDataImgs());

//-----------dành cho trang admin
//display.closeDisplay(document.getElementById('admin-page'));

//darkMode
const darkModeElements = document.querySelectorAll('.--darkMode');
const darkModeBtns = document.getElementById('darkMode-btn');
darkModeBtns.addEventListener('click', () => {
    darkModeElements.forEach((element) => {
        element.classList.toggle('--darkMode');
    });
});
// console.log(darkModeElements);
