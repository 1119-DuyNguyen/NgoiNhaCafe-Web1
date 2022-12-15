export function openDisplay(element) {
    if (element.classList.contains('--hide')) {
        element.style.animation = 'fadeIn linear 0.3s';
        element.classList.remove('--hide');
    }
}
export function closeDisplay(element) {
    if (!element.classList.contains('--hide')) {
        element.classList.add('--hide');
    }
}
export function toggleDisplay(element) {
    if (element.classList.contains('--hide')) {
        element.classList.remove('--hide');
    } else {
        element.classList.add('--hide');
    }
}
//click vào element có class= close sẽ đóng modal
export function btnCloseId(parentElement, classBtn = '.close') {
    // close icon
    const closeBtns = parentElement.querySelectorAll(classBtn);
    // const closeBtns = document.querySelectorAll('.close');
    closeBtns.forEach((closeBtn) => {
        closeBtn.addEventListener('click', () => closeDisplay(parentElement));
    });
}
//click vào ngoài content của modal thì đóng modal
export function closeModal(element) {
    element.addEventListener('click', (e) => {
        if (e.target === element) {
            closeDisplay(element);
        }
    });
}

export function resetInputs(inputs) {
    inputs.forEach((input) => {
        input.value = '';
        input.blur();
    });
}
