import { productInfo } from './productDetail.js';
import {
    closeDisplay,
    openDisplay,
    btnCloseId,
    closeModal,
} from '../library/display.js';
import { toast } from './toast.js';
const formSearch = document.getElementById('form-search');
/**
 *
 * @param {*} dataImgs Object
 */
export function openFormSearch(dataImgs) {
    //settup modal
    openDisplay(formSearch);
    closeModal(formSearch);
    btnCloseId(formSearch);

    const currentDataSearch = {
        data: dataImgs,
        keyword: undefined,
    };
    const optionAdvanced = {
        tag: '',
        minPrice: undefined,
        maxPrice: undefined,
    };
    //settup normal searchProduct
    const input = formSearch.querySelector('.search-input input[type=text]');
    //settup advanced searchProduct
    const adVancedSelect = formSearch.querySelector('.advanced-input select');
    const adVancedInput = formSearch.querySelectorAll(
        '.advanced-input input[type=number]'
    );
    //reset value input
    input.value = '';
    input.blur();
    adVancedInput.forEach((input) => {
        input.value = '';
        input.blur();
    });
    searchProduct(null, null, null);
    // addEvent Searching

    function searching() {
        currentDataSearch.keyword = input.value;
        currentDataSearch.data = searchProduct(
            dataImgs,
            input.value,
            optionAdvanced
        );
    }
    input.addEventListener('input', () => {
        searching();
    });

    //tag
    adVancedSelect.addEventListener('change', (e) => {
        optionAdvanced.tag = e.target.value.toLowerCase();
        searching();
    });
    //min max range
    /**
     *ngăn input không được vượt quá giá trị
     * @param {*} input
     */
    function checkValueNumberInput(input) {
        let min = input.min;
        let max = input.max;
        let value = parseInt(input.value);
        if (value > max) {
            input.value = max;
            toast({
                title: ' Đã nhập giá lớn nhất ',
                type: 'info',
                duration: 2000,
            });
        } else if (value < min) {
            input.value = min;
            toast({
                title: ' Đã nhập giá nhỏ nhất ',
                type: 'info',
                duration: 2000,
            });
        }
    }
    /**
     * Kiểm tra xem user đã điền vào min và max của formSearch chưa
     * @param {*} optionAdvanced
     * @returns boolean
     */
    function verifyRangeInput(optionAdvanced) {
        return optionAdvanced.maxPrice && optionAdvanced.minPrice;
    }
    adVancedInput.forEach((input) => {
        input.addEventListener('change', (e) => {
            e.preventDefault();

            checkValueNumberInput(e.target);
            optionAdvanced[input.name] = Number.parseInt(input.value);

            if (verifyRangeInput(optionAdvanced)) {
                // đảm bảo user đã điền đúng giá trị
                if (optionAdvanced.maxPrice >= optionAdvanced.minPrice) {
                    searching();
                } else {
                    e.target.value = optionAdvanced.minPrice;
                }
            }
        });
    });
    /**
     *Kiểm tra data có trùng với key và option
     *Thứ tự kiểm tra: tiêu đề và (tag -> number);
     * @param {*} dataImg
     * @param {*} keyword string
     * @param {*} optionAdvanced {
        tag: '', 
        minPrice: undefined,
        maxPrice: undefined,
    }
    tag mặc định ý nghĩa là "tất cả"
     * @returns boolean
     */
    function filterTitleProduct(dataImg, keyword, optionAdvanced) {
        let isAdvancedProduct = true;
        if (optionAdvanced) {
            // get data dataImg
            const price = Number.parseInt(dataImg.price);
            const tag = dataImg.tag.toLowerCase();
            //falsy value : undefined, null, NaN, 0, -0, 0n, "", false
            isAdvancedProduct = optionAdvanced.tag
                ? tag.includes(optionAdvanced.tag)
                : true;

            // nếu chưa có đủ min max thì kh cần kiểm tra
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
        // cài về mặc định nếu null
        if (!keyword || !dataImgs) {
            ulRelated.innerHTML = '';
            return;
        }

        const matchItems = dataImgs.filter((img) => {
            return filterTitleProduct(img, keyword, optionAdvanced);
        });
        //Phải xóa kết quả cũ do append li và add event productDetail
        ulRelated.innerHTML = '';
        //csr với item match được
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
            // click vào thì bật ra product info
            li.addEventListener('click', (e) => {
                e.preventDefault();
                productInfo(item.id, dataImgs);
            });
            ulRelated.appendChild(li);
        });

        return matchItems;
    }
}
