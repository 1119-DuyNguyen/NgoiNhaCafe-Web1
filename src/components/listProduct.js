import { productInfo } from './productInfo.js';
export function run(dataImgs) {
    const parentTag = {
        Cafe: ['Cà Phê Việt Nam', 'Cà Phê Máy', 'Cold Brew'],
        Tra: ['Trà trái cây', 'Trà sữa Macchiato'],
        HiTea: ['Hi-Tea Trà', 'Hi-Tea Đá Tuyết', 'Hi-Tea Bling Bling'],
    };
    function switchTranslate(data) {
        switch (data) {
            case 'Tra':
                return 'Trà';
                break;
            case 'HiTea':
                return 'Hi-Tea';
                break;
            case 'Cafe':
                return 'Cà Phê';
                break;
        }
    }
    function switchTranslate2(data) {
        switch (data) {
            case 'Tra':
                return 'tra';
                break;
            case 'HiTea':
                return 'hitea';
                break;
            case 'Cafe':
                return 'cafe';
                break;
        }
    }
    const leftContainer = document.querySelector('.left-container');
    function list() {
        let html = '';
        let k = 0;
        for (let i in parentTag) {
            html += `<p class="left-item">${switchTranslate(i)}</p>
            <ul class="list-lv2">`;
            for (let j of parentTag[i]) {
                html += ` <li class="left-item item[${k}]">
                    <p>${j}</p>
            `;
                k++;
            }
            html += '</ul>';
        }
        leftContainer.innerHTML = html;
    }
    list();
    const leftItem = document.querySelectorAll('.left-item');
    const imageContainer = document.querySelector('.image-container-LP');

    //xử lý active

    if (leftItem) {
        leftItem.forEach(function (item) {
            if (screen.width > 849) {
                item.addEventListener('click', function (e) {
                    item.classList.add('active');
                    if (item.nextElementSibling) {
                        item.nextElementSibling.style = 'display:block;';
                    }
                });
            } else {
                item.addEventListener('click', function (e) {
                    item.classList.add('active');
                    if (item.nextElementSibling) {
                        item.nextElementSibling.style = 'display:none;';
                    }
                });
            }
        });
    }

    //render danh mục sản phẩm
    function rightTag(data) {
        for (let i in parentTag) {
            for (let key of parentTag[i]) {
                if (data == key) {
                    return switchTranslate2(i);
                }
            }
        }
        return false;
    }

    function showProduct() {
        let showProductHtml = '';
        let currentTag = '';
        let count = 0;
        for (let element of dataImgs) {
            const pTag = rightTag(element.tag);
            if (pTag) {
                if (!(currentTag === element.tag)) {
                    if (count > 0) showProductHtml += `</div>`;
                    currentTag = element.tag;
                    showProductHtml += `<div class="cf-container ${pTag}">
                    <t>${element.tag}</t>
                `;
                    ++count;
                }
                showProductHtml += `
            <div class="image-item" id="${element.id}">
                <div class="image-pack">
                    <img
                        class="product-image"
                        style="margin-bottom: 15px"
                        src="${element.image}"
                        alt=""
                        />
                    <div class="buy-now">
                        <div class="text-buy">Mua ngay!</div>
                    </div>
                        <n>${element.title}</n>
                        <p style="margin-top: 15px">${element.price} đ</p>
                        <span class="icon-plus"></span>
                </div>
            </div>`;
            }
        }
        showProductHtml += '</div>';
        imageContainer.innerHTML = showProductHtml;
    }

    //render product info

    function renderProductInfo() {
        const productList = document.querySelectorAll('.image-item');

        productList.forEach(function (product) {
            product.addEventListener('click', function () {
                const dataID = product.id;
                productInfo(dataImgs[dataID - 1].title, dataImgs);
            });
        });
    }

    //header on click

    const headerBtn = document.querySelectorAll('.header-btn');
    const menuBtn = document.querySelectorAll('.menu-btn');
    const menuList = ['tatca', 'cafe', 'tra', 'hitea'];
    console.log(headerBtn);

    function callMenu(index) {
        showProduct();
        const cfContainer = document.querySelectorAll('.cf-container');
        cfContainer.forEach(function (item) {
            if (!item.classList.contains(menuList[index])) {
                item.classList.add('--hide');
            }
        });
        renderProductInfo();
    }

    headerBtn.forEach(function (element, index) {
        element.addEventListener('click', function () {
            callMenu(index + 1);
        });
    });

    menuBtn[0].addEventListener('click', function (e) {
        showProduct();
        renderProductInfo();
    });
    menuBtn.forEach(function (element, index) {
        if (index != 0) {
            element.addEventListener('click', function () {
                callMenu(index);
            });
        }
    });

    //tránh header che kh thấy product

    if (screen.width > 849) {
        leftItem[0].onclick = function () {
            scrollTo(0, cfContainer[0].offsetTop - 110);
        };
        leftItem[1].onclick = function () {
            scrollTo(0, cfContainer[0].offsetTop - 110);
        };
        leftItem[2].onclick = function () {
            scrollTo(0, cfContainer[1].offsetTop - 110);
        };
        leftItem[3].onclick = function () {
            scrollTo(0, cfContainer[2].offsetTop - 110);
        };
        leftItem[4].onclick = function () {
            scrollTo(0, cfContainer[3].offsetTop - 110);
        };
        leftItem[5].onclick = function () {
            scrollTo(0, cfContainer[3].offsetTop - 110);
        };
        leftItem[6].onclick = function () {
            scrollTo(0, cfContainer[4].offsetTop - 110);
        };
        leftItem[7].onclick = function () {
            scrollTo(0, cfContainer[5].offsetTop - 110);
        };
        leftItem[8].onclick = function () {
            scrollTo(0, cfContainer[5].offsetTop - 110);
        };
        leftItem[9].onclick = function () {
            scrollTo(0, cfContainer[6].offsetTop - 110);
        };
        leftItem[10].onclick = function () {
            scrollTo(0, cfContainer[7].offsetTop - 110);
        };
    } else {
        // leftItem[0].addEventListener('click', function () {
        //     scrollTo(0, cfContainer[0].offsetTop - 150);
        //     const newNode = document.createTextNode('Cà Phê');
        //     mobileMenuTxt.replaceChild(newNode, cfContainer[0].childNodes[0]);
        // });
        // leftItem[4].addEventListener('click', function () {
        //     scrollTo(0, cfContainer[3].offsetTop - 150);
        //     const newNode = document.createTextNode('Trà');
        //     mobileMenuTxt.replaceChild(newNode, mobileMenuTxt.childNodes[0]);
        // });
        // leftItem[7].addEventListener('click', function () {
        //     scrollTo(0, cfContainer[5].offsetTop - 150);
        //     const newNode = document.createTextNode('Hi-Tea Healthy');
        //     mobileMenuTxt.replaceChild(newNode, mobileMenuTxt.childNodes[0]);
        // });
        const leftList = document.querySelector('.left-list');
        leftList.style = 'display: none';
        imageContainer.style = 'transform: translate(0px, -130px)';
    }
}
