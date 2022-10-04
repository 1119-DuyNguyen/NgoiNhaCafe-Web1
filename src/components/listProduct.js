const listItem = document.querySelectorAll('.left-list .list-item');
const listLv2 = document.querySelectorAll('.list-lv2');

const mobileMenuAll = document.querySelector('.mobile-top');

if (listItem && listLv2) {
    listItem.forEach(function (item) {
        item.onclick = (e) => {
            var listLv2 = item.querySelector('.list-lv2');
            item.classList.add('active');
            listLv2.classList.add('active');
        };
    });
}

if (mobileMenuAll) {
    var menuMobileOn = false;
    mobileMenuAll.onclick = function (e) {
        if (menuMobileOn === false) {
            menuMobileOn = true;
            listItem.forEach(function (item) {
                item.classList.add('mobile-menu-on');
                item.classList.remove('active');
                item.onclick = function (e) {
                    menuMobileOn = false;
                    listItem.forEach(function (item1) {
                        item1.classList.remove('mobile-menu-on');
                    });
                };
            });
        } else {
            menuMobileOn = false;
            listItem.forEach(function (item) {
                item.classList.remove('mobile-menu-on');
                item.classList.remove('active');
            });
        }
    };
}
