import renderManagerment from "./renderManagerment.js";
import actionsAndDecisions from "./actionsAndDecisions.js";
import { renderEditForm } from "./renderForms.js";
import dataObj from "../data.js";
import printOrderFunction from "../../printorder.js";
/**
 * 
 * @param {int} page trang thứ mấy
 * @param {int} numOfItemsPerPage số lượng phần tử trên 1 trang
 * @param {string} type loại trang
 */
function renderData(page = 1, numOfItemsPerPage = 9, type = '') {
    let html, first, i, count;

    // Ứng với mỗi phần tử có class managerment
    renderManagerment(numOfItemsPerPage);

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

    function renderTable(type, arrToRender, page = 1) {
        let html = "", maxSize, count, first;
        switch (type) {
            case 'users':
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
                while (typeof arrToRender[i] != 'undefined' && i >= 0 && count < numOfItemsPerPage) { // thêm hàng cho bảng
                    // template string
                    html += `<tr>
                        <td>
                            <input type="checkbox" value="${i}" class="checkbox" data-type="user"/>
                        </td>
                        <td>${count+1}</td>
                        <td>${arrToRender[i].username}</td>
                        <td>${(typeof arrToRender[i].dateCreate == 'undefined') ? "" : arrToRender[i].dateCreate }</td>
                        <td>${arrToRender[i].phone}</td>
                        <td>
                            <button class="btn btn-info edit-user" data-id="${i}"><i class="icon-pencil"></i></button>
                            <button class="btn btn-danger delete-user" data-id="${i}"><i class="icon-bin"></i></button>
                        </td>
                    </tr>`
                    i++;
                    count++;
                }
                break;

            case 'products':
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
                maxSize = arrToRender.length-1; // số lượng phần tử tối đa
                first = maxSize - (page-1) * numOfItemsPerPage; // nếu sl = 90, trang 1 -> first = 90 - 0 * 9 = 90
                // 90 - 0 * 9 = 90 89 88 87 86 85 84 83 82
                // 90 - 1 * 9 = 81 80 79 88 77 76 75 74 73
                i = first;
                count = 0;
                while (typeof arrToRender[i] != 'undefined' && i >= 0 && count < numOfItemsPerPage) {
                    html += `<tr>
                        <td>
                            <input type="checkbox" value="${i}" class="checkbox" data-type="product"/>
                        </td>
                        <td>${count+1}</td>
                        <td><img src="../${arrToRender[i].image}"></td>
                        <td>${arrToRender[i].title}</td>
                        <td>
                            <div>
                                ${arrToRender[i].description}
                            </div>
                        </td>
                        <td>${arrToRender[i].price}${arrToRender[i].currency}</td>
                        <td>${arrToRender[i].tag}</td>
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
                break;

                case 'orders':
                    html = `<tr>
                        <th></th>
                        <th>STT</th>
                        <th>Ngày</th>
                        <th>Khách hàng</th>
                        <th>Giá</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>`;
                    if (arrToRender === null) arrToRender = [];
                    // 100 99 98 97 96 95 94 93 92 91
                    // tính toán số phần tử để lặp trong vòng lặp for - numOfItemsPerPage = 9
                    // do lặp từ cuối lên đầu danh sách ->
                    maxSize = arrToRender.length-1; // số lượng phần tử tối đa
                    first = maxSize - (page-1) * numOfItemsPerPage; // nếu sl = 90, trang 1 -> first = 90 - 0 * 9 = 90
                    // 90 - 0 * 9 = 90 89 88 87 86 85 84 83 82
                    // 90 - 1 * 9 = 81 80 79 88 77 76 75 74 73
                    i = first;
                    count = 0;
                    while (typeof arrToRender[i] != 'undefined' && i >= 0 && count < numOfItemsPerPage) {
                        html += `<tr>
                            <td>
                                <input type="checkbox" value="${i}" class="checkbox" data-type="order"/>
                            </td>
                            <td>${count+1}</td>
                            <td>${arrToRender[i].dateCreate}</td>
                            <td>${arrToRender[i].customer.username}</td>
                            <td>${arrToRender[i].totalprice}đ</td>
                            <td>${arrToRender[i].status}</td>
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
                        count++;
                        i--;
                    }
                    break;
        
            default:
                break;
        }
        return html;
    }

    function renderUsers(page) { // render trang người dùng
        // tạo bảng
        let s_users = document.querySelector(".admin-container[data-csr='users'] table");

        s_users.innerHTML = renderTable('users', dataObj.Users, page);

        // cảnh báo xóa người dùng
        document.querySelectorAll(".delete-user").forEach(elem => {
            elem.addEventListener('click', e => {
                let deleteConfirm = confirm("Bạn có muốn xóa người dùng này không?");
                if (deleteConfirm) {
                    dataObj.data.removeUser([elem.dataset.id]);
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
        
        s_products.innerHTML = renderTable('products', dataObj.Imgs, page);
        
        // cảnh báo xóa sản phẩm
        document.querySelectorAll(".delete-product").forEach(elem => {
            elem.addEventListener('click', e => {
                let deleteConfirm = confirm("Bạn có muốn xóa sản phẩm này không?");
                if (deleteConfirm) {
                    dataObj.data.removeImg(elem.dataset.id);
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
        
        s_orders.innerHTML = renderTable('orders', dataObj.Bills, page);
        
        function delEditPrint() {
            // cảnh báo xóa đơn hàng
            document.querySelectorAll(".delete-order").forEach(elem => {
                elem.addEventListener('click', e => {
                    let deleteConfirm = confirm("Bạn có muốn xóa đơn hàng này không?");
                    if (deleteConfirm) {
                        dataObj.data.removeBill(elem.dataset.id);
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
                    bill = dataObj.data.getDataBill()[elem.dataset.id];
                    printOrderFunction("#print-order", bill);
                })
            })
        }

        delEditPrint();

        // Lọc

        document.querySelector(".admin-container[data-csr='orders'] .managerment").innerHTML += `<div class="filter">
            <p><b>Lọc đơn hàng</b></p>
            <div>
                <span>Theo trạng thái: </span>
                <select id="status_filter">
                    <option value="">Vui lòng chọn</option>
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đã xử lý">Đã xử lý</option>
                </select>
            </div>
            <div>
                <span>Theo thời gian: </span> 
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
                
                for (let i = 0, dbill; i < dataObj.Bills.length; i++) {
                    dbill = dataObj.Bills[i];
                    dtmp = dbill.dateCreate.split("-");
                    dtmp = new Date(dtmp[2], dtmp[1] - 1, dtmp[0]);
                    
                    dbill.id = i;
                    if (dtmp.getTime() >= d1.getTime() && dtmp.getTime() <= d2.getTime())
                        dBills.push(dbill);
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

        document.getElementById("status_filter").addEventListener('change', e => {
            let statusToFilter = document.getElementById("status_filter").value;
            dBills = [];
            html = `<tr>
                <th></th>
                <th>STT</th>
                <th>Ngày</th>
                <th>Khách hàng</th>
                <th>Giá</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
            </tr>`;

            for (let i = 0, dBill; i < dataObj.Bills.length; i++) {
                dBill = dataObj.Bills[i];
                
                if (statusToFilter != "" && dBill.status == statusToFilter) {
                    dBill.id = i;
                    dBills.push(dBill);
                }
            }

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

        if (dataObj.Bills === null) dataObj.Bills = [];

        // 100 99 98 97 96 95 94 93 92 91
        // tính toán số phần tử để lặp trong vòng lặp for - numOfItemsPerPage = 9
        // do lặp từ cuối lên đầu danh sách ->
        let maxSize = dataObj.Bills.length-1; // số lượng phần tử tối đa
        first = maxSize - (page-1) * numOfItemsPerPage; // nếu sl = 90, trang 1 -> first = 90 - 0 * 9 = 90
        // 90 - 0 * 9 = 90 89 88 87 86 85 84 83 82
        // 90 - 1 * 9 = 81 80 79 88 77 76 75 74 73
        i = first;
        count = 0;
        while (typeof dataObj.Bills[i] != 'undefined' && i >= 0 && count < numOfItemsPerPage) {
            if (dataObj.Bills[i].status == "Đã xử lý")
            {
                html += `<tr>
                    <td>
                        <input type="checkbox" value="${i}" class="checkbox" data-type="order"/>
                    </td>
                    <td>${count+1}</td>
                    <td>${dataObj.Bills[i].dateCreate}</td>
                    <td>${dataObj.Bills[i].customer.username}</td>
                    <td>${dataObj.Bills[i].totalprice}đ</td>
                    <td>${dataObj.Bills[i].status}</td>
                    <td>
                        <button class="btn btn-danger delete-order_A" data-id="${i}">
                            <span class="icon-bin"></span>
                        </button>
                    </td>
                </tr>`
                count++;
            }
            i--;
        }
    
        s_orders.innerHTML = html;
        
        function del() {
            // cảnh báo xóa đơn hàng
            document.querySelectorAll(".delete-order_A").forEach(elem => {
                elem.addEventListener('click', e => {
                    let deleteConfirm = confirm("Bạn có muốn xóa đơn hàng này không?");
                    if (deleteConfirm) {
                        dataObj.data.removeBill(elem.dataset.id);
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
                
                for (let i = 0, dbill; i < dataObj.Bills.length; i++) {
                    dbill = dataObj.Bills[i];
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

        let nOfUsers = dataObj.Users.length;

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

export default renderData;