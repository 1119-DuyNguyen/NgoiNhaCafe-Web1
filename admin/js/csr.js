import { Data } from "../../src/database/data.js";
import { closeDisplay, openDisplay,btnCloseId, toggleDisplay } from "../../src/library/display.js";

var data = new Data();
data.initData();

let dataUsers = data.getDataUsers();
let dataImgs = data.getDataImgs();

function renderData(page = 1, type = '') {
    let html, first, last;

    // Ứng với mỗi phần tử có class managerment
    let managerments = document.querySelectorAll('.managerment');
    managerments.forEach(elem => {
        // thêm nội dung vào từng phần tử
        elem.innerHTML = `<div class="select-all">
            <input type="checkbox" class="check-all" />
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


    function renderUsers(page) { // render trang người dùng
        // tạo bảng
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
        // tính toán số phần tử để lặp trong vòng lặp for
        first = page * 10 - 10; // nếu page = 1 -> first = 0
        last = page * 10 - 1; // nếu page = 1 -> last = 9 => lặp từ 0->9
        // nếu last > số lượng người dùng -> last = index người dùng cuối danh sách
        if (last > dataUsers.length) last = dataUsers.length-1;
        for (let i = first; i <= last; i++) { // thêm hàng cho bảng
            // template string
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
                    <button class="btn btn-info edit-user" data-id="${i}"><i class="icon-pencil"></i></button>
                    <button class="btn btn-info"><i class="icon-info"></i></button>
                    <button class="btn btn-danger delete-user" data-id="${i}"><i class="icon-bin"></i></button>
                </td>
            </tr>`
        }
    
        s_users.innerHTML = html;

        // cảnh báo xóa người dùng
        document.querySelectorAll(".delete-user").forEach(elem => {
            elem.addEventListener('click', e => {
                let deleteConfirm = confirm("Bạn có muốn xóa người dùng này không?");
                if (deleteConfirm) {
                    data.removeUser(elem.dataset.id);
                    alert("Xóa người dùng thành công!");
                    window.location.href = "";
                }
            })
        })

        // Chỉnh sửa người dùng
        document.querySelectorAll(".edit-user").forEach(elem => {
            elem.addEventListener('click', e => {
                renderEditForm(elem.dataset.id, 2);
            })
        })
    }
    function renderProducts(page) { // render trang sản phẩm
        // tạo bảng
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
        // 100 99 98 97 96 95 94 93 92 91
        // tính toán số phần tử để lặp trong vòng lặp for
        // do lặp từ cuối lên đầu danh sách ->
        let maxSize = dataImgs.length - 1; // số lượng phần tử tối đa 
        first = maxSize - (page-1) * 10; // nếu sl = 99, trang 1 -> first = 99 - 0 * 10 = 99
        last = maxSize - page * 10; // -> last = 99 - 10 = 89
        
        for (let i = first; i > last; i--) { // lặp từ first -> last-1
            if (typeof dataImgs[i] == 'undefined') break; // nếu phần tử chưa được định nghĩa -> thoát
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
                    <button class="btn btn-info edit-product" data-id="${i}">
                        <span class="icon-pencil"></span>
                    </button>
                    <button class="btn btn-info">
                        <span class="icon-info"></span>
                    </button>
                    <button class="btn btn-danger delete-product" data-id="${i}">
                        <span class="icon-bin"></span>
                    </button>
                </td>
            </tr>`
        }
    
        s_products.innerHTML = html;
        
        // cảnh báo xóa sản phẩm
        document.querySelectorAll(".delete-product").forEach(elem => {
            elem.addEventListener('click', e => {
                let deleteConfirm = confirm("Bạn có muốn xóa sản phẩm này không?");
                if (deleteConfirm) {
                    data.removeImgs(elem.dataset.id);
                    alert("Xóa sản phẩm thành công!");
                    window.location.href = "";
                }
            })
        })

        // Chỉnh sửa sản phẩm
        document.querySelectorAll(".edit-product").forEach(elem => {
            elem.addEventListener('click', e => {
                renderEditForm(elem.dataset.id);
            })
        })
    }

    function renderHome() { // render trang home
        let s_home = document.querySelector(".admin-container[data-csr='home'] .card-container");

        let nOfUsers = dataUsers.length;

        s_home.innerHTML = `<div class="card yellow">
            <div class="card-info">
                <span class="number">${nOfUsers}</span>
                <p>Người đăng ký</p>
            </div>
            <a href="?page=users" class="card-btn"
                >Chi tiết <i class="icon-arrow-right"></i
            ></a>
        </div>`
        
    }

    switch (type) { // ứng với mỗi trang sẽ render trang loại đó
        case 'home':
            renderHome();
            break;
        case 'users':
            renderUsers(page);

            applyCheckboxFeature('users');

            break;

        case 'products':
            renderProducts(page);

            applyCheckboxFeature('products');

            break;
    
        default:
            renderHome();
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

function renderForm(element_id, type=1, formType = 1, id=0) {
    // render form thêm phần tử với elem_id
    let form_elem = document.querySelector(element_id);
    btnCloseId(form_elem); // gán nút đóng

    if (formType == 1) { // add
        document.querySelector(element_id+'-tag').addEventListener('click', () => {
            openDisplay(form_elem); // nút thêm mới - > mở popup
        })
    } else if (formType == 2) { // edit
        openDisplay(form_elem);
    }

    let submitBtn = document.querySelector(element_id+" .submit");

    // nút gửi
    submitBtn.addEventListener('click', e => {
        e.preventDefault();
        let obj = {};
        document.querySelectorAll(element_id + " div input, "+element_id + " div textarea").forEach(e => {
            obj[e.dataset.name] = e.value;
        })
        console.log(obj);
        if (formType == 1) { // add
            switch (type) {
                case 1:
                    data.addImgs(obj);
                    alert("Thêm sản phẩm thành công!");
                    break;
            
                case 2:
                    data.addUser(obj);
                    alert("Thêm người dùng thành công!");
                    break;
            }
        } else if (formType == 2) {
            // edit
            switch (type) {
                case 1:
                    data.editImg(obj, id);
                    alert("Chỉnh sửa sản phẩm thành công!");
                    break;
            
                case 2:
                    data.editUser(obj, id);
                    alert("Chỉnh sửa người dùng thành công!");
                    break;
            }
        }
        window.location.href = "";
    })

    document.querySelector(element_id+' form').addEventListener('submit', e => {
        e.preventDefault();
        submitBtn.click();
    });

    // thêm nội dung vào các trường có sẵn ở form chỉnh sửa
    let obj = {};
    if (formType == 2) { // edit
        switch (type) {
            case 1: // product
                obj = data.getImg(id);
                document.querySelector("#product-name-edit").value = obj.title;
                document.querySelector("#product-type-edit").value = obj.tag;
                document.querySelector("#product-price-edit").value = obj.price;
                document.querySelector("#product-desc-edit").value = obj.description;
                break;
            case 2: // user
                obj = data.getUser(id);
                document.querySelector("#user-name-edit").value = obj.username;
                document.querySelector("#user-email-edit").value = obj.email;
                document.querySelector("#user-address-edit").value = obj.address;
                document.querySelector("#user-phonenum-edit").value = obj.phone;
                document.querySelector("#user-permission-edit").value = obj.type;
                break;
        
            default:
                break;
        }
    }
}

function renderEditForm(id, type=1) {

    switch (type) {
        case 1:
            renderForm("#edit-product", 1, 2, id);
            break;
    
        case 2:
            renderForm("#edit-user", 2, 2, id);
            break;
    }
}

function runCSR() {

    // Render data

    renderData();
    renderPaginator();
    renderForm('#add-product');
    renderForm('#add-user', 2);

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