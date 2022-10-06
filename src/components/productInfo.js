import dataToppings from '../database/topping.json' assert { type: 'json' };

function createToppingHTML(tag) {
    const topping = dataToppings[tag];
    let toppingHTML = '';
    if (topping) {
        for (let t of topping) {
            toppingHTML += `               
    <li class="option_selections_item">
       <p>${t} + 10.000 đ</p>
    </li>`;
        }
    }
    return toppingHTML;
}
function createRelatedHTML(dataImg = { tag: '', title: {} }, dataImgs) {
    const items = dataImgs.filter((data, i) => {
        return data.tag === dataImg.tag && data.title !== dataImg.title;
    });
    let relatedHTML = document.createElement('ul');
    relatedHTML.classList.add('option_selections');
    let randomItems = []; //link
    if (items) {
        for (let i of items) {
            randomItems.push({ image: i.image, title: i.title });
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
            li.innerHTML = `  <img src="./${randomItems[i].image}" data-title="${randomItems[i].title}"/>`;
            relatedHTML.appendChild(li);
        }
    }

    return relatedHTML;
}
export function productInfo(title, dataImgs) {
    const detailProduct = document.getElementById('detail-product');

    const data = dataImgs.find((item) => item.title === title);

    if (!data || !detailProduct) {
        return;
    }
    const toppingHTML = createToppingHTML(data.tag);
    const relatedHTML = createRelatedHTML(
        { tag: data.tag, title: data.title },
        dataImgs
    );

    const html = `                
    <div class="product-about">
    <div class="product_visual">
        <div class="product_visual_img">
            <img
                src="./${data.image}"
                alt="ảnh ${data.title}"
            />
        </div>
    </div>
    <div class="product_shopping">
        <div class="info">
            <h2 class="h2">${data.title}</h2>
            <div class="info_sale">
                <div class="info_sale_price info_sale_item">
                ${data.price}đ
                </div>
                <del
                    class="info_sale_original info_sale_item --hide"
                    >${data.priceTotal}đ</del
                >
                <div
                    class="info_sale_percent info_sale_item --hide"
                >
                ${data.salePercent}%
                </div>
            </div>
        </div>
        <div class="option-size">
            <div class="h4">Chọn size (bắt buộc)</div>
            <ul class="option_selections">
                <li class="option_selections_item">
                    <p class="size-content">
                        <span
                            class="icon-mug icon-small"
                        ></span>
                        Nhỏ + 0 đ
                    </p>
                </li>
                <li class="option_selections_item">
                    <p class="size-content">
                        <span
                            class="icon-mug icon-medium"
                        ></span>
                        Vừa + 6.000 đ
                    </p>
                </li>
                <li class="option_selections_item">
                    <p class="size-content">
                        <span
                            class="icon-mug icon-large"
                        ></span>
                        Lớn + 10.000 đ
                    </p>
                </li>
            </ul>
        </div>
        <div class="option-topping">
            <div class="h4">Topping</div>
            <ul class="option_selections">
               ${toppingHTML}
            </ul>
        </div>
        <div class="product_shopping_cart">
            <span class="icon-cart icon"></span>
            <div class="h4">Đặt giao tận nơi</div>
        </div>
    </div>
</div>
<div class="product-description">
    <hr />
    <h2 class="h2">Mô tả sản phẩm</h2>
    <p>
     ${data.description}
    </p>
    <hr />
</div>
<div class="product-related">
    <h2 class="h2">Sản phẩm liên quan</h2>
    ${relatedHTML.outerHTML}
</div>`;

    detailProduct.innerHTML = html;

    //addEventListener
    const imgs = detailProduct.querySelectorAll('li img[data-title]');
    imgs.forEach((img) => {
        img.addEventListener('click', (e) => {
            e.preventDefault();
            productInfo(img.dataset.title, dataImgs);
            detailProduct.scrollIntoView(true);
            //tránh header che kh thấy product
            var scrolledY = window.scrollY;
            const headerHeight = document.getElementById('header').offsetHeight;
            if (scrolledY) {
                window.scroll(0, scrolledY - headerHeight);
            }
        });
    });
}
