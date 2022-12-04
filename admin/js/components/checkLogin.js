import dataObj from "./data.js";

import { toast } from "../../src/components/toast.js";

function checkLogin() {
    // thông báo đăng nhập thành công

    // kiểm tra xem user có quyền admin hay không
    if (dataObj.currentUser !== null || dataObj.currentUser == "") {
        if (currentUser.type != 'admin') window.location.href = "../";
        else {
            // nếu chưa thông báo
            if (dataObj.adminNotify === null || dataObj.adminNotify == "") {
                dataObj.data.setAdminNotify(true);
                toast({
                    title: "Xin chào!",
                    duration: 5000,
                    message: "Chào mừng <b>"+currentUser.username+"</b> đã quay trở lại",
                    type: "success"
                })
            }
        }
    } else window.location.href = "../";
}

export default checkLogin;