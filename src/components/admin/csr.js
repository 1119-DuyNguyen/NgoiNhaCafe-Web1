function runCSR() {
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

    // Chức năng chọn tất cả cho từng trang

    availablePages.forEach(elem => {
        let select_all = document.querySelector(`[data-csr='${elem}'] .select-all`);
        let check_all = document.querySelector(`[data-csr='${elem}'] .check-all`);
        let checkboxes = document.querySelectorAll(`[data-csr='${elem}'] .user-checkbox`);

        if (select_all !== null) { // tồn tại
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
            select_all.addEventListener('click', e => {
                checkAllCheckbox();
            })

            check_all.addEventListener('click', e => {
                checkAllCheckbox();
            })

            checkboxes.forEach(checkbox => { // nếu check tất cả checkbox hoặc bỏ check 1 trong tất cả checkbox đã check
                checkbox.addEventListener('change', e => {
                    let checkboxs_checked = document.querySelectorAll(`[data-csr='${elem}'] .user-checkbox:checked`)
                    if (checkbox.checked) {
                        if (checkboxs_checked.length == checkboxes.length) check_all.checked = true;
                    } else {
                        check_all.checked = false;
                    }
                })
            })
        }
    })
    
}

export default runCSR;