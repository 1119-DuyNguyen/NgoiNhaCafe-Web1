function runCSR() {
    // CSR Init

    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);

    let currentPage = '';
    if (urlParams.get("page") === null) {
        currentPage = 'home';
    } else currentPage = urlParams.get("page");

    let mainSection = document.getElementById("main");

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

        let elem = document.querySelector(`.admin-container[data-csr='${currentPage}']`);

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

    // Quản lý user

    let select_all = document.querySelector("#check-all");
    let checkboxes = document.querySelectorAll(".user-checkbox");

    select_all.addEventListener('change', e => {
        if (select_all.checked) {
            checkboxes.forEach(checkbox => {
                checkbox.checked = true;
            })
        } else {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
            })
        }
    })
}

export default runCSR;