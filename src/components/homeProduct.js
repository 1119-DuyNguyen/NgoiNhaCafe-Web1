export function run(dataImgs) {
    const imageContainer = document.querySelector(
        '.home-product .image-container'
    );
    const htmls = dataImgs.map((element, index) => {
        if (index < 8) {
            return `
        <div class="image-item">
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
                    <a href="#">${element.title}</a>
                    <p style="margin-top: 15px">${element.price} đ</p>
                </div>`;
        }
    });
    imageContainer.innerHTML = htmls.join('');
}
