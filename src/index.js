import dataImgs from './database/ngoiNhaCafe.json' assert { type: 'json' };
import dataUsers from './database/user.json' assert { type: 'json' };
import * as slider from './components/slider.js';
import * as header from './components/header.js';
import * as listProduct from './components/listProduct.js';
import * as homeProduct from './components/homeProduct.js';
import { toast } from './components/toast.js';
import { productInfo } from './components/productInfo.js';
var imgs = JSON.parse(JSON.stringify(dataImgs));
var users = JSON.parse(JSON.stringify(dataUsers));

header.run();
slider.onLoad();
listProduct.run(dataImgs);
homeProduct.run(dataImgs);
//productInfo(dataImgs[5].title, dataImgs);

