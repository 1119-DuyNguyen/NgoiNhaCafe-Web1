import {
    btnCloseId,
    closeModal,
    openDisplay,
} from '../../src/library/display.js';

function printOrderFunction(idSelector) {
    //DEMO DATA dataBill
    var bill = {
        id: 5,
        info: '1 x đen đá nhỏ ',
        totalprice: 2100000,
        customer: {
            username: 'admin',
            password: 'admin',
            fullname: 'Duy2 Vy huy',
            address: '273 An Dương Vương, P3, Quận 5, TPHCM',
            phone: '0566490523',
            datesignup: '23-11-1999',
        },
        dateCreate: '28-10-2022',
        status: 'Chưa xử lý',
        isPay: false,
    };
    const modal = document.querySelector(idSelector);
    const content = modal.querySelector('#order-print-page');
    var html = '';
    html += `<div>
        <span class="h2">Thông tin đơn hàng:</span>
        <p>${bill.info}</p>
    </div>
    <div>
        <span class="h2">Ngày tạo đơn hàng:</span>
        <p>${bill.dateCreate}</p>
    </div>
    <div>
        <span class="h2">Tên khách hàng:</span>
        <p>${bill.customer.fullname}</p>
    </div>
    <div>
        <span class="h2">Địa chỉ:</span>
        <p>${bill.customer.address}</p>
    </div>
    <div>
        <span class="h2">SĐT:</span>
        <p>${bill.customer.phone}</p>
    </div>
    <div>
        <span class="h2">Tổng giá trị hoá đơn:</span>
        <p>${bill.totalprice}</p>
    </div>
    
    <div>
        <span class="h2">Tình trạng:</span>
        <p>${bill.status}</p>
        <label class="switch">
            <input type="checkbox" ${bill.isPay ? 'checked' : ''}/>
            <span class="slider round"></span>
        </label>
    </div>`;

    content.innerHTML = html;
    openDisplay(modal);
    btnCloseId(modal);
    closeModal(modal);
}
export default printOrderFunction;