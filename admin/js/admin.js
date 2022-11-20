import runCSR from "./csr.js";
import printOrderFunction from "./printorder.js";

document.addEventListener('DOMContentLoaded', e => {

    // Xoá class d-none (phải bật js mới có thể xử lý)
    document.querySelector('#body-content').classList.remove('d-none');

    let nav_open = document.querySelector("#nav_open");
    let nav_close = document.querySelector("#nav_close");
    let nav = document.querySelector("#nav");
    let under_nav = document.querySelector("#under-nav");

    // Sự kiện cho menu mobile
    let nav_lis = document.querySelectorAll("#nav li");

    nav_lis.forEach(elem => {
        elem.addEventListener('click', e => {
            nav.classList.toggle("opened_nav");
            under_nav.classList.toggle("opened_nav");
        })
    })
    nav_open.addEventListener('click', e => {
        nav.classList.add("opened_nav");
        under_nav.classList.add("opened_nav");
    })
    nav_close.addEventListener('click', e => {
        nav.classList.remove("opened_nav");
        under_nav.classList.remove("opened_nav");
    })
    under_nav.addEventListener('click', e => {
        nav.classList.remove("opened_nav");
        under_nav.classList.remove("opened_nav");
    })

    runCSR();
    
    printOrderFunction('#print-order');
})