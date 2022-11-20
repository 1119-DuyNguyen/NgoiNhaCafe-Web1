import { Data } from './database/data.js';
import * as slider from './components/slider.js';
import * as header from './components/header.js';
import * as listProduct from './components/listProduct.js';
import * as homeProduct from './components/homeProduct.js';
import { toast } from './components/toast.js';
import * as order from './components/order.js';
import { productInfo } from './components/productDetail.js';
import * as display from './library/display.js';
import * as footer from './components/footer.js';
//------------dành cho trang user

//---- comment dòng display sẽ hiện trang để làm việc
//display.closeDisplay(document.getElementById('user-page'));
var data = new Data();
data.initData();
order.init(data.getDataCart());
//order.init(data.getDataImgs());
header.run(data.getDataImgs());
slider.onLoad();
homeProduct.run(data.getDataImgs());
footer.run();
//-----------dành cho trang admin
//display.closeDisplay(document.getElementById('admin-page'));
