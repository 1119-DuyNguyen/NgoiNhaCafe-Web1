import {
    closeDisplay,
    openDisplay,
    btnCloseId,
    closeModal,
    resetInputs,
} from '../library/display.js';
import { Validator } from '../library/Validator.js';
import { Data } from '../database/data.js';
import { toast } from './toast.js';

var data = new Data();
//elements
const userLogin = document.getElementById('user-login');
const formLoginValidator = new Validator('#form-login');
const errorLogin = formLoginValidator.formElement.querySelector('.error-login');

const userRegister = document.getElementById('user-register');
var formSignupValidator = new Validator('#form-register');
//input
const beforLoginHeaderHTML = ' <span class="icon-user"></span>';
let isInit = false;
function init() {
    if (isInit) return;
    isInit = true;
    //setup
    closeModal(userLogin);
    closeModal(userRegister);
    btnCloseId(userLogin);
    btnCloseId(userRegister);

    //login-----------------
    formLoginValidator.onsubmit = function (dataInputs) {
        if (dataInputs) {
            const dataUsers = data.getDataUsers();
            const user = dataUsers.find((user) => {
                return (
                    user.username === dataInputs.username &&
                    user.password === dataInputs.password
                );
            });
            if (user) {
                const userIcon = document.getElementById('User-icon');
                const logoutIcon = document.getElementById('user-icon-logout');
                // đăng nhập user
                closeDisplay(userIcon);
                openDisplay(logoutIcon);
                let headerMbAcount =
                    document.querySelector('.header-mb-acount');

                let headerAcount = document.querySelector('.header-acount');

                switch (user.type) {
                    case 'user': {
                        const messageName =
                            'Chào mừng ' +
                            user.username.toUpperCase() +
                            ' quay trở lại';
                        toast({
                            title: 'Đăng nhập thành công',
                            message: messageName,
                            type: 'success',
                            duration: 3000,
                        });

                        closeDisplay(userLogin);
                        data.setCurrentUser(user);
                        headerAcount.innerHTML =
                            'Chào mừng ' +
                            data.getCurrentUser().fullname +
                            ' quay lại';
                        headerMbAcount.innerHTML =
                            'Chào mừng ' +
                            data.getCurrentUser().fullname +
                            ' quay lại';
                        break;
                    }
                    case 'admin': {
                        // từ admin quay lại trang chủ vẫn còn popup
                        //closeDisplay(userLogin);
                        window.location.replace('admin/index.html');
                        data.setCurrentUser(user);
                        break;
                    }
                    default: {
                        alert('lỗi');
                    }
                }
            } else {
                errorLogin.textContent =
                    'Tên tài khoản hoặc mật khẩu không hợp lệ';
            }
        }
    };
    const linkSignUp = userLogin.querySelector('a');
    linkSignUp.addEventListener('click', (e) => {
        e.preventDefault();
        closeDisplay(userLogin);
        formLoginValidator.resetForm();
        openDisplay(userRegister);
        errorLogin.textContent = '';
    });

    //signup----------------
    const linkLogin = userRegister.querySelector('a');

    formSignupValidator.onsubmit = function (dataInputs) {
        if (dataInputs) {
            dataInputs.type = 'user';
            var user = dataInputs;
            Validator.prototype.dataUsers.push(user);
            data.addUser(user);
            const messageName =
                'Khởi tạo tài khoản ' + user.username + ' thành công ';
            toast({
                title: 'Đăng ký thành công',
                message: messageName,
                duration: 3000,
                type: 'success',
            });
            closeDisplay(userRegister);
            openDisplay(userLogin);
            formSignupValidator.resetForm();
        }
    };
    linkLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeDisplay(userRegister);
        openDisplay(userLogin);
        formSignupValidator.resetForm();
    });
}
export function openformAccount() {
    if (data.getCurrentUser()) return;
    openDisplay(userLogin);
    Validator.prototype.dataUsers = data.getDataUsers();
    formSignupValidator.resetForm();
    formLoginValidator.resetForm();
    errorLogin.textContent = '';

    init();
}
export function logoutAccount() {
    data.setCurrentUser('');
    data.setDataCart('');
    location.reload();
}
