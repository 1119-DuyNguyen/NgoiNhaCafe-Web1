import { Data } from '../database/data.js';
import {
    closeDisplay,
    openDisplay,
    btnCloseId,
    closeModal,
    toggleDisplay,
} from '../library/display.js';
import { openformAccount } from './formAccount.js';
var data = new Data();
const orderHistory = document.getElementById('order-history');

var orderHistoryContent = orderHistory.querySelector('.overview-history');
export function openOrderHistory() {
    var currentUser = data.getCurrentUser();
    if (currentUser) {
        //setup
        openDisplay(orderHistory);
        btnCloseId(orderHistory);
        closeModal(orderHistory);

        var html = ' ';
        //render dataBill
        var dataBills = data.getDataBill();

        if (!dataBills) {
            html = 'Không có đơn hàng nào';
        } else {
            dataBills = dataBills.filter((bill, i) => {
                return bill.customer.username === currentUser.username;
            });
            if (dataBills) {
                html += `  <th></th>
        <th>STT</th>
        <th style ="white-space: nowrap;">Ngày</th>
        <th style ="white-space: nowrap;">Tên đơn hàng</th>
        <th>Giá</th>
        <th>Trạng thái</th>`;
                for (var i = 0; i < dataBills.length; ++i) {
                    html += `<tr>
                    <td>
                    </td>
                    <td>${i + 1}</td>
                    <td style ="white-space: nowrap;">${
                        dataBills[i].dateCreate
                    }</td>
                    <td >${dataBills[i].info}</td>
                    <td>${dataBills[i].totalprice}đ</td>
                    <td style ="white-space: nowrap;">${
                        dataBills[i].status
                    }</td>
                </tr>`;
                }
            } else
                html =
                    '<h3 style="text-align:center; padding : 24px;">Không có đơn hàng nào</h3>';
        }

        orderHistoryContent.innerHTML = html;
    } else openformAccount();
}
