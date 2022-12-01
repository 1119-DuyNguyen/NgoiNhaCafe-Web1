import { Data } from "../../src/database/data.js";
import { closeDisplay, openDisplay,btnCloseId, toggleDisplay } from "../../src/library/display.js";
import { toast } from "../../src/components/toast.js";
import toppingData from "../../src/database/topping.json" assert {type: 'json'};
import printOrderFunction from "./printorder.js";

// Import from components
import logout from "./components/logout.js";
import renderPaginator from "./components/render/renderPaginator.js";
import renderData from "./components/render/renderData.js";
import renderManagerment from "./components/render/renderManagerment.js";
import {renderForm} from "./components/render/renderForms.js";

let data = new Data();

let numOfItemsPerPage = (data.getAdminNumOfItemsPerPage() === null) ? 9 : parseInt(data.getAdminNumOfItemsPerPage());

function runCSR() {

    // Render data khi load lần đầu
    renderManagerment(numOfItemsPerPage);
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