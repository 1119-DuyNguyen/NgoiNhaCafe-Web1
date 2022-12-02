import { openDisplay, btnCloseId } from '../../../../src/library/display.js';
import toppingData from '../../../../src/database/topping.json' assert { type: 'json' };
import dataObj from '../data.js';
import { Validator } from '../../../../src/library/Validator.js';

/**
 * Hàm render form (thêm, chỉnh sửa)
 * @param {string} element_id id phần tử của form
 * @param {int} type loại danh sách, mặc định là 1 (1 - sản phẩm, 2 - người dùng, 3 - đơn hàng)
 * @param {int} formType loại form, mặc định là 1 (1 - thêm, 2 - chỉnh sửa)
 * @param {int} id id người dùng || sản phẩm (chỉ yêu cầu khi render form chỉnh sửa)
 * @return void
 */
function renderForm(element_id, type = 1, formType = 1, id = 0) {
    let obj = {};
    // render form thêm phần tử với elem_id
    let form_elem = document.querySelector(element_id);
    btnCloseId(form_elem); // gán nút đóng

    if (formType == 1) {
        // nút thêm mới :)
        document
            .querySelector(element_id + '-tag')
            .addEventListener('click', () => {
                openDisplay(form_elem); // nút thêm mới - > mở popup
            });
    } else if (formType == 2) {
        // chỉnh sửa
        openDisplay(form_elem);
    }

    let submitBtn = document.querySelector(element_id + ' .submit');

    //nút gửi
    submitBtn.addEventListener('click', (e) => {
        //   e.preventDefault();
    });
    //  form_container gồm tất cả element bên trong thẻ form của form_elem
    let form_container = new Validator(element_id + '-form');
    form_container.onsubmit = (dataInputs) => {
        //  e.preventDefault();
        if (dataInputs) {
            let check = true;
            document
                .querySelectorAll(
                    element_id +
                        ' div select, ' +
                        element_id +
                        ' div input, ' +
                        element_id +
                        ' div textarea'
                )
                .forEach((e) => {
                    if (e.name == 'password') {
                        // nếu là mật khẩu
                        if (e.value.length > 0) {
                            // có set mật khẩu
                            if (e.value.length < 6) {
                                alert('Mật khẩu phải từ 6 ký tự trở lên!');
                                check = false;
                            } else obj[e.name] = e.value;
                        }
                    } else if (e.name == 'price') {
                        if (isNaN(parseInt(e.value))) {
                            alert('Giá phải là giá trị số!');
                            check = false;
                        } else obj[e.name] = parseInt(e.value);
                    } else obj[e.name] = e.value;
                });
            if (formType == 1 && check) {
                // add
                switch (type) {
                    case 1:
                        obj.id = dataObj.data.getDataImgs().length + 1;
                        dataObj.data.addImgs(obj);
                        alert('Thêm sản phẩm thành công!');
                        break;

                    case 2:
                        obj.id = dataObj.data.getDataUsers().length + 1;
                        dataObj.data.addUser(obj);
                        alert('Thêm người dùng thành công!');
                        break;
                }
            } else if (formType == 2 && check) {
                // edit
                switch (type) {
                    case 1:
                        dataObj.data.editImg(obj, id);
                        alert('Chỉnh sửa sản phẩm thành công!');
                        break;

                    case 2:
                        dataObj.data.editUser(obj, id);
                        alert('Chỉnh sửa người dùng thành công!');
                        break;

                    case 3:
                        dataObj.data.editBill(obj, id);
                        alert('Chỉnh sửa đơn hàng thành công!');
                        break;
                }
            }
            if (check) window.location.href = '';
        }
    };
    document
        .querySelector(element_id + ' form')
        .addEventListener('submit', (e) => {
            e.preventDefault();
            submitBtn.click();
        });

    //

    if (type == 1) {
        // sản phẩm
        let tag_field, elemToAdd; // chọn đúng phần tử
        if (formType == 1) {
            // add
            tag_field = document.querySelector('#product-type');
        } else {
            // edit
            tag_field = document.querySelector('#product-type-edit');
        }

        if (tag_field.length == 0) {
            // chỉ khởi tạo 1 lần duy nhất

            // Thêm danh sách tag
            let listOfTags = ["Cà phê", "Trà", "Hi-Tea"];

            listOfTags.forEach((elem) => {
                elemToAdd = document.createElement('option');
                elemToAdd.text = elem;
                elemToAdd.value = elem;
                tag_field.add(elemToAdd);
            });
        }
    }

    // thêm nội dung vào các trường có sẵn ở form chỉnh sửa

    if (formType == 2) {
        // edit
        switch (type) {
            case 1: // product
                obj = dataObj.data.getImg(id);
                document.querySelector('#product-name-edit').value = obj.title;
                document.querySelector('#product-type-edit').value = obj.tag;
                document.querySelector('#product-price-edit').value = obj.price;
                document.querySelector('#product-desc-edit').value =
                    obj.description;
                break;
            case 2: // user
                obj = dataObj.data.getUser(id);
                document.querySelector('#user-fullname-edit').value =
                    obj.fullname;
                document.querySelector('#user-name-edit').value = obj.username;
                document.querySelector('#user-address-edit').value =
                    obj.address;
                document.querySelector('#user-phonenum-edit').value = obj.phone;
                document.querySelector('#user-permission-edit').value =
                    obj.type;
                document.querySelector('#user-password-edit').value =
                    obj.password;
                break;

            case 3:
                obj = dataObj.data.getBill(id);
                document.querySelector('#order-status').value = obj.status;
                break;

            default:
                break;
        }
    } else {
        // add
    }
}

/**
 * Hàm render form chỉnh sửa phần tử của danh sách
 * @param {int} id id của phần tử
 * @param {int} type loại phần tử, mặc định là 1 (1 - sản phẩm, 2 - người dùng, 3 - đơn hàng)
 */
function renderEditForm(id, type = 1) {
    switch (type) {
        case 1:
            renderForm('#edit-product', 1, 2, id);
            break;

        case 2:
            renderForm('#edit-user', 2, 2, id);
            break;

        case 3:
            renderForm('#edit-order', 3, 2, id);
            break;
    }
}

export { renderForm, renderEditForm };
