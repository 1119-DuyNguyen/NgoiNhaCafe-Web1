import { Data } from '../database/data.js';
import { openformAccount } from './formAccount.js';
import { openOrderHistory } from './orderHistory.js';
import { toast } from './toast.js';
const data = new Data();
const orderPage = document.getElementById('order-page');

const cartTable = orderPage.querySelector('.cart-table');
const totalPriceElement = orderPage.querySelector('.cart-total-price');
//btn

const btnPurchare = orderPage.querySelector('.btn-purchased');
const btnDelete = orderPage.querySelector('.btn-deleted');
var linkHistory = orderPage.querySelector('.order-history');

//global data
linkHistory.addEventListener('click', () => {
    openOrderHistory();
});
export function openCartPage() {
    ready();
}
function resetDefaultSelectAll() {
    const checkboxBtns = cartTable.getElementsByClassName('checkbox');

    var btnSelectAll = checkboxBtns[0];
    if (checkboxBtns.length > 1) {
        btnSelectAll.click();
    } else {
        btnSelectAll.checked = false;
    }
}
function ready() {
    addItemsToCart();

    applyCheckbox();
    applyOperatorQuantity();
    btnDelete.addEventListener('click', deleteBtnCarts);

    btnPurchare.addEventListener('click', purchasedBtnCart);
    resetDefaultSelectAll();
}
function applyCheckbox() {
    const checkboxBtns = cartTable.getElementsByClassName('checkbox');
    var btnSelectAll = checkboxBtns[0];
    btnSelectAll.addEventListener('change', (e) => {
        changeCheckBoxBtns(btnSelectAll.checked);
        updateSelect();
    });
    for (var i = 1; i < checkboxBtns.length; ++i) {
        checkboxBtns[i].addEventListener('change', (e) => {
            btnSelectAll.checked = updateSelect();
        });
    }
}
//viết hàm click mua hàng(xóa hết items trong cart và cập nhật lại giá) có thông báo
function purchasedBtnCart() {
    handleSubmitBtnCarts(convertSelectedCartsToBills);
}

function deleteBtnCarts() {
    handleSubmitBtnCarts(
        (activeCheckboxes) => {
            if (activeCheckboxes) {
                activeCheckboxes.forEach((checkbox) => {
                    data.spliceCart(checkbox.dataset.index);
                    checkbox.closest('tr').remove();
                });
            } else console.error('có lỗi xảy ra');
            updateSelect();
        },
        true,
        'Bạn có chắc chắn muốn xóa đơn hàng?'
    );
}
function convertSelectedCartsToBills(activeCheckboxes) {
    //validate if user chưa đăng nhập
    var currentUser = data.getCurrentUser();
    if (currentUser) {
        var cartInfo = [];
        // đếm số phần tử xóa vì querySelectorAll là tĩnh nên data không đc cập nhập
        var elemenDeleted = 0;
        activeCheckboxes.forEach((checkbox) => {
            var str = '';
            var row = checkbox.closest('tr');
            var cart = data.spliceCart(checkbox.dataset.index - elemenDeleted);
            elemenDeleted++;
            var quantity =
                row.querySelector(' .info-count_num').dataset.quantity;
            str += quantity + ' X ' + cart.title + ' ';
            cartInfo.push(str);
            row.remove();
        });
        addItemsToCart();
        var bill = {
            info: cartInfo.join(),
            totalprice: totalPriceElement.dataset.priceTotal,
        };
        console.log(bill);
        data.pushBill(bill);
        updateSelect();
    } else {
        openformAccount();
    }
}

//viết hàm click xóa all(xóa hết items trong cart và cập nhật lại giá)
/**
 *
 * @param {*} callback function( activeCheckboxes)
 * @param {*} isAlert boolean
 * @param {*} message String
 */
function handleSubmitBtnCarts(callback, isAlert = false, message = '') {
    var activeCheckboxes = cartTable.querySelectorAll(
        'tbody input[type="checkbox"]:checked'
    );
    if (activeCheckboxes.length > 0) {
        if (isAlert) {
            if (confirm(message)) {
                callback(activeCheckboxes);
            }
        } else {
            callback(activeCheckboxes);
        }
    } else {
        toast({
            title: 'Bạn chưa chọn sản phẩm trong giỏ hàng',
            message: '',
            duration: 2000,
            type: 'info',
        });
    }
}

// cộng trừ số lượng, tính tổng giá tiền
function applyOperatorQuantity() {
    var quantityElements = cartTable.querySelectorAll('.quantity');
    // gồm 3 thành phần : minus, plus, info-count_num
    quantityElements.forEach((elem) => {
        const minusBtn = elem.querySelector('.minus');
        const plusBtn = elem.querySelector('.plus');
        const info = elem.querySelector('.info-count_num');

        minusBtn.addEventListener('click', () => {
            handleOperator(minusBtn, info);
            updateSelect();
        });
        plusBtn.addEventListener('click', () => {
            if (minusBtn.classList.contains('--gray')) {
                minusBtn.classList.remove('--gray');
            }
            handleOperator(plusBtn, info);
            updateSelect();
        });
    });

    function handleOperator(btn, infoElem) {
        var dataQuantity = Number.parseInt(infoElem.dataset.quantity);
        var sign = 0;
        if (btn.classList.contains('minus')) {
            sign = -1;
            if (dataQuantity + sign <= 1) {
                if (!btn.classList.contains('--gray'))
                    btn.classList.add('--gray');
                else {
                    sign = 0;
                }
            }
        } else if (btn.classList.contains('plus')) {
            sign = 1;
        } else {
            console.error('có lỗi xảy ra btn ko có plus và minus class', btn);
        }
        dataQuantity += sign;

        infoElem.innerText = dataQuantity;

        infoElem.dataset.quantity = dataQuantity;
    }
}
function switchTranslateSize(size) {
    switch (size.toLowerCase()) {
        case 'lớn':
            return 10000;
        case 'vừa':
            return 6000;
        default:
            return 0;
    }
}
//hàm csr in sản phẩm
function addItemsToCart() {
    var dataCarts = data.getDataCart();
    var cartTBody = cartTable.querySelector('tbody');
    let html = '';
    if (dataCarts) {
        dataCarts.forEach((elem, i) => {
            html += `<tr>
            <td>
            <input type="checkbox" data-index="${i}" class="checkbox" />
            </td>
            <td>
                <img src="${elem.image}" alt="" />
            </td>
            <td>
                <div>${elem.title}</div>
            </td>
            <td class="cart-size">${upperFirstLetter(elem.dataOption.size)}</td>
            <td class="one-row quantity">

                <button class="icon minus --gray">
                <i class="icon-minus "></i>
            </button>
                <div class="info-count_num" data-quantity="1">1</div>
                <button class="icon plus">
                <i class="icon-plus"></i>
            </button>

            </td>
            <td class="cart-price" data-price="${
                elem.price + switchTranslateSize(elem.dataOption.size)
            }$">${elem.price}đ</td>



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
 *update số lượng phần tử sẽ xóa/ thanh toán, cập nhập nút select all, tổng giá tiền
 * @returns boolean true thì là đã chọn hết false nếu chưa chọn hết
 */
function updateSelect() {
    //dataset.count có thể dùng tương lai
    var activeCheckboxes = cartTable.querySelectorAll(
        'tbody input[type="checkbox"]:checked'
    );
    var countActiveCheckbox = activeCheckboxes.length;
    //reduce(callback, initValue)
    var priceTotal = Array.from(activeCheckboxes).reduce(
        (accumulator, checkbox, i) => {
            var trParent = checkbox.closest('tr');
            var originPrice = Number.parseInt(
                trParent.querySelector('.cart-price').dataset.price
            );
            var quantity = Number.parseInt(
                trParent.querySelector('.info-count_num').dataset.quantity
            );
            return accumulator + originPrice * quantity;
        },
        0
    );
    totalPriceElement.dataset.priceTotal = priceTotal;
    totalPriceElement.innerText = priceTotal + 'đ';
    btnDelete.dataset.count = countActiveCheckbox;
    btnDelete.innerText = 'Xóa (' + countActiveCheckbox + ')';
    btnPurchare.dataset.count = countActiveCheckbox;
    btnPurchare.innerText = 'Thanh toán (' + countActiveCheckbox + ')';
    // length -1 vì không tính select all
    if (countActiveCheckbox === cartTable.rows.length - 1) {
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
//orderHistory
