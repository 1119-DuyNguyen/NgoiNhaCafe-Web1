import { Data } from './database/data.js';
import * as slider from './components/slider.js';
import * as header from './components/header.js';
import * as listProduct from './components/listProduct.js';
import * as homeProduct from './components/homeProduct.js';
import { toast } from './components/toast.js';
import { productInfo } from './components/productInfo.js';
import * as registerForm from './components/registerForm.js';
import * as display from './library/display.js';
//------------dành cho trang user

//---- comment dòng display sẽ hiện trang để làm việc
//display.closeDisplay(document.getElementById('user-page'));
var data = new Data();
data.initData();
registerForm.init('#signupform');
header.run(data.getDataImgs());
slider.onLoad();
listProduct.run(data.getDataImgs());
homeProduct.run(data.getDataImgs());
//-----------dành cho trang admin
display.closeDisplay(document.getElementById('admin-page'));
