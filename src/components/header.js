let closeBtn = document.getElementById('close-btn');
let menuBarBackground = document.querySelector('.layout-dark');
let menuBtn = document.getElementById('menu-btn');
let menuList = document.querySelectorAll('.board__item');
//
let userIcon = document.getElementById('User-icon');
let crossBtnPC = document.getElementById('cross-btn');
console.log(userIcon);
console.log(crossBtnPC);

export const run = function () {
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
            let formChange = document.querySelector('.form-change-dir');
            if (formChange.classList.contains('--disappear'))
                formChange.classList.remove('--disappear');
            else formChange.classList.add('--disappear');
        });
    }

    if (crossBtnPC) {
        crossBtnPC.addEventListener('click', () => {
            console.log(123);
            let formChange = document.querySelector('.form-change-dir');
            if (formChange.classList.contains('--disappear'))
                formChange.classList.remove('--disappear');
            else formChange.classList.add('--disappear');
        });
    }
};
