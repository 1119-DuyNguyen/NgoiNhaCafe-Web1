import { productInfo } from './productInfo.js';
import { closeDisplay, openDisplay, btnCloseId } from '../library/display.js';
import { toast } from './toast.js';
const formSearch = document.getElementById('form-search');

export function openFormSearch(dataImgs) {
    openDisplay(formSearch);
    const currentDataSearch = {
        data: dataImgs,
        keyword: undefined,
    };
    const optionAdvanced = {
        tag: '',
        minPrice: undefined,
        maxPrice: undefined,
    };
    const input = formSearch.querySelector('.search-input input[type=text]');

    input.addEventListener('input', () => {
        currentDataSearch.keyword = input.value;
        currentDataSearch.data = searchProduct(
            dataImgs,
            input.value,
            optionAdvanced
        );
    });
    const adVancedSelect = formSearch.querySelector('.advanced-input select');
    const adVancedInput = formSearch.querySelectorAll(
        '.advanced-input input[type=number]'
    );
    adVancedSelect.addEventListener('change', (e) => {
        optionAdvanced.tag = e.target.value.toLowerCase();
        searchProduct(currentDataSearch.data, input.value, optionAdvanced);
    });
    //min max range
    adVancedInput.forEach((input) => {
        input.value = '';
        input.addEventListener('change', (e) => {
            e.preventDefault();
            checkValueNumberInput(e.target);
            optionAdvanced[input.name] = Number.parseInt(input.value);
            if (verifyRangeInput(optionAdvanced)) {
                if (optionAdvanced.maxPrice > optionAdvanced.minPrice) {
                    searchProduct(
                        currentDataSearch.data,
                        currentDataSearch.keyword,
                        optionAdvanced
                    );
                } else {
                    e.target.value = optionAdvanced.minPrice;
                }
            }
        });
    });

    //tag
    //reset value input
    input.value = '';
    input.blur();
    adVancedInput.forEach((input) => {
        input.value = '';
        input.blur();
    });
    searchProduct(null, null, null);

    btnCloseId(formSearch);
    formSearch.addEventListener('click', (e) => {
        if (e.target === formSearch) {
            closeDisplay(formSearch);
        }
    });
}

function filterTitleProduct(dataImg, keyword, optionAdvanced) {
    let isAdvancedProduct = true;
    if (optionAdvanced) {
        const price = Number.parseInt(dataImg.price);
        const tag = dataImg.tag.toLowerCase();

        isAdvancedProduct = optionAdvanced.tag
            ? tag.includes(optionAdvanced.tag)
            : tag.includes('');

        if (verifyRangeInput(optionAdvanced)) {
            isAdvancedProduct =
                isAdvancedProduct &&
                price >= optionAdvanced.minPrice &&
                price <= optionAdvanced.maxPrice;
        }
    }
    const title = dataImg.title.toLowerCase();

    keyword = keyword.toLowerCase();

    return title.includes(keyword) && isAdvancedProduct;
}
function searchProduct(dataImgs, keyword, optionAdvanced) {
    const ulRelated = formSearch.querySelector(
        '.search-response .option_selections'
    );
    if (!keyword || !dataImgs) {
        ulRelated.innerHTML = '';
        return;
    }

    const matchItems = dataImgs.filter((img) => {
        return filterTitleProduct(img, keyword, optionAdvanced);
    });

    ulRelated.innerHTML = '';
    matchItems.forEach((item) => {
        var li = document.createElement('li');
        li.classList.add('option_selections_item');
        li.innerHTML = `              
        <div class="image-pack">
            <img
                class="product-image"
                src="./${item.image}"
                alt=""
            />
            <div class="buy-now">
                <span class="text-buy">
                    Mua ngay!
                </span>
            </div>
        </div>
        <div class="overview">
            <p class="overview_title">
                ${item.title}
            </p>
            <p>  ${item.price}đ</p>
        </div>
     
        <span
            class="icon-plus icon"
        ></span>
     `;
        li.addEventListener('click', (e) => {
            e.preventDefault();
            productInfo(item.title, dataImgs);
            console.log('li');
        });
        ulRelated.appendChild(li);
    });

    return matchItems;
}
function verifyRangeInput(optionAdvanced) {
    return optionAdvanced.maxPrice && optionAdvanced.minPrice;
}
function checkValueNumberInput(sender) {
    let min = sender.min;
    let max = sender.max;
    let value = parseInt(sender.value);
    if (value > max) {
        sender.value = max;
        toast({
            title: ' Đã nhập giá lớn nhất ',
            type: 'info',
            duration: 2000,
        });
    } else if (value < min) {
        sender.value = min;
        toast({
            title: ' Đã nhập giá nhỏ nhất ',
            type: 'info',
            duration: 2000,
        });
    }
}
