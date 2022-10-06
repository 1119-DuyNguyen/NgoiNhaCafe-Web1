export function run(dataImgs) {
    const listItem = document.querySelectorAll('.left-list .list-item');
    const listLv2 = document.querySelectorAll('.list-lv2');
    const mobileMenuAll = document.querySelector('.mobile-top');
    const imageContainer = document.querySelector('.image-container-LP');
    const cfvn = document.querySelector('.cfvn-txt');
    const cfMay = document.querySelector('.cfMay-txt');
    const coldBrew = document.querySelector('.cold-brew-txt');
    const traTraiCay = document.querySelector('.tra-trai-cay-txt');
    const traSuaMacchiato = document.querySelector('.tra-sua-macchiato-txt');
    const hiTeaTra = document.querySelector('.hi-tea-tra-txt');
    const hiTeaDaTuyet = document.querySelector('.hi-tea-da-tuyet-txt');
    const hiTeaBlingBling = document.querySelector('.hi-tea-bling-bling-txt');

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
    const cfvnhtml = dataImgs.map(function (element) {
        if (element.tag === 'Cà Phê Việt Nam') {
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
            </div>
        </div>`;
        }
    });
    const cfMayhtml = dataImgs.map(function (element) {
        if (element.tag === 'Cà Phê Máy') {
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
                </div>
                </div>`;
        }
    });
    const coldBrewhtml = dataImgs.map(function (element) {
        if (element.tag === 'Cold Brew') {
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
                </div>
                </div>`;
        }
    });
    const traTraiCayhtml = dataImgs.map(function (element) {
        if (element.tag === 'Trà trái cây') {
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
                </div>
                </div>`;
        }
    });
    const traSuaMacchiatohtml = dataImgs.map(function (element) {
        if (element.tag === 'Trà sữa Macchiato') {
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
                </div>
                </div>`;
        }
    });
    const hiTeaTrahtml = dataImgs.map(function (element) {
        if (element.tag === 'Hi-Tea Trà') {
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
                </div>
                </div>`;
        }
    });
    const hiTeaDaTuyethtml = dataImgs.map(function (element) {
        if (element.tag === 'Hi-Tea Đá Tuyết') {
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
                </div>
                </div>`;
        }
    });
    const hiTeaBlingBlinghtml = dataImgs.map(function (element) {
        if (element.tag === 'Hi-Tea Bling Bling') {
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
                </div>
                </div>`;
        }
    });
    cfvn.innerHTML = cfvnhtml.join('');
    cfMay.innerHTML = cfMayhtml.join('');
    coldBrew.innerHTML = coldBrewhtml.join('');
    traTraiCay.innerHTML = traTraiCayhtml.join('');
    traSuaMacchiato.innerHTML = traSuaMacchiatohtml.join('');
    hiTeaTra.innerHTML = hiTeaTrahtml.join('');
    hiTeaDaTuyet.innerHTML = hiTeaDaTuyethtml.join('');
    hiTeaBlingBling.innerHTML = hiTeaBlingBlinghtml.join('');
}
