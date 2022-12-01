import dataObj from "../data.js";
import renderData from "./renderData.js";

/**
 * Hàm render phân trang
 * @param {int} numOfItemsOnPage số lượng phần tử mỗi trang
 * @param {int} type loại (users - người dùng, products - sản phẩm, để trống - mặc định)
 * @return void
 */
 function renderPaginator(numOfItemsOnPage = 9, type = "") {
    // Render paginator cho từng trang

    let html, num;
    function render(selector, type) {
        // Lấy phần tử DOM thanh các trang
        let elem = document.querySelector(selector+" .paginator_items");
        let arrToProcess;
        // Ứng với mỗi loại (type)
        switch (type) {
            case 'users':
                arrToProcess = dataObj.Users;
                break;
            case 'products':
                arrToProcess = dataObj.Imgs;
                break;
            case 'orders':
                arrToProcess = dataObj.Bills;
                break;
        }

        // render
        num = Math.ceil(arrToProcess.length/numOfItemsOnPage);
        html = '';
        for (let i = 1; i <= num; i++) {
            html += `<button data-page="${i}">${i}</button>`;
        }
        elem.innerHTML = html;

        
        let elem_btns = document.querySelectorAll(selector+" .paginator_items button");

        // Với mỗi button
        for (let i = 0; i < elem_btns.length; i++) {
            if (i == 0) elem_btns[i].classList.add("active"); // chọn btn đầu tiên
            elem_btns[i].addEventListener('click', e => { // nếu click vào 1 btn
                elem_btns.forEach(btn => {
                    btn.classList.remove('active'); // reset toàn bộ
                });
                // click btn nào thì render trang đó
                renderData(elem_btns[i].dataset.page, numOfItemsOnPage, type);
                elem_btns[i].classList.add("active"); // chọn btn
            })
        }
    }
    
    
    switch (type) {
        case 'users', 'products','orders':
            render(".admin-container[data-csr='"+type+"']", type);
            break;
    
        default:
            render(".admin-container[data-csr='users']", 'users');
            render(".admin-container[data-csr='products']", 'products');
            render(".admin-container[data-csr='orders']", 'orders');
            break;
    }
}

export default renderPaginator;