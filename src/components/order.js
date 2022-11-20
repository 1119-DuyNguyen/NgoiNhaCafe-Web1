import {
    closeDisplay,
    openDisplay,
    btnCloseId,
    closeModal,
    toggleDisplay,
} from '../library/display.js';

const orderPage = document.getElementById('order-page');
const cartTable = orderPage.querySelector('.cart-table');

//btn

const btnPurchare = orderPage.querySelector('.btn-purchased');
const btnDelete = orderPage.querySelector('.btn-deleted');

//global data
var quantityCarts;
export function openCartPage(dataCarts) {
    /*
    -------huy----------
    // // viết phần js thêm/ giảm món hàng
    //phần để cho trang HTML chạy trước rồi sau đó JS mới chạy
    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', ready);
    } else {
        ready();
    }
    ---duy------------
    vì script để ở cuối nên chắc chắn js sẽ chạy 
     */
    quantityCarts = [];
    ready(dataCarts);
}

function ready(dataCarts) {
    //thêm items vô giỏ hàng( gồm hàm xóa( bên trong xóa có cập nhật giá))
    addItemsToCart(dataCarts);
    //cập nhật lại giá
    //  updateTotalPrices();
    // hàm tăng số lượng sản phẩm
    // quantity();
    applyCheckbox();
    btnDelete.addEventListener('click', deleteBtnCarts);

    btnPurchare.addEventListener('click', purchasedBtnCart);

    //viết hàm bật tắt trang order
    // updateTotalPrices();
}
function applyCheckbox() {
    const checkboxBtns = cartTable.getElementsByClassName('checkbox');
    var btnSelectAll = checkboxBtns[0];
    btnSelectAll.addEventListener('change', (e) => {
        changeCheckBoxBtns(e.target.checked);
        updateDeleteBtn();
    });
    for (var i = 1; i < checkboxBtns.length; ++i) {
        checkboxBtns[i].addEventListener('change', (e) => {
            btnSelectAll.checked = updateDeleteBtn();
        });
    }
}
//viết hàm click mua hàng(xóa hết items trong cart và cập nhật lại giá) có thông báo
function purchasedBtnCart() {
    var cartTotal = cartTable.rows.length;
    // var cartList = document.getElementsByClassName('cart-table')[0].children[0];

    // console.log(cartList);
    // if (cartList.childElementCount > 1) {
    //     while (!(cartList.childElementCount == 1)) {
    //         cartList.removeChild(cartList.lastChild);
    //     }
    //     alert('Cảm ơn vì đã mua hàng của chúng tôi');
    //     updateTotalPrices();
    // } else {
    //     alert('Không có sản phẩm nào trong giỏ hàng');
    // }
}

//viết hàm click xóa all(xóa hết items trong cart và cập nhật lại giá)
function deleteBtnCarts() {
    var cartList = document.getElementsByClassName('cart-table')[0].children[0];
    // console.log(cartList);

    // if (cartList.childElementCount > 1) {
    //     if (confirm('Bạn có chắc chắn muốn xóa tất cả đơn hàng?')) {
    //         while (!(cartList.childElementCount == 1)) {
    //             cartList.removeChild(cartList.lastChild);
    //         }
    //         updateTotalPrices();
    //     }
    // } else {
    //     alert('Không có sản phẩm nào trong giỏ hàng');
    // }
}

// xóa xong thì cập nhật lại total price
function updateTotalPrices() {
    var cartRows = cartTable.rows.length;
    console.log(cartRows);
    var total = 0;
    var eachTotal;
    //tổng tất cả những sản phẩm
    for (var index = 1; index < cartRows.length; index++) {
        eachTotal = 0;
        var cartRow = cartRows[index];
        var priceElement = cartRow.querySelectorAll('.cart-price')[0];
        // console.log(priceElement);
        var quantityElement = cartRow.getElementsByClassName('info-count_num');

        var price = parseFloat(priceElement.innerText.replace('$', ''));
        // console.log(price);
        var quantity = parseInt(quantityElement.innerText);
        // console.log(quantity);
        total += price * quantity;
        eachTotal += price * quantity;
        eachTotal = Math.round(eachTotal * 100) / 100;
        var eachTotalAdress = cartRow.children[5];
        eachTotalAdress.innerText = eachTotal + 'đ';
        // console.log(eachTotal);
    }
    // console.log(total);
    total = Math.round(total * 100) / 100;
    // document.getElementsByClassName('cart-total-price')[0].innerText =
    //     '$' + total;
}

//tự viết hàm dấu cộng
// function quantityCount() {
//     var incBtn = document.getElementsByClassName('plus');
//     var minusBtn = document.getElementsByClassName('minus');
//     console.log(incBtn);
//     console.log(minusBtn);

//     for (let index = 0; index < incBtn.length; index++) {
//         var btn = incBtn[index];
//         btn.addEventListener('click', (e) => {
//             var btnClicked = e.target;
//             var input = btnClicked.parentElement;
//             console.log(input);
//         });
//     }
// }
// quantityCount();

function quantity() {
    var cartItemContainer = document.getElementsByClassName('cart-table')[0];
    var cartRows = cartItemContainer.children[0].children;
    // console.log(cartRows);
    // console.log(cartRows);
    let quantity = [];
    for (var index = 1; index < cartRows.length; index++) {
        var cartRow = cartRows[index];
        const btnQuantities = cartRow.querySelectorAll('.icon');
        quantity.push(1);
        btnQuantities.forEach((btn) => {
            calcQuantity(btn, index - 1);
        });
    }

    function calcQuantity(btn, indexQuantity) {
        const textQuantity = btn.parentElement.querySelector('.info-count_num');
        let sign = btn.classList.contains('minus') ? -1 : 1;
        let btnMinus = btn.parentElement.querySelector('.minus');
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            quantity[indexQuantity] += sign;

            if (quantity[indexQuantity] < 1) {
                quantity[indexQuantity] = 1;
            } else {
                if (quantity[indexQuantity] == 1 && sign == -1) {
                    if (!btnMinus.classList.contains('--gray'))
                        btnMinus.classList.add('--gray');
                } else if (btnMinus.classList.contains('--gray')) {
                    btnMinus.classList.remove('--gray');
                }

                textQuantity.textContent = quantity[indexQuantity];
            }
            updateTotalPrices();
        });
    }
}
//hàm csr in sản phẩm
function addItemsToCart(dataCarts) {
    var cartTBody = cartTable.querySelector('tbody');
    console.log(cartTBody);
    let html = '';
    if (dataCarts) {
        dataCarts.forEach((elem, i) => {
            html += `<tr>
            <td>
            <input type="checkbox" value="${i}" class="checkbox" data-type=""/>
            </td>
            <td>
                <img src="${elem.image}" alt="" />
            </td>
            <td>
                <div>${elem.title}</div>
            </td>
            <td class="cart-size">${upperFirstLetter(elem.dataOption.size)}</td>
            <td class="one-row">

                <button class="icon minus --gray">
                <i class="icon-minus "></i>
            </button>
                <div class="info-count_num">1</div>
                <button class="icon plus">
                <i class="icon-plus"></i>
            </button>

            </td>
            <td class="cart-price">${elem.price}${elem.currency}</td>



        </tr>`;
        });
    }
    cartTBody.innerHTML = html;
}
function upperFirstLetter(string) {
    if (!string || typeof string !== 'string') {
        return 'undefined';
    }
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.substring(1);
}

/**
 *update số lượng phần tử sẽ xóa và cập nhập nút select all
 * @returns boolean true thì là đã chọn hết false nếu chưa chọn hết
 */
function updateDeleteBtn() {
    //dataset.count có thể dùng tương lai
    var activeCheckbox = cartTable.querySelectorAll(
        'tbody input[type="checkbox"]:checked'
    ).length;

    btnDelete.dataset.count = activeCheckbox;
    btnDelete.innerText = 'Xóa (' + activeCheckbox + ')';
    // length -1 vì không tính select all
    if (activeCheckbox === cartTable.rows.length - 1) {
        return true;
    } else return false;
}
/**
 *chuyển đổi một loạt btn
 * @param {boolean} isCheck tất cả checkbox sẽ checked theo isCheck
 *
 */
function changeCheckBoxBtns(isCheck) {
    var checkBoxBtns = cartTable.querySelectorAll('tbody .checkbox');
    checkBoxBtns.forEach((btn, i) => {
        btn.checked = isCheck;
    });
}
