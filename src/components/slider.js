const slider = document.querySelector('.slider');
const sliderMain = document.querySelector('.slider-main');
const sliderItems = document.querySelectorAll('.slider-picture-item');
const leftBtn = document.querySelector('.icon-circle-left');
const rightBtn = document.querySelector('.icon-circle-right');
const dotItems = document.querySelectorAll('.icon-minus');

const itemLength = sliderItems[0].offsetWidth;
const sliderLength = sliderItems.length;

let positionX = 0;
let index = 0;

export function run() {
    if (leftBtn) {
        leftBtn.onclick = function () {
            handleClickSlider(-1);
        };
    }
    if (rightBtn) {
        rightBtn.onclick = function () {
            handleClickSlider(1);
        };
    }

    if (dotItems) {
        dotItems.forEach((item) => {
            item.onclick = (e) => {
                dotItems.forEach((item) => {
                    item.classList.remove('active');
                });
                e.target.classList.add('active');
                const dotIndex = parseInt(e.target.dataset.index);
                index = dotIndex;
                positionX = -dotIndex * itemLength;
                sliderMain.style = `transform: translateX(${positionX}px)`;
            };
        });
    }
    setInterval(function () {
        handleClickSlider(1);
    }, 10000);
}

export function handleClickSlider(direction) {
    if (sliderMain && sliderItems && sliderLength && itemLength) {
        if (direction === 1) {
            index++;
            if (index > sliderLength - 1) {
                index = 0;
                positionX = itemLength;
            }
            positionX = positionX - itemLength;
            sliderMain.style = `transform: translateX(${positionX}px)`;
        } else if (direction === -1) {
            index--;
            if (index < 0) {
                index = sliderLength - 1;
                positionX = -itemLength * sliderLength;
            }
            positionX = positionX + itemLength;
            sliderMain.style = `transform: translateX(${positionX}px)`;
        }
        dotItems.forEach((item) => {
            item.classList.remove('active');
        });
        dotItems[index].classList.add('active');
    }
}
