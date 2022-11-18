import {
    closeDisplay,
    openDisplay,
    btnCloseId,
    closeModal,
    toggleDisplay,
} from '../library/display.js';

var orderPage = document.getElementById('order-page');
export function init(dataImgs) {
    // // viết phần js thêm/ giảm món hàng
    //phần để cho trang HTML chạy trước rồi sau đó JS mới chạy
    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', ready);
    } else {
        ready();
    }

    function ready() {
        //thêm items vô giỏ hàng( gồm hàm xóa( bên trong xóa có cập nhật giá))
        addItemsToCart();
        //cập nhật lại giá
        updateTotalPrices();
        // hàm tăng số lượng sản phẩm
        quantity();
        //hàm click mua hàng
        document
            .getElementsByClassName('btn-all-deleted')[0]
            .addEventListener('click', purchasedCLicked2);
        //hàm xóa tất cả đơn hàng
        document
            .getElementsByClassName('btn-purchased')[0]
            .addEventListener('click', purchasedCLicked1);

        //viết hàm bật tắt trang order

        updateTotalPrices();
    }
    //viết hàm click mua hàng(xóa hết items trong cart và cập nhật lại giá) có thông báo
    function purchasedCLicked1() {
        var cartList =
            document.getElementsByClassName('cart-table')[0].children[0];
        // console.log(cartList);
        if (cartList.childElementCount > 1) {
            while (!(cartList.childElementCount == 1)) {
                cartList.removeChild(cartList.lastChild);
            }
            alert('Cảm ơn vì đã mua hàng của chúng tôi');
            updateTotalPrices();
        } else {
            alert('Không có sản phẩm nào trong giỏ hàng');
        }
    }

    //viết hàm click xóa all(xóa hết items trong cart và cập nhật lại giá)
    function purchasedCLicked2() {
        var cartList =
            document.getElementsByClassName('cart-table')[0].children[0];
        // console.log(cartList);
        if (cartList.childElementCount > 1) {
            while (!(cartList.childElementCount == 1)) {
                cartList.removeChild(cartList.lastChild);
            }
            updateTotalPrices();
        } else {
            alert('Không có sản phẩm nào trong giỏ hàng');
        }
    }

    // xóa xong thì cập nhật lại total price
    function updateTotalPrices() {
        var cartItemContainer =
            document.getElementsByClassName('cart-table')[0];
        var cartRows = cartItemContainer.children[0].children;
        var total = 0;
        var eachTotal;
        //tổng tất cả những sản phẩm
        for (var index = 1; index < cartRows.length; index++) {
            eachTotal = 0;
            var cartRow = cartRows[index];
            var priceElement = cartRow.querySelectorAll('.cart-price')[0];
            // console.log(priceElement);
            var quantityElement =
                cartRow.getElementsByClassName('info-count_num')[0];

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
        document.getElementsByClassName('cart-total-price')[0].innerText =
            '$' + total;
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
        var cartItemContainer =
            document.getElementsByClassName('cart-table')[0];
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
            const textQuantity =
                btn.parentElement.querySelector('.info-count_num');
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
                updateTotalPrices(); //phần này là add vô khi tăng/giảm sẻ tự động cập nhật
            });
        }
    }

    function openOrderPage() {
        // console.log(orderPage);
        toggleDisplay(orderPage);
    }

    //hàm csr in sản phẩm
    function addItemsToCart() {
        var cartTable =
            //từ thẻ có table lấy tbody
            document.getElementsByClassName('cart-table')[0].children[0];
        // console.log(cartTable);
        let html = `
        <th></th>
        <th>Sản phẩm</th>
        <th>Kích cỡ</th>
        <th>Giá</th>
        <th>Số lượng</th>
        <th>Tổng</th>
        <th></th>
        `;
        dataImgs.forEach((elem) => {
            html += `<tr>
            <td>
                <img src="${elem.image}" alt="" />
            </td>
            <td>
                <div>${elem.title}</div>
            </td>
            <td class="cart-size">size</td>

            <td class="cart-price">${elem.price}${elem.currency}</td>

            <td>
                <button class="icon plus">
                    <i class="icon-plus"></i>
                </button>

                <div class="info-count_num">1</div>

                <button class="icon minus --gray">
                    <i class="icon-minus "></i>
                </button>
            </td>

            <td></td>
            <td>
                <button class="deleted-btn">x</button>
            </td>
        </tr>`;
        });
        cartTable.innerHTML = html;
        // console.log(html);
        // console.log(cartTable);
        //vấn đề:do làm hàm remove đầu tiên nên, sau khi thêm hàm addItems vô thì nó ko chạy.
        //giải quyết: thêm hàm remove vô trong hàm add thì nó chạy
        //hàm remove dùng để xóa những phần tử mà mình ko muốn mua, mà trong hàm này nó có
        //update nên nó tự động update lên lun
        var removeCartItemBtns = document.getElementsByClassName('deleted-btn');
        for (let index = 0; index < removeCartItemBtns.length; index++) {
            var btn = removeCartItemBtns[index];
            btn.addEventListener('click', (e) => {
                var btnClicked = e.target;
                btnClicked.parentElement.parentElement.remove();
                //gọi hàm update giá để nó cập nhật lại từng cái
                updateTotalPrices();
            });
        }
    }
}
