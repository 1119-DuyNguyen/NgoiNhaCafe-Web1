export function onLoad() {
    const slider = document.querySelector('#slider');

    let positionX = 0;
    let index = 0;

    if (slider.offsetWidth > 768) {
        slider.innerHTML = `
    <span class="icl icon-circle-left"></span>
    <ul class="slider-dots">
        <div class="icon-minus active" data-index="0"></div>
        <div class="icon-minus " data-index="1"></div>
        <div class="icon-minus " data-index="2"></div>
    </ul>
    <div class="slider-pictures">
        <div class="slider-main">
            <div class="slider-picture-item">
                <img src="./public/img/slider_1.webp" alt="" />
            </div>
            <div class="slider-picture-item">
                <img src="./public/img/slider_2.webp" alt="" />
            </div>
            <div class="slider-picture-item">
                <img src="./public/img/slider_3.webp" alt="" />
            </div>
        </div>
    </div>
    <span class="icl icon-circle-right"></span>`;
    } else {
        slider.innerHTML = `
    <span class="icl icon-circle-left"></span>
    <ul class="slider-dots">
        <div class="icon-minus active" data-index="0"></div>
        <div class="icon-minus " data-index="1"></div>
        <div class="icon-minus " data-index="2"></div>
    </ul>
    <div class="slider-pictures">
        <div class="slider-main">
            <div class="slider-picture-item">
                <img src="./public/img/mobile_slider_1.webp" alt="" />
            </div>
            <div class="slider-picture-item">
                <img src="./public/img/mobile_slider_2.webp" alt="" />
            </div>
            <div class="slider-picture-item">
                <img src="./public/img/mobile_slider_3.webp" alt="" />
            </div>
        </div>
    </div>
    <span class="icl icon-circle-right"></span>`;
    }

    const sliderMain = document.querySelector('.slider-main');
    const sliderItems = document.querySelectorAll('.slider-picture-item img');
    const leftBtn = document.querySelector('.icon-circle-left');
    const rightBtn = document.querySelector('.icon-circle-right');
    const dotItems = document.querySelectorAll('.icon-minus');

    const sliderLength = sliderItems.length;
    let itemLength;
    sliderItems.forEach((element) => {
        element.onload = function () {
            itemLength = this.clientWidth;
        };
    });

    function run() {
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

    function handleClickSlider(direction) {
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
    run();
    window.addEventListener('resize', onLoad);
}
