function toast({ title = "", message = "", type = "", duration = "" }) {
    type = type.toLowerCase();
    const toastList = document.getElementById("toast");
    if (toastList) {
        // cần fix lại links icons
        const icons = {
            success: "ti-check",
            warning: "ti-alert",
            info: "ti-info-alt",
            error: "ti-close",
        };
        const icon = icons[type];
        const delay = duration / 1000;
        var toast = document.createElement("div");

        toast.style.animation =
            "slideInLeft ease 0.3s, fadeOut linear 3s forwards";

        toast.classList.add("toast");
        toast.classList.add("toast--" + type);
        toast.innerHTML = `
    
        <div class="toast__icon">
          <i class="circle-background ${icon}">  </i>
        </div>
        <div class="toast__body">
          <h3 class="toast__title">
            ${title}
            </h3>
          <p class="toast__message">
            ${message}
    
          </p>
        </div>
        <div class="toast__close ti-close">
        </div>  `;
        toastList.appendChild(toast);
        setTimeout(function () {
            toastList.removeChild(toast);
        }, duration + 1000);
    }
}

function showSuccessToast() {
    toast({
        title: "Success",
        message: " Đăng ký thành công",
        type: "success",
        duration: 3000,
    });
}
function showErrorToast() {
    toast({
        title: "Error",
        message: "Đã có lỗi xảy ra xin vui lòng liên hệ quản trị viên",
        type: "Error",
        duration: 3000,
    });
}
