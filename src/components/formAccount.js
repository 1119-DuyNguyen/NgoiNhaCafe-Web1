import {
    closeDisplay,
    openDisplay,
    btnCloseId,
    closeModal,
    resetInputs,
} from '../library/display.js';
import { Validator } from '../library/Validator.js';
import { Data } from '../database/data.js';
var data = new Data();
const userLogin = document.getElementById('user-login');
const formLoginValidator = new Validator('#form-login', data.getDataUsers());

const btnLogin = userLogin.querySelector('#btnlogin');

const userRegister = document.getElementById('user-register');
var formSignupValidator = new Validator('#form-register', data.getDataUsers());
const inputsLogin = userLogin.querySelectorAll('input');
const inputsRegister =
    formSignupValidator.formElement.querySelectorAll('input');
//formAccount.openformAccount(data.getDataUsers());
let isInit = false;
function init(dataUsers) {
    if (isInit) return;
    isInit = true;
    closeModal(userLogin);
    closeModal(userRegister);
    btnCloseId(userLogin);
    //login-----------------
    btnLogin.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dataLogin = {};
        inputsLogin.forEach((input) => {
            dataLogin[input.name] = input.value;
        });
        closeDisplay(userLogin);
    });
    const linkSignUp = userLogin.querySelector('a');
    linkSignUp.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        closeDisplay(userLogin);
        resetInputs(inputsLogin);

        openDisplay(userRegister);
        btnCloseId(userRegister);
    });
    //signup----------------
    const linkLogin = userRegister.querySelector('a');

    formSignupValidator.onsubmit = function (dataInputs) {
        if (dataInputs) {
            dataInputs.type = 'user';
            var user = dataInputs;
            data.addUser(user);
        }
    };
    linkLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeDisplay(userRegister);
        openDisplay(userLogin);
        resetInputs(inputsRegister);
    });
}
export function openformAccount() {
    openDisplay(userLogin);
    resetInputs(inputsLogin);
    resetInputs(inputsRegister);
    init();
}
