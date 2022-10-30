import { Validator } from '../library/Validator.js';
import { Data } from '../database/data.js';
var isInit = false;
var form;
var data = new Data();

export function init(selector) {
    if (isInit) return;
    isInit = true;
    form = new Validator(selector, data.getDataUsers());
    form.onsubmit = function (dataInputs) {
        if (dataInputs) {
            dataInputs.type = 'user';
            var user = dataInputs;
            data.addUser(user);
        }
    };
}
