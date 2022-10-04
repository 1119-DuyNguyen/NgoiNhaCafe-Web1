import dataImgs from './database/ngoiNhaCafe.json' assert { type: 'json' };
import dataUsers from './database/user.json' assert { type: 'json' };
import * as slider from './components/slider.js';
import * as header from './components/header.js';
import { toast } from './components/toast.js';

var imgs = JSON.parse(JSON.stringify(dataImgs));
var users = JSON.parse(JSON.stringify(dataUsers));
console.log(imgs);
console.log(users);

header.run();
slider.onLoad();
