import runCSR from "./csr.js";

document.addEventListener('DOMContentLoaded', e => {
    let nav_open = document.querySelector("#nav_open");
    let nav_close = document.querySelector("#nav_close");
    let nav = document.querySelector("#nav");

    nav_open.addEventListener('click', e => {
        nav.classList.add("opened_nav");
    })
    nav_close.addEventListener('click', e => {
        nav.classList.remove("opened_nav");
    })

    runCSR();
    
})