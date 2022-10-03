document.addEventListener('DOMContentLoaded', e => {
    let nav_open = document.querySelector("#nav_open");
    let nav_close = document.querySelector("#nav_close");
    let nav = document.querySelector("#nav");

    nav_open.addEventListener('click', e => {
        console.log('hello');
        nav.classList.add("opened_nav");
    })
    nav_close.addEventListener('click', e => {
        nav.classList.remove("opened_nav");
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
})