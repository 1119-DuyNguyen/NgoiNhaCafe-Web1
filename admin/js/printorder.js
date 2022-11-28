import {
    btnCloseId,
    closeModal,
    openDisplay,
} from '../../src/library/display.js';

function printOrderFunction(idSelector, bill) {
    //DEMO DATA dataBill
    const modal = document.querySelector(idSelector);
    const content = modal.querySelector('#order-print-page');
    var html = '';
    html += `<div>
        <span class="h3">Thông tin đơn hàng:</span>
        <p>${bill.info}</p>
    </div>
    <div>
        <span class="h3">Ngày tạo đơn hàng:</span>
        <p>${bill.dateCreate}</p>
    </div>
    <div>
        <span class="h3">Tên khách hàng:</span>
        <p>${bill.customer.fullname}</p>
    </div>
    <div>
        <span class="h3">Địa chỉ:</span>
        <p>${bill.customer.address}</p>
    </div>
    <div>
        <span class="h3">SĐT:</span>
        <p>${bill.customer.phone}</p>
    </div>
    <div>
        <span class="h3">Tổng giá trị hoá đơn:</span>
        <p>${bill.totalprice}</p>
    </div>
    
    <div>
        <span class="h3">Tình trạng:</span>
        <p>${bill.status}</p>
    </div>`;

    content.innerHTML = html;
    openDisplay(modal);
    btnCloseId(modal);
    closeModal(modal);
}
export default printOrderFunction;