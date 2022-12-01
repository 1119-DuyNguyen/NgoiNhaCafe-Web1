/**
 * Hàm đăng xuất
 */
function logout() {
    document.querySelector("#logout").addEventListener('click', e => {
        e.preventDefault();
        if (confirm("Bạn có muốn đăng xuất?")) {
            data.setCurrentUser("");
            data.setAdminNotify("");
            window.location.href = "../";
        }
    })
}

export default logout;