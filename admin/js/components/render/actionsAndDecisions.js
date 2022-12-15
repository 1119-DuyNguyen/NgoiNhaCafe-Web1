import dataObj from "../data.js";

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
                            dataObj.data.removeUser(idToRemove);
                            break;
                        case 'products':
                            dataObj.data.removeImg(idToRemove);
                            break;
                        case 'orders':
                            dataObj.data.removeBill(idToRemove);
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

export default actionsAndDecisions;