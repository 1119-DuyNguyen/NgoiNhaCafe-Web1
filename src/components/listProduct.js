import { productInfo } from './productDetail.js';
import { Data } from '../database/data.js';
import { closeDisplay, openDisplay } from '../library/display.js';
const parentTag = {
    Cafe: ['Cà Phê Việt Nam', 'Cà Phê Máy', 'Cold Brew'],
    Tra: ['Trà trái cây', 'Trà sữa Macchiato'],
    HiTea: ['Hi-Tea Trà', 'Hi-Tea Đá Tuyết', 'Hi-Tea Bling Bling'],
};
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
const imageContainer = document.querySelector('.image-container-LP');
const leftItem = document.querySelectorAll('.left-item');
const data = new Data();
const dataImgs = data.getDataImgs();
export function run(dataImgs) {
    // const leftContainer = document.querySelector('.left-container');
    // function list() {
    //     let html = '';
    //     let k = 0;
    //     for (let i in parentTag) {
    //         html += `<p class="left-item">${switchTranslate(i)}</p>
    //         <ul class="list-lv2">`;
    //         for (let j of parentTag[i]) {
    //             html += ` <li class="left-item item[${k}]">
    //                 <p>${j}</p>
    //         `;
    //             k++;
    //         }
    //         html += '</ul>';
    //     }
    //     leftContainer.innerHTML = html;
    // }
    // list();
    //xử lý active
    // if (leftItem) {
    //     leftItem.forEach(function (item) {
    //         if (screen.width > 849) {
    //             item.addEventListener('click', function (e) {
    //                 item.classList.add('active');
    //                 if (item.nextElementSibling) {
    //                     item.nextElementSibling.style = 'display:block;';
    //                 }
    //             });
    //         } else {
    //             item.addEventListener('click', function (e) {
    //                 item.classList.add('active');
    //                 if (item.nextElementSibling) {
    //                     item.nextElementSibling.style = 'display:none;';
    //                 }
    //             });
    //         }
    //     });
    // }
}

//render danh mục sản phẩm
function rightTag(data) {
    for (let i in parentTag) {
        for (let key of parentTag[i]) {
            return switchTranslate2(data);
        }
    }
    return false;
}

function showProduct() {
    let showProductHtml = '';
    let currentTag = '';
    let count = 0;
    for (let i in parentTag) {
        for (let key of parentTag[i]) {
            let keyClass = rightTag(i);
            if (count > 0) showProductHtml += '</div>';
            showProductHtml += `<div class="cf-container ${keyClass}">
                    <t>${key}</t>
                `;
            ++count;
            for (let element of dataImgs) {
                if (element.tag === key) {
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
            // cài animation cho mượt mà như sunsilk;
            const timeDelay = 200;
            setTimeout(() => {
                //fadeIn
                openDisplay(imageContainer);
                imageContainer.style.opacity = 1;
            }, timeDelay);
            imageContainer.style.opacity = 0;
        }
    }
}

//render product info

function renderProductInfo() {
    const productList = document.querySelectorAll('.image-item');

    productList.forEach(function (product) {
        product.addEventListener('click', function () {
            const dataID = product.id;
            productInfo(dataImgs[dataID - 1].id, dataImgs);
        });
    });
}
const menuList = ['tatca', 'cafe', 'tra', 'hitea'];
export function callMenu(index) {
    showProduct();
    if (index != 0) {
        const cfContainer = document.querySelectorAll('.cf-container');
        cfContainer.forEach(function (item) {
            if (!item.classList.contains(menuList[index])) {
                item.classList.add('--hide');
            }
        });
    }
    renderProductInfo();
}
