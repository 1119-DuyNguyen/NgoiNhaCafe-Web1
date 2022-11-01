import { Data } from "../../src/database/data.js";
import { closeDisplay, openDisplay,btnCloseId, toggleDisplay } from "../../src/library/display.js";

var data = new Data();
data.initData();

let dataUsers = data.getDataUsers();
let dataImgs = data.getDataImgs();

let numOfItemsPerPage = (data.getAdminNumOfItemsPerPage() === null) ? 9 : parseInt(data.getAdminNumOfItemsPerPage());

/**
 * 
 * @param {int} page trang thứ mấy
 * @param {int} numOfItemsPerPage số lượng phần tử trên 1 trang
 * @param {string} type loại trang
 */
function renderData(page = 1, numOfItemsPerPage = 9, type = '') {
    let html, first, i, count;

    // Ứng với mỗi phần tử có class managerment
    renderManagerment();

    function applyCheckboxFeature(page) {
        // Hàm render chức năng check all checkbox cho từng trang
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
        // tính toán số phần tử để lặp trong vòng lặp for - numOfItemsPerPage = 9
        first = (page-1) * (numOfItemsPerPage); // nếu page = 1 -> first = 0
        // page = 2 => first = 2-1 * (9+1)
        i = first;
        count = 0;
        while (typeof dataUsers[i] != 'undefined' && i >= 0 && count < numOfItemsPerPage) { // thêm hàng cho bảng
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
            i++;
            count++;
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
        // tính toán số phần tử để lặp trong vòng lặp for - numOfItemsPerPage = 9
        // do lặp từ cuối lên đầu danh sách ->
        let maxSize = dataImgs.length-1; // số lượng phần tử tối đa
        first = maxSize - (page-1) * numOfItemsPerPage; // nếu sl = 90, trang 1 -> first = 90 - 0 * 9 = 90
        // 90 - 0 * 9 = 90 89 88 87 86 85 84 83 82
        // 90 - 1 * 9 = 81 80 79 88 77 76 75 74 73
        i = first;
        count = 0;
        while (typeof dataImgs[i] != 'undefined' && i >= 0 && count < numOfItemsPerPage) {
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
            i--;
            count++;
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

/**
 * Hàm render phân trang
 * @param {int} numOfItemsOnPage số lượng phần tử mỗi trang
 * @param {int} type loại (users - người dùng, products - sản phẩm, để trống - mặc định)
 * @return void
 */
function renderPaginator(numOfItemsOnPage = 9, type = '') {
    // Render paginator cho từng trang

    let html, num;
    function render(selector, type) {
        // Lấy phần tử DOM thanh các trang
        let elem = document.querySelector(selector+" .paginator_items");
        
        // Ứng với mỗi loại (type)
        let arrToProcess;
        switch (type) {
            case 'users':
                arrToProcess = dataUsers;
                break;
            case 'products':
                arrToProcess = dataImgs;
                break;
        }

        num = Math.ceil(arrToProcess.length/numOfItemsOnPage);
        html = '';
        for (let i = 1; i <= num; i++) {
            html += `<button data-page="${i}">${i}</button>`;
        }
        elem.innerHTML = html;

        let elem_btns = document.querySelectorAll(selector+" .paginator_items button");
            
        elem_btns.forEach(btn => {
            btn.addEventListener('click', e => {
                renderData(btn.dataset.page, numOfItemsPerPage, type);
            })
        });
    }
    
    
    switch (type) {
        case 'users', 'products':
            render(".admin-container[data-csr='"+type+"']", type);
            break;
    
        default:
            render(".admin-container[data-csr='users']", 'users');
            render(".admin-container[data-csr='products']", 'products');
            break;
    }
}

/**
 * Hàm render form (thêm, chỉnh sửa)
 * @param {string} element_id id phần tử của form
 * @param {int} type loại danh sách, mặc định là 1 (1 - người dùng, 2 - sản phẩm)
 * @param {int} formType loại form, mặc định là 1 (1 - thêm, 2 - chỉnh sửa)
 * @param {int} id id người dùng || sản phẩm (chỉ yêu cầu khi render form chỉnh sửa)
 * @return void
 */
function renderForm(element_id, type=1, formType = 1, id=0) {
    // render form thêm phần tử với elem_id
    let form_elem = document.querySelector(element_id);
    btnCloseId(form_elem); // gán nút đóng

    if (formType == 1) { // thêm
        document.querySelector(element_id+'-tag').addEventListener('click', () => {
            openDisplay(form_elem); // nút thêm mới - > mở popup
        })
    } else if (formType == 2) { // chỉnh sửa
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

/**
 * Hàm render form chỉnh sửa phần tử của danh sách
 * @param {int} id id của phần tử
 * @param {int} type loại phần tử, mặc định là 1 (1 - sản phẩm, 2 - người dùng)
 */
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
/**
 * Render class managerment cho toàn bộ trang
 */
function renderManagerment() {
    document.querySelectorAll('.managerment').forEach(elem => {
        elem.innerHTML = `<div class="select-all">
        <input type="checkbox" class="check-all" />
    </div>

    <div class="actions">
        <select class="decisions">
            <option selected>-- Hành động --</option>
            <option value="delete">Xóa</option>
        </select>
        <button class="btn btn-info">Thực hiện</button>
    </div>
    
    <div>
        <label>Số phần tử mỗi trang</label>
        <input type="number" min=1 max=100 class="itemsPerPage">
        <button class="btn btn-info itemsPerPage">Cập nhật</button>
    </div>`;
    })

    // code lấy giá trị từ người dùng - số lượng phần tử trên 1 trang
    let btnItemsPerPage = document.querySelectorAll('.managerment button.itemsPerPage');
    let inputItemsPerPage = document.querySelectorAll('.managerment input.itemsPerPage');
    let numOfItemsOnPage;
    for (let i = 0; i < btnItemsPerPage.length; i++) { // với mỗi nút ở mỗi trang
        inputItemsPerPage[i].value = numOfItemsPerPage; // lấy giá trị của input từng trang
        btnItemsPerPage[i].addEventListener('click', e => { // xử lý sự kiện click
            numOfItemsOnPage = parseInt(inputItemsPerPage[i].value);
            if (isNaN(numOfItemsOnPage)) alert("Phải là giá trị số nguyên");
            else if (numOfItemsOnPage < 5 || numOfItemsOnPage > 100)
                alert("Vui lòng điền số trong khoảng từ 5 -> 100");
            else {
                data.setAdminNumOfItemsPerPage(numOfItemsOnPage);
                alert("Cập nhật thành công!");
                window.location.href = "";
            }
        });
    }
}

function runCSR() {

    // Render data khi load lần đầu
    renderManagerment();
    renderData(1, numOfItemsPerPage);
    renderPaginator(numOfItemsPerPage);
    renderForm('#add-product');
    renderForm('#add-user', 2);

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

    /**
     * Render trang dựa theo url (csr)
     * @param {string} currentPage trang để render
     */
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