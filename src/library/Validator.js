import { Data } from '../database/data.js';

//input có name chứa "repeat" sẽ không láy data
export function Validator(formSelector) {
    //tránh trỏ lung tung
    var _this = this;
    const formGroup = '.form-group';
    const errorSelector = '.form-message'; // thẻ span
    var currentLabelInput = '';
    var curPassword = '';

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }
    function addErrorMessage(inputElement, errorMessage) {
        var parent = getParent(inputElement, formGroup);
        if (parent) {
            var formMessage = parent.querySelector(errorSelector);
            if (errorMessage) formMessage.innerHTML = errorMessage;

            parent.classList.add('invalid');
        }
    }
    function removeErrorMessage(inputElement) {
        var parent = getParent(inputElement, formGroup);
        if (parent) {
            var formMessage = parent.querySelector(errorSelector);
            if (formMessage) formMessage.innerHTML = '';
            parent.classList.remove('invalid');
        }
    }
    var rulesCollector = {};
    var validatorRules = {
        fullname: function(value)
        {
            var regex = /[0-9!@#$%\^&?*)(+=._-]+/g
            // for(var i=0; i<value.length;++i)
            // {
            //     var character=value.charAt(i);
            //     console.log(character)
            //     if((character >= 'a' && character <= 'z') || (character >= 'A' && character <= 'Z')||character===' ')
            //          {}
            //   else return 'Họ tên không hợp lệ' 
            // }
            // return  undefined;1
            return regex.test(value) ? "Họ tên không hợp lệ" : undefined;
        },
        username: function (value) {
            var data = new Data();
            if (!data.getDataUsers()) return undefined;

            for (var user of data.getDataUsers()) {
                if (user.username === value) {
                    return 'Tài khoản đã tồn tại';
                }
            }
            return undefined;
        },
        required: function (value) {
            if (typeof value == 'string')
                return value.trim()
                    ? undefined
                    : 'Bạn chưa nhập ' + currentLabelInput;
            else {
                return value
                    ? undefined
                    : ' Bạn chưa nhập ' + currentLabelInput;
            }
        },
        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập lại email';
        },
        phone: function (value) {
            //10 so
            var regex = /^[0-9]{10}$/g;
            return regex.test(value) ? undefined : 'Số điện thoại không hợp lệ';
        },
        password: function (value) {
            if (value.length >= 6) {
                curPassword = value;
                return undefined;
            } else return `Mật khẩu phải tối thiểu 6 ký tự `;
        },
        repeatPassword: function (value) {
            return value === curPassword
                ? undefined
                : `Mật khẩu nhập lại không chính xác `;
        },
    };

    var formElement = document.querySelector(formSelector);
    _this.formElement = formElement;
    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][data-rules]');

        _this.resetForm = function () {
            var isFormValid = true;

            for (var input of inputs) {
                removeErrorMessage(input);
                input.value = '';
                input.blur();
            }
        };
        for (var input of inputs) {
            var rules = input.dataset.rules.split('|');
            for (var rule of rules) {
                var ruleInfo;
                //if rule = min:6
                if (rule.includes(':')) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }
                var validateRule = validatorRules[rule];
                if (ruleInfo) {
                    validateRule = validateRule(ruleInfo[1]);
                }
                if (Array.isArray(rulesCollector[input.name])) {
                    rulesCollector[input.name].push(validateRule);
                } else {
                    rulesCollector[input.name] = [validateRule];
                }
            }

            input.onblur = handleError;
            input.oninput = function (e) {
                removeErrorMessage(e.target);
            };
        }
        //Kiểm tra xem còn lỗi nào không
        function handleError(event) {
            var input = event.target;
            //remove special character and format string label
            currentLabelInput = getParent(input, formGroup)
                .querySelector('label')
                .textContent.toLowerCase()
                .replace(':', '');
            if (!currentLabelInput) currentLabelInput = '';
            var errorMessage;
            var rules = rulesCollector[input.name];
            for (var rule of rules) {
                errorMessage = rule(input.value);
                if (errorMessage) {
                    break;
                }
            }

            if (errorMessage) {
                addErrorMessage(input, errorMessage);
            } else {
                removeErrorMessage(input);
            }
            return errorMessage;
        }
        formElement.onsubmit = function (e) {
            e.preventDefault();
            var inputs = formElement.querySelectorAll('[name][data-rules]');

            var isFormValid = true;

            for (var input of inputs) {
                if (handleError({ target: input })) isFormValid = false;
            }

            if (isFormValid) {
                var formValues = {};
                var regexRepeat = /repeat/i;
                for (var input of inputs) {
                    if (regexRepeat.test(input.name)) {
                        continue;
                    }
                    switch (input.type) {
                        // case 'file':
                        //     {
                        //         formValues[input.name] = input.files;
                        //     }
                        //     break;
                        default: {
                            formValues[input.name] = input.value;
                        }
                    }
                }
                //get data / submit action
                if (_this.onsubmit) {
                    _this.onsubmit(formValues);
                } else formElement.submit();
            } else {
            }
        };
    }
}
Validator.prototype.dataUsers = [];
