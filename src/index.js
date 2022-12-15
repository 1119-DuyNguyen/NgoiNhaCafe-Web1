import { Data } from './database/data.js';
import * as slider from './components/slider.js';
import * as navigation from './components/navigation.js';
import * as homeProduct from './components/homeProduct.js';

var data = new Data();
data.initData();
//order.init(data.getDataImgs());
navigation.run(data.getDataImgs());
slider.onLoad();
homeProduct.run(data.getDataImgs());

//darkMode

const darkModeElements = document.querySelectorAll('.--darkMode');
const darkModeBtn = document.getElementById('darkMode-btn');

darkModeBtn.addEventListener('click', () => {
    Data.prototype.toggleDarkMode();
    darkModeElements.forEach((element) => {
        element.classList.toggle('--darkMode');
    });
});

// để mặc định là dark => gọi để chuyển light mode
switch (Data.prototype.theme) {
    case '': {
        darkModeBtn.click();
        break;
    }
    case 'dark': {
        darkModeElements.forEach((element) => {
            if (!element.classList.contains('--darkMode'))
                element.classList.add('--darkMode');
        });
        break;
    }
    case 'light': {
        darkModeElements.forEach((element) => {
            if (element.classList.contains('--darkMode'))
                element.classList.remove('--darkMode');
        });
    }
    default: {
    }
}

// console.log(darkModeElements);
