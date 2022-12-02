import { productInfo } from './productDetail.js';
export function run(dataImgs) {
    const imageContainer = document.querySelector(
        '.home-product .image-container'
    );
    const htmls = dataImgs.map((element, index) => {
        if (index < 8) {
            return `
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
                </div>
                    <n>${element.title}</n>
                    <p style="margin-top: 15px">${element.price} đ</p>
                    <span class="icon-plus"></span>
            </div>
        </div>`;
        }
    });
    imageContainer.innerHTML = htmls.join('');

    const productList = document.querySelectorAll('.image-item');

    productList.forEach(function (product) {
        product.addEventListener('click', function () {
            const dataID = product.id;
            productInfo(dataImgs[dataID - 1].id, dataImgs);
        });
    });
}
