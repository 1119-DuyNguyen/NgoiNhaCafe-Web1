//alo sao?
let header = document.getElementById('header');
let closeBtn = document.getElementById('close-btn');
let menuBarBackground = document.querySelector('.layout-dark');
let menuBtn = document.getElementById('menu-btn');
let menuList = document.querySelectorAll('.board__item');
export const run = function () {
    //console.log('hi');
    //console.log(header);
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
};
