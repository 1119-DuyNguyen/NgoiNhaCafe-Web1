import runCSR from "./csr.js";

document.addEventListener('DOMContentLoaded', e => {
    let nav_open = document.querySelector("#nav_open");
    let nav_close = document.querySelector("#nav_close");
    let nav = document.querySelector("#nav");
    let under_nav = document.querySelector("#under-nav");

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
    
})