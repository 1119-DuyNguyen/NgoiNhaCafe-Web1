import { Data } from "../../src/database/data.js";
import { closeDisplay, openDisplay,btnCloseId, toggleDisplay } from "../../src/library/display.js";
import { toast } from "../../src/components/toast.js";
import toppingData from "../../src/database/topping.json" assert {type: 'json'};
import printOrderFunction from "./printorder.js";

var data = new Data();
data.initData();

let dataUsers = data.getDataUsers();
let dataImgs = data.getDataImgs();
let dataOrders = data.getDataOrders();
let dataBills = data.getDataBill();
let adminNotify = data.getAdminNotify();
let currentUser = data.getCurrentUser();

// thông báo đăng nhập thành công

// kiểm tra xem user có quyền admin hay không
if (currentUser !== null || currentUser == "") {
    if (currentUser.type != 'admin') window.location.href = "../";
    else {
        // nếu chưa thông báo
        if (adminNotify === null || adminNotify == "") {
            data.setAdminNotify(true);
            toast({
                title: "Xin chào!",
                duration: 5000,
                message: "Chào mừng <b>"+currentUser.username+"</b> đã quay trở lại",
                type: "success"
            })
        }
    }
} else window.location.href = "../";



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

    function applyCheckboxFeature(type) {
        // Hàm render chức năng check all checkbox cho từng trang
        function f1(type) {
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
            let select_all = document.querySelector(`[data-csr='${type}'] .select-all`);
            let check_all = document.querySelector(`[data-csr='${type}'] .check-all`);
            let checkboxes = document.querySelectorAll(`[data-csr='${type}'] .checkbox`);
    
            if (select_all !== null) { // tồn tại
                select_all.addEventListener('click', checkAllCheckbox, true);
                check_all.addEventListener('click', checkAllCheckbox, true);
    
                checkboxes.forEach(checkbox => { // nếu check tất cả checkbox hoặc bỏ check 1 trong tất cả checkbox đã check
                    checkbox.addEventListener('change', e => {
                        let checkboxs_checked = document.querySelectorAll(`[data-csr='${type}'] .checkbox:checked`)
                        if (checkbox.checked) {
                            if (checkboxs_checked.length == checkboxes.length) check_all.checked = true;
                        } else {
                            check_all.checked = false;
                        }
                    })
                })
            }
        }

        switch (type) {
            case 'users', 'products', 'orders', 'analytics':
                f1(type);
                break;
        
            default:
                f1('users');
                f1('products');
                f1('orders');
                f1('analytics');
                break;
        }
    }


    function renderUsers(page) { // render trang người dùng
        // tạo bảng
        let s_users = document.querySelector(".admin-container[data-csr='users'] table");
        html = `<tr>
            <th></th>
            <th>STT</th>
            <th>Tên đăng nhập</th>
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
                    <input type="checkbox" value="${i}" class="checkbox" data-type="user"/>
                </td>
                <td>${count+1}</td>
                <td>${dataUsers[i].username}</td>
                <td>${(typeof dataUsers[i].dateCreate == 'undefined') ? "" : dataUsers[i].dateCreate }</td>
                <td>${dataUsers[i].phone}</td>
                <td>
                    <button class="btn btn-info edit-user" data-id="${i}"><i class="icon-pencil"></i></button>
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
                    data.removeUser([elem.dataset.id]);
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
                    <input type="checkbox" value="${i}" class="checkbox" data-type="product"/>
                </td>
                <td>${count+1}</td>
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
                    data.removeImg(elem.dataset.id);
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
    function renderOrders(page) {
        let s_orders = document.querySelector(".admin-container[data-csr='orders'] table");

        html = `<tr>
            <th></th>
            <th>STT</th>
            <th>Ngày</th>
            <th>Khách hàng</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
        </tr>`;
        if (dataBills === null) dataBills = [];
        // 100 99 98 97 96 95 94 93 92 91
        // tính toán số phần tử để lặp trong vòng lặp for - numOfItemsPerPage = 9
        // do lặp từ cuối lên đầu danh sách ->
        let maxSize = dataBills.length-1; // số lượng phần tử tối đa
        first = maxSize - (page-1) * numOfItemsPerPage; // nếu sl = 90, trang 1 -> first = 90 - 0 * 9 = 90
        // 90 - 0 * 9 = 90 89 88 87 86 85 84 83 82
        // 90 - 1 * 9 = 81 80 79 88 77 76 75 74 73
        i = first;
        count = 0;
        while (typeof dataBills[i] != 'undefined' && i >= 0 && count < numOfItemsPerPage) {
            if (dataBills[i].status == "Đang xử lý")
                html += `<tr>
                    <td>
                        <input type="checkbox" value="${i}" class="checkbox" data-type="order"/>
                    </td>
                    <td>${count+1}</td>
                    <td>${dataBills[i].dateCreate}</td>
                    <td>${dataBills[i].customer.username}</td>
                    <td>${dataBills[i].totalprice}đ</td>
                    <td>${dataBills[i].status}</td>
                    <td>
                        <button class="btn btn-info edit-order" data-id="${i}">
                            <span class="icon-pencil"></span>
                        </button>
                        <button class="btn btn-info print-order" data-id="${i}">
                            <span class="icon-info"></span>
                        </button>
                        <button class="btn btn-danger delete-order" data-id="${i}">
                            <span class="icon-bin"></span>
                        </button>
                    </td>
                </tr>`
            i--;
            count++;
        }
    
        s_orders.innerHTML = html;
        
        function delEditPrint() {
            // cảnh báo xóa đơn hàng
            document.querySelectorAll(".delete-order").forEach(elem => {
                elem.addEventListener('click', e => {
                    let deleteConfirm = confirm("Bạn có muốn xóa đơn hàng này không?");
                    if (deleteConfirm) {
                        data.removeBill(elem.dataset.id);
                        alert("Xóa đơn hàng thành công!");
                        window.location.href = "";
                    }
                })
            })

            // Chỉnh sửa đơn hàng
            
            document.querySelectorAll(".edit-order").forEach(elem => {
                elem.addEventListener('click', e => {
                    renderEditForm(elem.dataset.id, 3);
                })
            })
            let bill;
            document.querySelectorAll(".print-order").forEach(elem => {
                elem.addEventListener('click', e => {
                    bill = data.getDataBill()[elem.dataset.id];
                    printOrderFunction("#print-order", bill);
                })
            })
        }

        delEditPrint();

        // Lọc

        document.querySelector(".admin-container[data-csr='orders'] .managerment").innerHTML += `<div class="filter">
            <p><b>Lọc đơn hàng</b></p>
            <div>
                <span>Theo thời gian</span> 
                <label name="range">từ ngày:</label>

                <input id="fromDay"
                    name="fromDay"
                    type="text" onfocus="(this.type = 'date')" />
                <label name="range">đến ngày :</label>
                <span> - </span>
                <input id="toDay"
                    name="toDay"
                    type="text" onfocus="(this.type = 'date')"/>
                <button class="btn btn-info" id="filter">Lọc</button>
            </div>
        </div>`;

        let fD,tD, dtmp, d1, d2, dBills;
        document.getElementById("filter").addEventListener('click', () => {
            dBills = [];
            fD = document.getElementById("fromDay").value;
            tD = document.getElementById("toDay").value;

            if (fD.length == 0 || tD.length == 0)
                alert("Vui lòng chọn ngày cụ thể")
            else {
                fD = fD.split("-");
                tD = tD.split("-");
                d1 = new Date(fD[0], fD[1] - 1, fD[2]);
                d2 = new Date(tD[0], tD[1] - 1, tD[2]);
                
                for (let i = 0, dbill; i < dataBills.length; i++) {
                    dbill = dataBills[i];
                    if (dbill.status == "Đang xử lý") {
                        dtmp = dbill.dateCreate.split("-");
                        dtmp = new Date(dtmp[2], dtmp[1] - 1, dtmp[0]);
                        
                        dbill.id = i;
                        if (dtmp.getTime() >= d1.getTime() && dtmp.getTime() <= d2.getTime())
                            dBills.push(dbill);
                    } 
                }

                html = `<tr>
                    <th></th>
                    <th>STT</th>
                    <th>Ngày</th>
                    <th>Khách hàng</th>
                    <th>Giá</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>`;

                for (let i = 0; i < dBills.length; i++) {
                    html += `<tr>
                        <td>
                            <input type="checkbox" value="${dBills[i].id}" class="checkbox" data-type="order"/>
                        </td>
                        <td>${i+1}</td>
                        <td>${dBills[i].dateCreate}</td>
                        <td>${dBills[i].customer.username}</td>
                        <td>${dBills[i].totalprice}đ</td>
                        <td>${dBills[i].status}</td>
                        <td>
                            <button class="btn btn-info edit-order" data-id="${dBills[i].id}">
                                <span class="icon-pencil"></span>
                            </button>
                            <button class="btn btn-info print-order" data-id="${dBills[i].id}">
                                <span class="icon-info"></span>
                            </button>
                            <button class="btn btn-danger delete-order" data-id="${dBills[i].id}">
                                <span class="icon-bin"></span>
                            </button>
                        </td>
                    </tr>`
                }
                s_orders.innerHTML = html;

                delEditPrint();
            }
        })
    }
    function renderAnalytics(page) {
        let s_orders = document.querySelector(".admin-container[data-csr='analytics'] table");

        html = `<tr>
            <th></th>
            <th>STT</th>
            <th>Ngày</th>
            <th>Khách hàng</th>
            <th>Giá</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
        </tr>`;

        if (dataBills === null) dataBills = [];

        // 100 99 98 97 96 95 94 93 92 91
        // tính toán số phần tử để lặp trong vòng lặp for - numOfItemsPerPage = 9
        // do lặp từ cuối lên đầu danh sách ->
        let maxSize = dataBills.length-1; // số lượng phần tử tối đa
        first = maxSize - (page-1) * numOfItemsPerPage; // nếu sl = 90, trang 1 -> first = 90 - 0 * 9 = 90
        // 90 - 0 * 9 = 90 89 88 87 86 85 84 83 82
        // 90 - 1 * 9 = 81 80 79 88 77 76 75 74 73
        i = first;
        count = 0;
        while (typeof dataBills[i] != 'undefined' && i >= 0 && count < numOfItemsPerPage) {
            if (dataBills[i].status == "Đã xử lý")
                html += `<tr>
                    <td>
                        <input type="checkbox" value="${i}" class="checkbox" data-type="order"/>
                    </td>
                    <td>${count+1}</td>
                    <td>${dataBills[i].dateCreate}</td>
                    <td>${dataBills[i].customer.username}</td>
                    <td>${dataBills[i].totalprice}đ</td>
                    <td>${dataBills[i].status}</td>
                    <td>
                        <button class="btn btn-danger delete-order_A" data-id="${i}">
                            <span class="icon-bin"></span>
                        </button>
                    </td>
                </tr>`
            i--;
            count++;
        }
    
        s_orders.innerHTML = html;
        
        function del() {
            // cảnh báo xóa đơn hàng
            document.querySelectorAll(".delete-order_A").forEach(elem => {
                elem.addEventListener('click', e => {
                    let deleteConfirm = confirm("Bạn có muốn xóa đơn hàng này không?");
                    if (deleteConfirm) {
                        data.removeBill(elem.dataset.id);
                        alert("Xóa đơn hàng thành công!");
                        window.location.href = "";
                    }
                })
            })
        }
        del();

        // Lọc

        document.querySelector(".admin-container[data-csr='analytics'] .managerment").innerHTML += `<div class="filter">
            <p><b>Lọc đơn hàng</b></p>
            <div>
                <span>Theo thời gian</span> 
                <label name="range">từ ngày:</label>

                <input id="fromDay_A"
                    name="fromDay_A"
                    type="text" onfocus="(this.type = 'date')" />
                <label name="range">đến ngày :</label>
                <span> - </span>
                <input id="toDay_A"
                    name="toDay_A"
                    type="text" onfocus="(this.type = 'date')"/>
                <button class="btn btn-info" id="filter_A">Lọc</button>
            </div>
        </div>`;

        let fD,tD, dtmp, d1, d2, dBills;
        document.getElementById("filter_A").addEventListener('click', () => {
            dBills = [];
            fD = document.getElementById("fromDay_A").value;
            tD = document.getElementById("toDay_A").value;

            if (fD.length == 0 || tD.length == 0)
                alert("Vui lòng chọn ngày cụ thể")
            else {
                fD = fD.split("-");
                tD = tD.split("-");
                d1 = new Date(fD[0], fD[1] - 1, fD[2]);
                d2 = new Date(tD[0], tD[1] - 1, tD[2]);
                
                for (let i = 0, dbill; i < dataBills.length; i++) {
                    dbill = dataBills[i];
                    if (dbill.status == "Đã xử lý") {
                        dtmp = dbill.dateCreate.split("-");
                        dtmp = new Date(dtmp[2], dtmp[1] - 1, dtmp[0]);
                        
                        dbill.id = i;
                        if (dtmp.getTime() >= d1.getTime() && dtmp.getTime() <= d2.getTime())
                            dBills.push(dbill);
                    } 
                }

                html = `<tr>
                    <th></th>
                    <th>STT</th>
                    <th>Ngày</th>
                    <th>Khách hàng</th>
                    <th>Giá</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>`;

                for (let i = 0; i < dBills.length; i++) {
                    html += `<tr>
                        <td>
                            <input type="checkbox" value="${dBills[i].id}" class="checkbox" data-type="order"/>
                        </td>
                        <td>${i+1}</td>
                        <td>${dBills[i].dateCreate}</td>
                        <td>${dBills[i].customer.username}</td>
                        <td>${dBills[i].totalprice}đ</td>
                        <td>${dBills[i].status}</td>
                        <td>
                            <button class="btn btn-info print-order_A" data-id="${dBills[i].id}">
                                <span class="icon-info"></span>
                            </button>
                            <button class="btn btn-danger delete-order_A" data-id="${dBills[i].id}">
                                <span class="icon-bin"></span>
                            </button>
                        </td>
                    </tr>`
                }
                s_orders.innerHTML = html;

                del();
            }
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
            actionsAndDecisions('users')
            break;

        case 'products':
            renderProducts(page);
            applyCheckboxFeature('products');
            actionsAndDecisions('products');
            break;
        case 'orders':
            renderOrders(page);
            applyCheckboxFeature('orders');
            actionsAndDecisions('orders');
            break;
        case 'analytics':
            renderAnalytics(page);
            applyCheckboxFeature('analytics');
            actionsAndDecisions('analytics');
            break;
    
        default:
            renderHome();
            renderUsers(page);
            renderProducts(page);
            renderOrders(page);
            renderAnalytics(page);
            
            applyCheckboxFeature();
            actionsAndDecisions();

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
                renderData(elem_btns[i].dataset.page, numOfItemsPerPage, type);
                elem_btns[i].classList.add("active"); // chọn btn
            })
        }
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
 * @param {int} type loại danh sách, mặc định là 1 (1 - sản phẩm, 2 - người dùng, 3 - đơn hàng)
 * @param {int} formType loại form, mặc định là 1 (1 - thêm, 2 - chỉnh sửa)
 * @param {int} id id người dùng || sản phẩm (chỉ yêu cầu khi render form chỉnh sửa)
 * @return void
 */
function renderForm(element_id, type=1, formType = 1, id=0) {
    let obj = {};
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
        
        let check = true;
        document.querySelectorAll(element_id + " div select, "+element_id + " div input, "+element_id + " div textarea").forEach(e => {
            if (e.dataset.name == 'password') // nếu là mật khẩu
            {
                obj = data.getUser(id);
                if (e.value.length > 0)
                { // có set mật khẩu
                    if (e.value.length < 6)
                    {
                        alert("Mật khẩu phải từ 6 ký tự trở lên!");
                        check = false;
                    } else obj[e.dataset.name] = e.value;
                }
            } else if (e.dataset.name == 'price') {
                if (isNaN(parseInt(e.value)))
                {
                    alert("Giá phải là giá trị số!");
                    check = false;
                } else obj[e.dataset.name] = e.value;
            } else
                obj[e.dataset.name] = e.value;
                
        })
        if (formType == 1 && check) { // add
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
        } else if (formType == 2 && check) {
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
                
                case 3:
                    data.editBill(obj, id);
                    alert("Chỉnh sửa đơn hàng thành công!");
                    break;
            }
        }
        if (check)
            window.location.href = "";
    })

    document.querySelector(element_id+' form').addEventListener('submit', e => {
        e.preventDefault();
        submitBtn.click();
    });

    // 

    if (type == 1) { // sản phẩm
        let tag_field, elemToAdd; // chọn đúng phần tử
        if (formType == 1) { // add
            tag_field = document.querySelector("#product-type");
        } else { // edit
            tag_field = document.querySelector("#product-type-edit");
        }

        if (tag_field.length == 0) { // chỉ khởi tạo 1 lần duy nhất

            // Thêm danh sách tag
            let listOfTags = Object.keys(toppingData);

            listOfTags.forEach(elem => {
                elemToAdd = document.createElement('option');
                elemToAdd.text = elem;
                elemToAdd.value = elem;
                tag_field.add(elemToAdd);
            })
        }
    }

    // thêm nội dung vào các trường có sẵn ở form chỉnh sửa
    
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
                document.querySelector("#user-fullname-edit").value = obj.fullname;
                document.querySelector("#user-name-edit").value = obj.username;
                document.querySelector("#user-address-edit").value = obj.address;
                document.querySelector("#user-phonenum-edit").value = obj.phone;
                document.querySelector("#user-permission-edit").value = obj.type;
                break;

            case 3:
                obj = data.getBill(id);
                document.querySelector("#order-status").value = obj.status;
                break;
        
            default:
                break;
        }
    } else { // add
        
    }
}

/**
 * Hàm render form chỉnh sửa phần tử của danh sách
 * @param {int} id id của phần tử
 * @param {int} type loại phần tử, mặc định là 1 (1 - sản phẩm, 2 - người dùng, 3 - đơn hàng)
 */
function renderEditForm(id, type=1) {

    switch (type) {
        case 1:
            renderForm("#edit-product", 1, 2, id);
            break;
    
        case 2:
            renderForm("#edit-user", 2, 2, id);
            break;

        case 3:
            renderForm("#edit-order", 3, 2, id);
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
            <option value="notSelectYet" selected>-- Hành động --</option>
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
                toast({
                    title: 'Success',
                    message: 'Cập nhật thành công, đang tải lại trang',
                    type: 'success',
                    duration: 1500,
                });
                setTimeout(() => {
                    window.location.href = "";
                }, 1500);
            }
        });
    }
}

/**
 * Tính năng thực thi hàng loạt (xoá)
 * @param {string} type loại phần tử (users, products)
 */
function actionsAndDecisions(type = '') {

    function f1(selector, type) {
        // Chọn
        let btnAction = document.querySelector(selector+" .actions button");
        let decisions = document.querySelector(selector+" .decisions");
        
        btnAction.addEventListener('click', e => { // sự kiện click
            if (decisions.value == 'notSelectYet') alert("Chọn một hành động để thực thi!"); // chưa chọn sự kiện
            else if (decisions.value == 'delete') { // sự kiện delete
                let checkedCheckboxes = document.querySelectorAll(".checkbox:checked"); // chọn checkbox đã check
                if (checkedCheckboxes.length == 0) alert("Chọn ít nhất 1 phần tử để xoá!");
                else if (confirm("Bạn có muốn xoá toàn bộ phần tử đã chọn?")) {
                    // Ứng với mỗi checkbox đã chọn
                    let idToRemove = [];
                    for (let i = 0; i < checkedCheckboxes.length; i++) {
                        idToRemove.push(parseInt(checkedCheckboxes[i].value));
                    }
                    switch (type) {
                        case 'users':
                            data.removeUser(idToRemove);
                            break;
                        case 'products':
                            data.removeImg(idToRemove);
                            break;
                        case 'orders':
                            data.removeBill(idToRemove);
                            break;
                    }
                    idToRemove = [];
                    alert("Xoá các phần tử đã chọn thành công!"); // thông báo và reload lại trang
                    window.location.href = "";
                }
            }
        })
    }
    // Ứng với mỗi trang
    switch (type) {
        case 'users', 'products', 'orders':
            f1(".admin-container[data-csr='"+type+"']", type);
            break;
    
        default:
            f1(".admin-container[data-csr='users']", 'users');
            f1(".admin-container[data-csr='products']", 'products');
            f1(".admin-container[data-csr='orders']", 'orders');
            break;
    }
}

/**
 * Hàm đăng xuất
 */
function logout() {
    document.querySelector("#logout").addEventListener('click', e => {
        e.preventDefault();
        if (confirm("Bạn có muốn đăng xuất?")) {
            data.setCurrentUser("");
            data.setAdminNotify("");
            window.location.href = "../";
        }
    })
}

function runCSR() {

    // Render data khi load lần đầu
    renderManagerment();
    renderData(1, numOfItemsPerPage);
    renderPaginator(numOfItemsPerPage);
    renderForm('#add-product');
    renderForm('#add-user', 2);
    logout();

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
    'orders', 'analytics'];

    /**
     * Render trang dựa theo url (csr)
     * @param {string} currentPage trang để render
     */
    function renderPage(currentPage) {

        // Thủ tục reset
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
            // Bỏ chọn tất cả checkbox khi chuyển trang
            let checkedCheckboxes = document.querySelectorAll(".checkbox:checked, .check-all");
            checkedCheckboxes.forEach(checkbox => checkbox.checked = false);
            renderPage(currentPage);
        });
    })
}

export default runCSR;