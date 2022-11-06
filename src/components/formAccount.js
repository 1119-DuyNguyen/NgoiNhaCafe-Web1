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
const userLogin = document.getElementById('user-login');
const formLoginValidator = new Validator('#form-login');
const errorLogin = formLoginValidator.formElement.querySelector('.error-login');

const userRegister = document.getElementById('user-register');
var formSignupValidator = new Validator('#form-register');
const inputsLogin = userLogin.querySelectorAll('input');
const inputsRegister =
    formSignupValidator.formElement.querySelectorAll('input');
//formAccount.openformAccount(data.getDataUsers());
let isInit = false;
function init(dataUsers) {
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
                const messageName =
                    'Chào mừng ' +
                    user.username.toUpperCase() +
                    ' quay trở lại';
                switch (user.type) {
                    case 'user': {
                        toast({
                            title: 'Đăng nhập thành công',
                            message: messageName,
                            type: 'success',
                            duration: 3000,
                        });
                        closeDisplay(userLogin);

                        break;
                    }
                    case 'admin': {
                        // từ admin quay lại trang chủ vẫn còn popup
                        //closeDisplay(userLogin);
                        window.location.replace('admin/index.html');
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
            data.addUser(user);
            Validator.prototype.dataUsers.push(user);
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
    openDisplay(userLogin);
    formSignupValidator.resetForm();
    formLoginValidator.resetForm();
    errorLogin.textContent = '';
    Validator.prototype.dataUsers = data.getDataUsers();
    init();
}
