import { productInfo } from './productDetail.js';
export function run(dataImgs) {
    const leftItem = document.querySelectorAll('.left-item');
    const listItem = document.querySelectorAll('.left-list .list-item');
    const listLv2 = document.querySelectorAll('.list-lv2');
    const mobileMenuAll = document.querySelector('.mobile-top');
    const mobileMenuTxt = document.querySelector('.mobile-top p');
    const circleDown = document.querySelector('.icon-circle-down');
    const leftCfvn = document.querySelectorAll('.left-cfvn');
    const leftCfMay = document.querySelector('.left-cfMay');
    const leftColdbrew = document.querySelector('.left-cold-brew');
    const leftTraTraiCay = document.querySelectorAll('.left-tra-trai-cay');
    const leftTraSuaMacchiato = document.querySelector(
        '.left-tra-sua-macchiato'
    );
    const leftHiTeaTra = document.querySelectorAll('.left-hi-tea-tra');
    const leftHiTeaDaTuyet = document.querySelector('.left-hi-tea-da-tuyet');
    const leftHiTeaBlingBling = document.querySelector(
        '.left-hi-tea-bling-bling'
    );
    const cfvn = document.querySelector('.cfvn-txt');
    const cfMay = document.querySelector('.cfMay-txt');
    const coldBrew = document.querySelector('.cold-brew-txt');
    const traTraiCay = document.querySelector('.tra-trai-cay-txt');
    const traSuaMacchiato = document.querySelector('.tra-sua-macchiato-txt');
    const hiTeaTra = document.querySelector('.hi-tea-tra-txt');
    const hiTeaDaTuyet = document.querySelector('.hi-tea-da-tuyet-txt');
    const hiTeaBlingBling = document.querySelector('.hi-tea-bling-bling-txt');

    //xử lý active

    if (leftItem && listLv2) {
        leftItem.forEach(function (item) {
            if (screen.width > 849) {
                item.addEventListener('click', function (e) {
                    item.classList.add('active');
                    if (item.nextElementSibling) {
                        item.nextElementSibling.style = 'display:block;';
                    }
                });
            }
        });
    }

    if (mobileMenuAll) {
        var menuMobileOn = false;
        if (menuMobileOn === true) {
            listItem.forEach(function (item1) {
                item1.classList.remove('mobile-menu-on');
            });
            mobileMenuAll = false;
        }
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

    //render danh mục sản phẩm
    const cfvnhtml = dataImgs.map(function (element) {
        if (element.tag === 'Cà Phê Việt Nam') {
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
    const cfMayhtml = dataImgs.map(function (element) {
        if (element.tag === 'Cà Phê Máy') {
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
    const coldBrewhtml = dataImgs.map(function (element) {
        if (element.tag === 'Cold Brew') {
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
    const traTraiCayhtml = dataImgs.map(function (element) {
        if (element.tag === 'Trà trái cây') {
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
    const traSuaMacchiatohtml = dataImgs.map(function (element) {
        if (element.tag === 'Trà sữa Macchiato') {
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
    const hiTeaTrahtml = dataImgs.map(function (element) {
        if (element.tag === 'Hi-Tea Trà') {
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
    const hiTeaDaTuyethtml = dataImgs.map(function (element) {
        if (element.tag === 'Hi-Tea Đá Tuyết') {
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
    const hiTeaBlingBlinghtml = dataImgs.map(function (element) {
        if (element.tag === 'Hi-Tea Bling Bling') {
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
    cfvn.innerHTML = cfvnhtml.join('');
    cfMay.innerHTML = cfMayhtml.join('');
    coldBrew.innerHTML = coldBrewhtml.join('');
    traTraiCay.innerHTML = traTraiCayhtml.join('');
    traSuaMacchiato.innerHTML = traSuaMacchiatohtml.join('');
    hiTeaTra.innerHTML = hiTeaTrahtml.join('');
    hiTeaDaTuyet.innerHTML = hiTeaDaTuyethtml.join('');
    hiTeaBlingBling.innerHTML = hiTeaBlingBlinghtml.join('');

    //tránh header che kh thấy product

    if (screen.width > 849) {
        leftCfvn.forEach(function (element) {
            element.onclick = function () {
                scrollTo(0, cfvn.offsetTop - 90);
            };
        });
        leftCfMay.onclick = function () {
            scrollTo(0, cfMay.offsetTop - 70);
        };
        leftColdbrew.onclick = function () {
            scrollTo(0, coldBrew.offsetTop - 70);
        };
        leftTraTraiCay.forEach(function (element) {
            element.onclick = function () {
                scrollTo(0, traTraiCay.offsetTop - 90);
            };
        });
        leftTraSuaMacchiato.onclick = function () {
            scrollTo(0, traSuaMacchiato.offsetTop - 70);
        };
        leftHiTeaTra.forEach(function (element) {
            element.onclick = function () {
                scrollTo(0, hiTeaTra.offsetTop - 90);
            };
        });
        leftHiTeaDaTuyet.onclick = function () {
            scrollTo(0, hiTeaDaTuyet.offsetTop - 70);
        };
        leftHiTeaBlingBling.onclick = function () {
            scrollTo(0, hiTeaBlingBling.offsetTop - 70);
        };
    } else {
        leftCfvn.forEach(function (element) {
            element.addEventListener('click', function () {
                scrollTo(0, cfvn.offsetTop - 150);
                const newNode = document.createTextNode('Cà Phê');
                mobileMenuTxt.replaceChild(
                    newNode,
                    mobileMenuTxt.childNodes[0]
                );
            });
        });
        leftTraTraiCay.forEach(function (element) {
            element.addEventListener('click', function () {
                scrollTo(0, traTraiCay.offsetTop - 150);
                const newNode = document.createTextNode('Trà');
                mobileMenuTxt.replaceChild(
                    newNode,
                    mobileMenuTxt.childNodes[0]
                );
            });
        });
        leftHiTeaTra.forEach(function (element) {
            element.addEventListener('click', function () {
                scrollTo(0, hiTeaTra.offsetTop - 150);
                const newNode = document.createTextNode('Hi-Tea Healthy');
                mobileMenuTxt.replaceChild(
                    newNode,
                    mobileMenuTxt.childNodes[0]
                );
            });
        });
    }

    //render product info
    const productList = document.querySelectorAll('.image-item');

    productList.forEach(function (product) {
        product.addEventListener('click', function () {
            const dataID = product.id;
            productInfo(dataImgs[dataID - 1].title, dataImgs);
        });
    });
}
