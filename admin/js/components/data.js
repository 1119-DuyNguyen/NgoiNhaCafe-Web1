import { Data } from "../../../src/database/data.js";

var data = new Data();
data.initData();

let dataObj = {};

dataObj.data = data;
dataObj.Users = data.getDataUsers();
dataObj.Imgs = data.getDataImgs();
dataObj.Orders = data.getDataOrders();
dataObj.Bills = data.getDataBill();
dataObj.adminNotify = data.getAdminNotify();
dataObj.currentUser = data.getCurrentUser();

export default dataObj;