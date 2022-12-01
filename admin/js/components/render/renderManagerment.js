/**
 * Render class managerment cho toàn bộ trang
 */
function renderManagerment(numOfItemsPerPage = 9) {
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

export default renderManagerment;