import { dataImgs, dataUsers } from './database/data.js';
import * as slider from './components/slider.js';
import * as header from './components/header.js';
import * as listProduct from './components/listProduct.js';
import * as homeProduct from './components/homeProduct.js';
import { toast } from './components/toast.js';
import { productInfo } from './components/productInfo.js';

header.run();
slider.onLoad();
listProduct.run(dataImgs);
homeProduct.run(dataImgs);
