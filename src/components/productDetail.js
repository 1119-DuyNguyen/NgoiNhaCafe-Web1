//import dataToppings from '../database/topping.json' assert { type: 'json' };
import { toast } from './toast.js';
import { closeDisplay, openDisplay, btnCloseId } from '../library/display.js';
import { Data } from '../database/data.js';
const detailProduct = document.getElementById('detail-product');
const dataOption = {};
function initDataProduct(price, quantity = 1, size = 'medium') {
    dataOption.price = price;
    dataOption.quantity = quantity;
    dataOption.size = size;
}
const priceOption = {
    small: 0,
    medium: 6000,
    large: 10000,
};
const switchTranslateSize = {
    small: 'nhỏ',
    medium: 'vừa',
    large: 'lớn',
};
function createRelatedHTML(dataImg = { tag: '', id: '' }, dataImgs) {
    const items = dataImgs.filter((data, i) => {
        return data.tag === dataImg.tag && data.id !== dataImg.id;
    });
    let relatedHTML = document.createElement('ul');
    relatedHTML.classList.add('option_selections');
    let randomItems = []; //link
    if (items) {
        for (let i of items) {
            randomItems.push({
                image: i.image,
                title: i.title,
                id: i.id,
                price: i.price,
            });
        }

        //randomItems 4 item
        for (var i = randomItems.length - 1; i >= 4; i--) {
            randomItems.splice(
                Math.floor(Math.random() * randomItems.length),
                1
            );
        }

        for (var i = 0; i < randomItems.length; ++i) {
            const li = document.createElement('li');
            li.classList.add('option_selections_item');
            li.innerHTML = `
              <div class="image-pack">
                <img
                    class="product-image"
                    src="./${randomItems[i].image}"
                    alt=""
                />
                </div>
                <div class="overview">
                <p class="overview_title">${randomItems[i].title}</p>
                <p>${randomItems[i].price} đ</p>
                </div>
              `;
            li.setAttribute('data-id', randomItems[i].id);
            relatedHTML.appendChild(li);
        }
    }

    return relatedHTML;
}

export function productInfo(id, dataImgs) {
    if (typeof id === 'string') id = parseInt(id);
    const data = dataImgs.find((item) => item.id === id);
    if (!data || !detailProduct) {
        return;
    }
    initDataProduct(data.price);
    detailProduct.addEventListener('click', (e) => {
        if (e.target === detailProduct) {
            closeDisplay(detailProduct);
        }
    });

    openDisplay(detailProduct);

    // const toppingHTML = createToppingHTML(data.tag);

    const relatedHTML = createRelatedHTML(
        { tag: data.tag, id: data.id },
        dataImgs
    );
    var contentElemnt = detailProduct.querySelector('.content');
    const html = `                
        <div class="close">
        <i class="icon-cross icon"></i>
        </div>
        <div class="product-about">
            <div class="product_visual">
                <div class="product_visual_img">
                    <img
                        src="./${data.image}"
                        alt="cà phê đá"
                    />
                </div>
            </div>
            <div class="product_shopping">
                <div class="info">
                    <h2 class="h2">${data.title}</h2>
                    <div class="info_price">
                        <div class="price" data-price="${data.price}">${
        data.price
    }đ</div>
                        <div class="info-count">
                            <div class="icon minus --gray">
                            <i class="icon-minus"></i>
                            </div>
                            <div class="info-count_num" data-quantity="1">1</div>
                            <div class="icon plus">
                            <i class="icon-plus "></i>
                            </div>


                        </div>
                    </div>
                </div>
                <div class="product-description">
                    ${
                        data.description
                            ? `<hr />
                    <p>
                       ${data.description}
                    </p>
                    `
                            : ''
                    }  
                    <hr />
                </div>
                <div class="option-size">
                    <div class="h4">Chọn size (bắt buộc)</div>
                    <ul class="option_selections">
                        <li class="option_selections_item" data-option-size="small">
                            <p class="size-content" >
                                <i
                                    class="icon-mug icon-small"
                                ></i>
                                Nhỏ + 0 đ
                            </p>
                        </li>
                        <li class="option_selections_item --active" data-option-size="medium">
                            <p class="size-content">
                                <i
                                    class="icon-mug icon-medium"
                                ></i>
                                Vừa + 6.000 đ
                            </p>
                        </li>
                        <li class="option_selections_item" data-option-size="large">
                            <p class="size-content">
                                <i
                                    class="icon-mug icon-large"
                                ></i>
                                Lớn + 10.000 đ
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="product-related">
                <h2 class="product-related_title">
                Sản phẩm liên quan
            </h2>
            ${relatedHTML.outerHTML}
        </div>
    </div>
    <div class="cart">
        <div class="product_shopping_cart">
            <i class="icon-cart icon"></i>
            <div class="h4">Thêm vào giỏ hàng</div>
        </div>`;

    contentElemnt.innerHTML = html;

    //tới sản phẩm liên quan
    const liImgs = detailProduct.querySelectorAll('li[data-id]');
    liImgs.forEach((img) => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            if (!img.dataset.id) return;
           // console.log(img.dataset.id);
            productInfo(img.dataset.id, dataImgs);
            // detailProduct.scrollIntoView(true);
            // //tránh header che kh thấy product
            // var scrolledY = window.scrollY;
            // const headerHeight = document.getElementById('header').offsetHeight;
            // if (scrolledY) {
            //     window.scroll(0, scrolledY - headerHeight);
            // }
        });
    });
    // tăng / giảm số ly mua
    const btnQuantities = detailProduct.querySelectorAll('.info_price .icon');
    btnQuantities.forEach(calcQuantity);

    const optionsSize = detailProduct.querySelectorAll('.option-size li');

    optionsSize.forEach((option) => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            removeOptionActive(optionsSize);
            option.classList.add('--active');
            dataOption.size = option.dataset.optionSize;
        });
    });
    //submit data
    initSubmitProduct(data);
    // close button
    btnCloseId(detailProduct);
}
function calcQuantity(btn) {
    const textQuantity = btn.parentElement.querySelector('.info-count_num');
    let sign = btn.classList.contains('minus') ? -1 : 1;
    let btnMinus = btn.parentElement.querySelector('.minus');
    btn.addEventListener('click', (e) => {
        e.preventDefault();

        dataOption.quantity += sign;

        if (dataOption.quantity < 1) {
            dataOption.quantity = 1;
        } else {
            if (dataOption.quantity == 1 && sign == -1) {
                if (!btnMinus.classList.contains('--gray'))
                    btnMinus.classList.add('--gray');
            } else if (btnMinus.classList.contains('--gray')) {
                btnMinus.classList.remove('--gray');
            }

            textQuantity.textContent = dataOption.quantity;
            //          textQuantity.setAttribute('data-quantity', dataProduct.quantity);
        }
    });
}
function removeOptionActive(options) {
    options.forEach((option) => {
        if (option.classList.contains('--active'))
            option.classList.remove('--active');
    });
}
function initSubmitProduct(dataImg) {
    const cart = detailProduct.querySelector('.product_shopping_cart');
    cart.addEventListener('click', () => {
        for (const data in dataOption) {
            if (!dataOption[data]) {
                errorMessageNullProduct();
                return;
            }
        }

        // closeDisplay(detailProduct);
        successMessageAddCart();
        //return data
        //console.log(dataProduct);

        var dataController = new Data();
        dataImg.dataOption = dataOption;
        if (switchTranslateSize[dataOption.size]) {
            dataImg.dataOption.size = switchTranslateSize[dataOption.size];
        }
        dataController.pushCart(dataImg);
    });
}
function errorMessageNullProduct() {
    toast({
        title: ' Đã có lỗi xảy ra ',
        message: 'Ấn f5 và chọn đầy đủ thông tin',
        type: 'error',
        duration: 3000,
    });
}
function successMessageAddCart() {
    toast({
        title: ' Đã thêm vào giỏ hàng ',
        message: '',
        type: 'Success',
        duration: 2000,
    });
}
