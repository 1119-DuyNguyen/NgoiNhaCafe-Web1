import { dataImgs, dataUsers } from './database/data.js';
import * as slider from './components/slider.js';
import * as header from './components/header.js';
import * as listProduct from './components/listProduct.js';
import * as homeProduct from './components/homeProduct.js';
import { toast } from './components/toast.js';
import { productInfo } from './components/productInfo.js';
import * as display from './library/display.js';
import * as formSearch from './components/formSearch.js';

//------------dành cho trang user

//---- comment dòng display sẽ hiện trang để làm việc
//display.closeDisplay(document.getElementById('user-page'));
header.run();
slider.onLoad();
listProduct.run(dataImgs);
homeProduct.run(dataImgs);
formSearch.openFormSearch(dataImgs);
//-----------dành cho trang admin
display.closeDisplay(document.getElementById('admin-page'));
