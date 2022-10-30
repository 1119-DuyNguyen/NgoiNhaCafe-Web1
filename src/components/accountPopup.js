import {
    closeDisplay,
    openDisplay,
    btnCloseId,
    closeModal,
} from '../library/display.js';

const formLogin = document.getElementById('form-login');
const btnLogin = formLogin.querySelector('#btnlogin');

const formSignup = document.getElementById('form-signup');
const btnSignup = formSignup.querySelector('#btnsignup');
//formAccount.openformAccount(data.getDataUsers());
let isInit = false;
function init() {
    if (isInit) return;
    isInit = true;
    closeModal(formLogin);
    closeModal(formSignup);
    btnCloseId(formLogin);

    //login-----------------
    const inputsLogin = formLogin.querySelectorAll('input');
    btnLogin.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dataLogin = {};
        inputsLogin.forEach((input) => {
            dataLogin[input.name] = input.value;
        });
        console.log(dataLogin);
        closeDisplay(formLogin);
    });
    const linkSignUp = formLogin.querySelector('a');
    linkSignUp.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        closeDisplay(formLogin);
        openDisplay(formSignup);
        btnCloseId(formSignup);
    });
    //signup----------------
    const inputsSignup = formSignup.querySelectorAll('input');

    const linkLogin = formSignup.querySelector('a');
    linkLogin.addEventListener('click', (e) => {
        e.preventDefault();

        closeDisplay(formSignup);
        openDisplay(formLogin);
    });
}
export function openformAccount(dataUsers) {
    openDisplay(formLogin);
    init();
}
