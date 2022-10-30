import { Validator } from '../library/Validator.js';
import { Data } from '../database/data.js';
var data = new Data();
var isInit = false;

var form;

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
