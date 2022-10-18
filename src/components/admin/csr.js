import { dataUsers, dataImgs } from "./temp_data.js";

function renderData(page = 1, type = '') {
    let html, first, last;

    let managerments = document.querySelectorAll('.managerment');
    managerments.forEach(elem => {
        elem.innerHTML = `<div class="select-all">
            <input type="checkbox" class="check-all" />
            <label for="check-all">Chọn tất cả</label>
        </div>
        <div id="actions">
            <select id="decisions">
                <option value="undone" selected>-- Hành động --</option>
                <option value="delete">Xóa</option>
            </select>
            <button class="btn btn-info">Thực hiện</button>
        </div>`;
    }) // render checkbox check_all

    function applyCheckboxFeature(page) {
        // Hàm render chức năng check all checkbox
        function checkAllCheckbox() {
            if (check_all.checked) {
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                })
                check_all.checked = false;
            } else {
                checkboxes.forEach(checkbox => {
                    checkbox.checked = true;
                })
                check_all.checked = true;
            }
        }
        let select_all = document.querySelector(`[data-csr='${page}'] .select-all`);
        let check_all = document.querySelector(`[data-csr='${page}'] .check-all`);
        let checkboxes = document.querySelectorAll(`[data-csr='${page}'] .user-checkbox`);

        if (select_all !== null) { // tồn tại
            select_all.addEventListener('click', checkAllCheckbox, true);
            check_all.addEventListener('click', checkAllCheckbox, true);

            checkboxes.forEach(checkbox => { // nếu check tất cả checkbox hoặc bỏ check 1 trong tất cả checkbox đã check
                checkbox.addEventListener('change', e => {
                    let checkboxs_checked = document.querySelectorAll(`[data-csr='${page}'] .user-checkbox:checked`)
                    if (checkbox.checked) {
                        if (checkboxs_checked.length == checkboxes.length) check_all.checked = true;
                    } else {
                        check_all.checked = false;
                    }
                })
            })
        }
    }


    function renderUsers(page) {
        let s_users = document.querySelector(".admin-container[data-csr='users'] table");
        html = `<tr>
            <th></th>
            <th>STT</th>
            <th>Tên đăng nhập</th>
            <th>Email</th>
            <th>Ngày đăng ký</th>
            <th>Số điện thoại</th>
            <th></th>
        </tr>`;
        
        first = page * 10 - 10;
        last = page * 10 - 1;
        if (last > dataUsers.length) last = dataUsers.length-1;
        for (let i = first; i <= last; i++) {
            html += `<tr>
                <td>
                    <input type="checkbox" value="${dataUsers[i].id}" class="user-checkbox"/>
                </td>
                <td>${i+1}</td>
                <td>${dataUsers[i].username}</td>
                <td>
                    <a href="mailto:${dataUsers[i].email}">${dataUsers[i].email}</a>
                </td>
                <td></td>
                <td>${dataUsers[i].phone}</td>
                <td>
                    <button class="btn btn-info"><i class="icon-pencil"></i></button>
                    <button class="btn btn-info"><i class="icon-info"></i></button>
                    <button class="btn btn-danger"><i class="icon-bin"></i></button>
                </td>
            </tr>`
        }
    
        s_users.innerHTML = html;
    }
    function renderProducts(page) {
        let s_products = document.querySelector(".admin-container[data-csr='products'] table");

        html = `<tr>
            <th></th>
            <th>STT</th>
            <th>Ảnh</th>
            <th>Tiêu đề</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Tag</th>
            <th>Hành động</th>
        </tr>`;
    
        first = page * 10 - 10;
        last = page * 10 - 1;
    
        if (last > dataImgs.length) last = dataImgs.length-1;
        for (let i = first; i <= last; i++) {
            html += `<tr>
                <td>
                    <input type="checkbox" value="1" class="user-checkbox"/>
                </td>
                <td>${i+1}</td>
                <td><img src="../${dataImgs[i].image}"></td>
                <td>${dataImgs[i].title}</td>
                <td>
                    <div>
                        ${dataImgs[i].description}
                    </div>
                </td>
                <td>${dataImgs[i].price}${dataImgs[i].currency}</td>
                <td>${dataImgs[i].tag}</td>
                <td>
                    <button class="btn btn-info">
                        <span class="icon-pencil"></span>
                    </button>
                    <button class="btn btn-info">
                        <span class="icon-info"></span>
                    </button>
                    <button class="btn btn-danger">
                        <span class="icon-bin"></span>
                    </button>
                </td>
            </tr>`
        }
    
        s_products.innerHTML = html;
    }

    switch (type) {
        case 'users':
            renderUsers(page);

            applyCheckboxFeature('users');

            break;

        case 'products':
            renderProducts(page);

            applyCheckboxFeature('products');

            break;
    
        default:
            renderUsers(page);
            renderProducts(page);

            applyCheckboxFeature('users');
            applyCheckboxFeature('products');

            break;
    }
}

function renderPaginator() {
    // Render paginator cho từng trang

    let html, num;
    let s_users = document.querySelector(".admin-container[data-csr='users'] .paginator_items");
    
    num = Math.ceil(dataUsers.length/10);
    html = '';
    for (let i = 1; i <= num; i++) {
        html += `<button data-page="${i}">${i}</button>`;
    }
    s_users.innerHTML = html;



    let s_products = document.querySelector(".admin-container[data-csr='products'] .paginator_items");

    num = Math.ceil(dataImgs.length/10);
    html = '';
    for (let i = 1; i <= num; i++) {
        html += `<button data-page="${i}">${i}</button>`;
    }
    s_products.innerHTML = html;
}

function runCSR() {

    // Render data

    renderData();
    renderPaginator();

    let p_users = document.querySelectorAll(".admin-container[data-csr='users'] .paginator_items button");
    let p_products = document.querySelectorAll(".admin-container[data-csr='products'] .paginator_items button");

    p_users.forEach(elem => {
        elem.addEventListener('click', e => {
            renderData(elem.dataset.page, 'users');
        })
    });

    p_products.forEach(elem => {
        elem.addEventListener('click', e => {
            renderData(elem.dataset.page, 'products');
        })
    });

    // CSR Init

    // Lấy data từ URL
    let queryString = window.location.search;
    // convert sang URL parameters
    let urlParams = new URLSearchParams(queryString);

    let currentPage = '';
    if (urlParams.get("page") === null) { // nếu param page chưa định nghĩa
        currentPage = 'home';
    } else currentPage = urlParams.get("page");

    let availablePages = ['home',
    'users',
    'products',
    'orders'];

    // Render trang dựa theo url
    function renderPage(currentPage) {

        document.querySelectorAll(".admin-container[data-csr]").forEach(element => {
            element.classList.remove("--hidden");
            element.classList.add("--hidden");
        })

        // lấy phần tử
        let elem = document.querySelector(`.admin-container[data-csr='${currentPage}']`);

        // nếu không tìm thấy trong arr và elem đã định nghĩa
        if (availablePages.indexOf(currentPage) != -1 && elem !== null)
            elem.classList.remove("--hidden");
        else
            document.querySelector(".admin-container[data-csr='home']").classList.remove("--hidden");
    }

    renderPage(currentPage);
    let csr_toggle = document.querySelectorAll(".csr-toggle");
    csr_toggle.forEach(csr => {
        csr.addEventListener('click', e => {
            // Chặn reload lại trang
            e.preventDefault();
            currentPage = csr.dataset.csr;
            urlParams.set("page", currentPage);
            // Đổi URL nhưng không reload lại trang
            history.pushState({}, null, "?page="+currentPage);
            renderPage(currentPage);
        });
    })
}

export default runCSR;