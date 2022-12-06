import renderManagerment from './renderManagerment.js';
import actionsAndDecisions from './actionsAndDecisions.js';
import { renderEditForm } from './renderForms.js';
import dataObj from '../data.js';
import printOrderFunction from '../../printorder.js';
import { Data } from '../../../../src/database/data.js';
var data = new Data();
/**
 *
 * @param {int} page trang thứ mấy
 * @param {int} numOfItemsPerPage số lượng phần tử trên 1 trang
 * @param {string} type loại trang
 */
function renderData(page = 1, numOfItemsPerPage = 9, type = '') {
    let html, first, i, count;

    function applyCheckboxFeature(type) {
        // Hàm render chức năng check all checkbox cho từng trang
        function f1(type) {
            function checkAllCheckbox() {
                if (check_all.checked) {
                    checkboxes.forEach((checkbox) => {
                        checkbox.checked = false;
                    });
                    check_all.checked = false;
                } else {
                    checkboxes.forEach((checkbox) => {
                        checkbox.checked = true;
                    });
                    check_all.checked = true;
                }
            }
            let select_all = document.querySelector(
                `[data-csr='${type}'] .select-all`
            );
            let check_all = document.querySelector(
                `[data-csr='${type}'] .check-all`
            );
            let checkboxes = document.querySelectorAll(
                `[data-csr='${type}'] .checkbox`
            );

            if (select_all !== null) {
                // tồn tại
                select_all.addEventListener('click', checkAllCheckbox, true);
                check_all.addEventListener('click', checkAllCheckbox, true);

                checkboxes.forEach((checkbox) => {
                    // nếu check tất cả checkbox hoặc bỏ check 1 trong tất cả checkbox đã check
                    checkbox.addEventListener('change', (e) => {
                        let checkboxs_checked = document.querySelectorAll(
                            `[data-csr='${type}'] .checkbox:checked`
                        );
                        if (checkbox.checked) {
                            if (checkboxs_checked.length == checkboxes.length)
                                check_all.checked = true;
                        } else {
                            check_all.checked = false;
                        }
                    });
                });
            }
        }

        switch (type) {
            case ('users', 'products', 'orders', 'analytics'):
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
        let html = '',
            maxSize,
            count,
            first;
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
                first = (page - 1) * numOfItemsPerPage; // nếu page = 1 -> first = 0
                // page = 2 => first = 2-1 * (9+1)
                i = first;
                count = 0;
                while (
                    typeof arrToRender[i] != 'undefined' &&
                    i >= 0 &&
                    count < numOfItemsPerPage
                ) {
                    // thêm hàng cho bảng
                    // template string
                    html += `<tr>
                        <td>
                            <input type="checkbox" value="${i}" class="checkbox" data-type="user"/>
                        </td>
                        <td>${count + 1}</td>
                        <td>${arrToRender[i].username}</td>
                        <td>${
                            typeof arrToRender[i].dateCreate == 'undefined'
                                ? ''
                                : arrToRender[i].dateCreate
                        }</td>
                        <td>${arrToRender[i].phone}</td>
                        <td>
                            <button class="btn btn-info edit-user" data-id="${i}"><i class="icon-pencil"></i></button>
                            <button class="btn btn-danger delete-user" data-id="${i}"><i class="icon-bin"></i></button>
                        </td>
                    </tr>`;
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
                maxSize = arrToRender.length - 1; // số lượng phần tử tối đa
                first = maxSize - (page - 1) * numOfItemsPerPage; // nếu sl = 90, trang 1 -> first = 90 - 0 * 9 = 90
                // 90 - 0 * 9 = 90 89 88 87 86 85 84 83 82
                // 90 - 1 * 9 = 81 80 79 88 77 76 75 74 73
                i = first;
                count = 0;
                while (
                    typeof arrToRender[i] != 'undefined' &&
                    i >= 0 &&
                    count < numOfItemsPerPage
                ) {
                    html += `<tr>
                        <td>
                            <input type="checkbox" value="${i}" class="checkbox" data-type="product"/>
                        </td>
                        <td>${count + 1}</td>
                        <td><img src="../${arrToRender[i].image}"></td>
                        <td>${arrToRender[i].title}</td>
                        <td>
                            <div>
                                ${arrToRender[i].description}
                            </div>
                        </td>
                        <td>${arrToRender[i].price}${
                        arrToRender[i].currency
                    }</td>
                        <td>${arrToRender[i].tag}</td>
                        <td>
                            <button class="btn btn-info edit-product" data-id="${i}">
                                <span class="icon-pencil"></span>
                            </button>
                            <button class="btn btn-danger delete-product" data-id="${i}">
                                <span class="icon-bin"></span>
                            </button>
                        </td>
                    </tr>`;
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
                maxSize = arrToRender.length - 1; // số lượng phần tử tối đa
                first = maxSize - (page - 1) * numOfItemsPerPage; // nếu sl = 90, trang 1 -> first = 90 - 0 * 9 = 90
                // 90 - 0 * 9 = 90 89 88 87 86 85 84 83 82
                // 90 - 1 * 9 = 81 80 79 88 77 76 75 74 73
                i = first;
                count = 0;
                while (
                    typeof arrToRender[i] != 'undefined' &&
                    i >= 0 &&
                    count < numOfItemsPerPage
                ) {
                    html += `<tr>
                            <td>
                                <input type="checkbox" value="${i}" class="checkbox" data-type="order"/>
                            </td>
                            <td>${count + 1}</td>
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
                        </tr>`;
                    count++;
                    i--;
                }
                break;

            default:
                break;
        }
        return html;
    }

    function renderUsers(page) {
        // render trang người dùng
        // tạo bảng
        let s_users = document.querySelector(
            ".admin-container[data-csr='users'] table"
        );

        s_users.innerHTML = renderTable('users', dataObj.Users, page);

        // cảnh báo xóa người dùng
        document.querySelectorAll('.delete-user').forEach((elem) => {
            elem.addEventListener('click', (e) => {
                let deleteConfirm = confirm(
                    'Bạn có muốn xóa người dùng này không?'
                );
                if (deleteConfirm) {
                    dataObj.data.removeUser([elem.dataset.id]);
                    alert('Xóa người dùng thành công!');
                    window.location.href = '';
                }
            });
        });

        // Chỉnh sửa người dùng
        document.querySelectorAll('.edit-user').forEach((elem) => {
            elem.addEventListener('click', (e) => {
                renderEditForm(elem.dataset.id, 2);
            });
        });
    }
    function renderProducts(page) {
        // render trang sản phẩm
        // tạo bảng
        let s_products = document.querySelector(
            ".admin-container[data-csr='products'] table"
        );

        s_products.innerHTML = renderTable('products', dataObj.Imgs, page);

        // cảnh báo xóa sản phẩm
        document.querySelectorAll('.delete-product').forEach((elem) => {
            elem.addEventListener('click', (e) => {
                let deleteConfirm = confirm(
                    'Bạn có muốn xóa sản phẩm này không?'
                );
                if (deleteConfirm) {
                    dataObj.data.removeImg(elem.dataset.id);
                    alert('Xóa sản phẩm thành công!');
                    window.location.href = '';
                }
            });
        });

        // Chỉnh sửa sản phẩm
        document.querySelectorAll('.edit-product').forEach((elem) => {
            elem.addEventListener('click', (e) => {
                renderEditForm(elem.dataset.id);
            });
        });
    }
    function renderOrders(page) {
        let s_orders = document.querySelector(
            ".admin-container[data-csr='orders'] table"
        );

        s_orders.innerHTML = renderTable('orders', dataObj.Bills, page);

        function delEditPrint() {
            // cảnh báo xóa đơn hàng
            document.querySelectorAll('.delete-order').forEach((elem) => {
                elem.addEventListener('click', (e) => {
                    let deleteConfirm = confirm(
                        'Bạn có muốn xóa đơn hàng này không?'
                    );
                    if (deleteConfirm) {
                        dataObj.data.removeBill(elem.dataset.id);
                        alert('Xóa đơn hàng thành công!');
                        window.location.href = '';
                    }
                });
            });

            // Chỉnh sửa đơn hàng

            document.querySelectorAll('.edit-order').forEach((elem) => {
                elem.addEventListener('click', (e) => {
                    renderEditForm(elem.dataset.id, 3);
                });
            });
            let bill;
            document.querySelectorAll('.print-order').forEach((elem) => {
                elem.addEventListener('click', (e) => {
                    bill = dataObj.data.getDataBill()[elem.dataset.id];
                    printOrderFunction('#print-order', bill);
                });
            });
        }

        delEditPrint();

        // Lọc

        document.querySelector(
            ".admin-container[data-csr='orders'] .managerment"
        ).innerHTML += `<div class="filter">
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

        let fD, tD, dtmp, d1, d2, dBills;
        document.getElementById('filter').addEventListener('click', () => {
            dBills = [];
            fD = document.getElementById('fromDay').value;
            tD = document.getElementById('toDay').value;

            if (fD.length == 0 || tD.length == 0)
                alert('Vui lòng chọn ngày cụ thể');
            else {
                fD = fD.split('-');
                tD = tD.split('-');
                d1 = new Date(fD[0], fD[1] - 1, fD[2]);
                d2 = new Date(tD[0], tD[1] - 1, tD[2]);

                for (let i = 0, dbill; i < dataObj.Bills.length; i++) {
                    dbill = dataObj.Bills[i];
                    dtmp = dbill.dateCreate.split('-');
                    dtmp = new Date(dtmp[2], dtmp[1] - 1, dtmp[0]);

                    dbill.id = i;
                    if (
                        dtmp.getTime() >= d1.getTime() &&
                        dtmp.getTime() <= d2.getTime()
                    )
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
                            <input type="checkbox" value="${
                                dBills[i].id
                            }" class="checkbox" data-type="order"/>
                        </td>
                        <td>${i + 1}</td>
                        <td>${dBills[i].dateCreate}</td>
                        <td>${dBills[i].customer.username}</td>
                        <td>${dBills[i].totalprice}đ</td>
                        <td>${dBills[i].status}</td>
                        <td>
                            <button class="btn btn-info edit-order" data-id="${
                                dBills[i].id
                            }">
                                <span class="icon-pencil"></span>
                            </button>
                            <button class="btn btn-info print-order" data-id="${
                                dBills[i].id
                            }">
                                <span class="icon-info"></span>
                            </button>
                            <button class="btn btn-danger delete-order" data-id="${
                                dBills[i].id
                            }">
                                <span class="icon-bin"></span>
                            </button>
                        </td>
                    </tr>`;
                }
                s_orders.innerHTML = html;

                delEditPrint();
            }
        });

        document
            .getElementById('status_filter')
            .addEventListener('change', (e) => {
                let statusToFilter =
                    document.getElementById('status_filter').value;
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

                    if (
                        statusToFilter != '' &&
                        dBill.status == statusToFilter
                    ) {
                        dBill.id = i;
                        dBills.push(dBill);
                    }
                }

                for (let i = 0; i < dBills.length; i++) {
                    html += `<tr>
                    <td>
                        <input type="checkbox" value="${
                            dBills[i].id
                        }" class="checkbox" data-type="order"/>
                    </td>
                    <td>${i + 1}</td>
                    <td>${dBills[i].dateCreate}</td>
                    <td>${dBills[i].customer.username}</td>
                    <td>${dBills[i].totalprice}đ</td>
                    <td>${dBills[i].status}</td>
                    <td>
                        <button class="btn btn-info edit-order" data-id="${
                            dBills[i].id
                        }">
                            <span class="icon-pencil"></span>
                        </button>
                        <button class="btn btn-info print-order" data-id="${
                            dBills[i].id
                        }">
                            <span class="icon-info"></span>
                        </button>
                        <button class="btn btn-danger delete-order" data-id="${
                            dBills[i].id
                        }">
                            <span class="icon-bin"></span>
                        </button>
                    </td>
                </tr>`;
                }
                s_orders.innerHTML = html;

                delEditPrint();
            });
    }
    function renderAnalytics(page) {
        let s_orders = document.querySelector(
            ".admin-container[data-csr='analytics'] table"
        );
        //header
        html = `<tr>
            <th></th>
            <th class="sort STT" onMouseOver="this.style.cursor='pointer'" onMouseOut="this.style.cursor='pointer'">Stt<span class="icon-sort-amount-asc"></span></th>
            <th>Loại sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th class="sort quantityColHead" onMouseOver="this.style.cursor='pointer'" onMouseOut="this.style.cursor='pointer'">Số lượng <span class="icon-sort-amount-asc"></span></th>
            <th class="sort priceColHead" onMouseOver="this.style.cursor='pointer'" onMouseOut="this.style.cursor='pointer'">Tổng tiền <span class="icon-sort-amount-asc"></span></th>
        </tr>`;

        // Nếu có ít nhất 1 bill
        if (dataObj.data.getDataBill().length > 0) {

            // tạo tag select để lọc theo tag sản phẩm
            // tạo listBill để lấy data từ cái bill ra

            const selectTag = document.querySelector('.filter-product-tag');
            selectTag.innerHTML = `<span>Theo loại sản phẩm: </span>`;
            selectTag.innerHTML += `<select name="tag-filter" id="tag-filter">
            <option value="undone" >-- Tất cả --</option>`;
            const selecttag = document.querySelector('#tag-filter');
            if (dataObj.Bills === null) dataObj.Bills = [];
            var listBill = data.getDataBill();
            console.log(listBill);

            if (!Array.isArray(listBill) || listBill.length < 1) {
                listBill = [];
                html += '<tr colspan="7">Chưa có khách mua hàng </tr>';
            } else {
                listBill=listBill.filter((bill)=>{
                    return bill.status==="Đã xử lý";
                })
                // cartFilter giúp lọc những cart trùng ra ngoài
                var cartFilter = [];
                listBill.forEach((billElement) => {
                    var carts = billElement.cart;

                    carts.forEach((cart) => {
                        var getCartObject = {};

                        // price của cart đã bao gồm giá tiền + size
                        getCartObject.size = cart.size;
                        getCartObject.id = cart.id;
                        getCartObject.tag = cart.tag;
                        getCartObject.quantity = cart.quantity;
                        getCartObject.price = cart.price;
                        getCartObject.title = cart.title;
                        var isDuplicate = false;
                        var isDuplicateTag = false;
                        // lặp xem có bị trùng không
                        for (var i = 0; i < cartFilter.length; ++i) {
                            if (cartFilter[i].id === cart.id) {
                                cartFilter[i].quantity =
                                    parseInt(cartFilter[i].quantity) +
                                    parseInt(cart.quantity);
                                isDuplicate = true;
                            }
                            if (cartFilter[i].tag === cart.tag) {
                                isDuplicateTag = true;
                            }
                        }
                        if (!isDuplicate) {
                            cartFilter.push(getCartObject);
                        }
                        if (!isDuplicateTag) {
                            selecttag.innerHTML += `<option value="${getCartObject.tag}">${getCartObject.tag}</option>`;
                        }
                    });
                });

                // if (dataObj.Bills) {
                //     billArr.push({
                //         id: listBill[0].cart[0].id,
                //         tag: listBill[0].cart[0].tag,
                //         title: listBill[0].cart[0].title,
                //         price: listBill[0].cart[0].price,
                //         size: listBill[0].cart[0].size,
                //         quantity: listBill[0].cart[0].quantity,
                //     });
                // }
                // lọc ra những cái cart
                //     listBill.forEach((BElement) => {});
                //     listBill.forEach((BElement) => {
                //         var isDuplicate;
                //         var dup;
                //         billArr.forEach((element) => {
                //             element.cart.forEach((element2) => {
                //                 console.log(BElement.title, element2.title);
                //                 dup = element2;
                //                 if (
                //                     element2.id == BElement.id &&
                //                     listBill[0].cart[0] != element2
                //                 ) {
                //                     isDuplicate = true;
                //                     let a = parseInt(BElement.quantity);
                //                     let b = parseInt(dup.quantity);
                //                     let c = a + b;
                //                     BElement.quantity = c;
                //                 } else {
                //                     isDuplicate = false;
                //                 }
                //             });
                //             if (isDuplicate == false) {
                //                 console.log('Push');
                //                 billArr.push({
                //                     id: dup.id,
                //                     tag: dup.tag,
                //                     title: dup.title,
                //                     price: dup.price,
                //                     size: dup.size,
                //                     quantity: dup.quantity,
                //                 });
                //             }
                //         });
                //     });
                // }

                // 100 99 98 97 96 95 94 93 92 91
                // tính toán số phần tử để lặp trong vòng lặp for - numOfItemsPerPage = 9
                // do lặp từ cuối lên đầu danh sách ->
                let maxSize = dataObj.Bills.length - 1; // số lượng phần tử tối đa
                first = maxSize - (page - 1) * numOfItemsPerPage; // nếu sl = 90, trang 1 -> first = 90 - 0 * 9 = 90
                // 90 - 0 * 9 = 90 89 88 87 86 85 84 83 82
                // 90 - 1 * 9 = 81 80 79 88 77 76 75 74 73
                i = first;
                count = 0;
                cartFilter.forEach((element2, index2) => {
                    let Tong = element2.price * element2.quantity;
                    html += `<tr >
                        <td>
                        </td>
                        <td>${count + 1}</td>
                        <td>${element2.tag}</td>
                        <td>${element2.title}</td>
                        <td>${element2.price}</td>
                        <td class="quantityCol">${element2.quantity}</td>
                        <td class="priceCol">${Tong}</td>
                    </tr>`;
                    count++;
                    i--;
                });
            }
            s_orders.innerHTML = html;
            sortTable();

            //hàm sort dữ liệu trên bảng
            function sortTable() {
                const sort = document.querySelectorAll('.sort');
                var inSort = 0;
                sort.forEach((element) => {
                    element.addEventListener('click', () => {
                        if (inSort == 0) {
                            if (element.classList.contains('quantityColHead')) {
                                sortTable(5, 1);
                            }
                            if (element.classList.contains('priceColHead')) {
                                sortTable(6, 1);
                            }
                            if (element.classList.contains('STT')) {
                                sortTable(1, 1);
                            }
                            inSort = 1;
                        } else if (inSort == 1) {
                            if (element.classList.contains('quantityColHead')) {
                                sortTable(5, 0);
                            }
                            if (element.classList.contains('priceColHead')) {
                                sortTable(6, 0);
                            }
                            if (element.classList.contains('STT')) {
                                sortTable(1, 0);
                            }
                            inSort = 0;
                        }
                    });
                });
                function sortTable(classSort, inSort) {
                    var table, rows, switching, i, x, y, shouldSwitch;
                    table = document.querySelector('.statistics');
                    switching = true;
                    while (switching) {
                        switching = false;
                        rows = table.rows;

                        for (i = 1; i < rows.length - 1; i++) {
                            shouldSwitch = false;
                            x = rows[i].getElementsByTagName('td')[classSort];
                            y = rows[i + 1].getElementsByTagName('td')[classSort];
                            if (inSort == 1) {
                                if (Number(x.innerHTML) > Number(y.innerHTML)) {
                                    shouldSwitch = true;
                                    break;
                                }
                            } else {
                                if (Number(x.innerHTML) < Number(y.innerHTML)) {
                                    shouldSwitch = true;
                                    break;
                                }
                            }
                        }
                        if (shouldSwitch) {
                            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                            switching = true;
                        }
                    }
                }
            }

            // Lọc

            //lọc theo tag
            function filterTablebyTag() {
                var input, filter, table, tr, td, i, txtValue;
                input = document.getElementById('tag-filter');
                filter = input.options[input.selectedIndex].text.toUpperCase();
                table = document.querySelector('.statistics');
                tr = table.getElementsByTagName('tr');
                for (i = 0; i < tr.length; i++) {
                    td = tr[i].getElementsByTagName('td')[2];
                    if (td) {
                        txtValue = td.textContent || td.innerText;
                        if (
                            txtValue.toUpperCase().indexOf(filter) > -1 ||
                            filter == '-- TẤT CẢ --'
                        ) {
                            tr[i].style.display = '';
                        } else {
                            tr[i].style.display = 'none';
                        }
                    }
                }
            }
            //tính tổng một cột trên bảng
            function getSumCol(colIndex) {
                var table = document.querySelector('.statistics');
                var sumVal = 0;
                for (i = 1; i <= table.rows.length - 1; i++) {
                    let x = table.rows[i].cells[colIndex].innerHTML;
                    if (table.rows[i].style.display == '') {
                        sumVal += parseFloat(x);
                    }
                }
                if (colIndex == 5) {
                    document.querySelector('.display-filter-result').innerHTML = '';
                    document.querySelector('.display-filter-result').innerHTML +=
                        `Tổng số lượng:  ` + sumVal + `<br>`;
                }
                if (colIndex == 6) {
                    document.querySelector('.display-filter-result').innerHTML +=
                        `Tổng số tiền:  ` + sumVal + `đ`;
                }
            }
            getSumCol(5);
            getSumCol(6);
            selecttag.addEventListener('change', () => {
                filterTablebyTag();
                getSumCol(5);
                getSumCol(6);
            });

            document.querySelector(
                ".admin-container[data-csr='analytics'] .statistic-managerment"
            ).innerHTML += `<div class="filter">
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

            let fD, tD, dtmp, d1, d2;
            document.getElementById('filter_A').addEventListener('click', () => {
                var dBills = [];
                fD = document.getElementById('fromDay_A').value;
                tD = document.getElementById('toDay_A').value;
                var html = `<tr>
                <th></th>
                <th class="sort STT" onMouseOver="this.style.cursor='pointer'" onMouseOut="this.style.cursor='pointer'">Stt<span class="icon-sort-amount-asc"></span></th>
                <th>Loại sản phẩm</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th class="sort quantityColHead" onMouseOver="this.style.cursor='pointer'" onMouseOut="this.style.cursor='pointer'">Số lượng <span class="icon-sort-amount-asc"></span></th>
                <th class="sort priceColHead" onMouseOver="this.style.cursor='pointer'" onMouseOut="this.style.cursor='pointer'">Tổng tiền <span class="icon-sort-amount-asc"></span></th>
            </tr>`;
                if (fD.length == 0 || tD.length == 0)
                    alert('Vui lòng chọn ngày cụ thể');
                else {
                    fD = fD.split('-');
                    tD = tD.split('-');
                    d1 = new Date(fD[0], fD[1] - 1, fD[2]);
                    d2 = new Date(tD[0], tD[1] - 1, tD[2]);

                    s_orders.innerHTML = '';

                    for (let i = 0; i < listBill.length; i++) {
                        listBill=listBill.filter((bill)=>{
                            return bill.status==="Đã xử lý";
                        })
                        var dbill = listBill[i];
                        dtmp = dbill.dateCreate.split('-');
                        dtmp = new Date(dtmp[2], dtmp[1] - 1, dtmp[0]);

                        dbill.id = i;
                        if (
                            dtmp.getTime() >= d1.getTime() &&
                            dtmp.getTime() <= d2.getTime()
                        )
                            dBills.push(dbill);
                    }
                    var cartFilter = [];
                    dBills.forEach((billElement) => {
                        var carts = billElement.cart;

                        carts.forEach((cart) => {
                            var getCartObject = {};

                            // price của cart đã bao gồm giá tiền + size
                            getCartObject.size = cart.size;
                            getCartObject.id = cart.id;
                            getCartObject.tag = cart.tag;
                            getCartObject.quantity = cart.quantity;
                            getCartObject.price = cart.price;
                            getCartObject.title = cart.title;
                            var isDuplicate = false;
                            // lặp xem có bị trùng không
                            for (var i = 0; i < cartFilter.length; ++i) {
                                if (cartFilter[i].id === cart.id) {
                                    cartFilter[i].quantity =
                                        parseInt(cartFilter[i].quantity) +
                                        parseInt(cart.quantity);
                                    isDuplicate = true;
                                }
                            }
                            if (!isDuplicate) {
                                cartFilter.push(getCartObject);
                            }
                        });
                    });
                }
                console.log(cartFilter);
                let count = 0;
                cartFilter.forEach((element2) => {
                    let Tong = element2.price * element2.quantity;

                    html += `<tr >
                                <td>
                                </td>
                                <td>${count + 1}</td>
                                <td>${element2.tag}</td>
                                <td>${element2.title}</td>
                                <td>${element2.price}</td>
                                <td class="quantityCol">${element2.quantity}</td>
                                <td class="priceCol">${Tong}</td>
                            </tr>`;
                    count++;
                });
                s_orders.innerHTML = html;
                sortTable();
                getSumCol(5);
                getSumCol(6);
            });

        }
    }

    function renderHome() {
        // render trang home
        let s_home = document.querySelector(
            ".admin-container[data-csr='home'] .card-container"
        );

        let nOfUsers = dataObj.Users.length;

        s_home.innerHTML = `<div class="card yellow">
            <div class="card-info">
                <span class="number">${nOfUsers}</span>
                <p>Người đăng ký</p>
            </div>
            <a href="?page=users" class="card-btn"
                >Chi tiết <i class="icon-arrow-right"></i
            ></a>
        </div>`;
    }

    switch (
        type // ứng với mỗi trang sẽ render trang loại đó
    ) {
        case 'home':
            renderHome();
            break;
        case 'users':
            renderUsers(page);
            applyCheckboxFeature('users');
            actionsAndDecisions('users');
            renderManagerment(numOfItemsPerPage);
            break;

        case 'products':
            renderProducts(page);
            applyCheckboxFeature('products');
            actionsAndDecisions('products');
            renderManagerment(numOfItemsPerPage);
            break;
        case 'orders':
            renderOrders(page);
            applyCheckboxFeature('orders');
            actionsAndDecisions('orders');
            renderManagerment(numOfItemsPerPage);
            break;
        case 'analytics':
            renderAnalytics(page);
            applyCheckboxFeature('analytics');
            actionsAndDecisions('analytics');
            renderManagerment(numOfItemsPerPage);
            break;

        default:
            renderHome();
            renderUsers(page);
            renderProducts(page);
            renderOrders(page);
            renderAnalytics(page);
            renderManagerment(numOfItemsPerPage);

            applyCheckboxFeature();
            actionsAndDecisions();

            break;
    }
}

export default renderData;
