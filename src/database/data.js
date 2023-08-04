
let dataBillJson=[];
fetch('./bill.json')
    .then((response) => response.json())
    .then((json) => dataBillJson=json);
export function Data() {
    const keyImgs = 'dataImgs';
    const keyUsers = 'dataUsers';
    const keyOrders = 'dataOrders';
    const keyCart = 'dataCart';
    const keyBill = 'dataBill';
    const keyCurrentUser = 'currentUser';
    const keyAdminNotify = 'dataAdminNotify';
    this.getUser = function (id) {
        return this.getDataUsers()[id];
    };
    this.getImg = function (id) {
        return this.getDataImgs()[id];
    };
    this.getBill = function (id) {
        return this.getDataBill()[id];
    };
    this.editUser = function (user, id) {
        let data = this.getDataUsers();

        data[id].username = user.username;
        data[id].email = user.email;
        data[id].address = user.address;
        data[id].phone = user.phone;
        data[id].password = user.password;
        data[id].fullname = user.fullname;
        data[id].type = user.type;
        setDataUsers(data);
    };
    this.editImg = function (obj, id) {
        let data = this.getDataImgs();

        data[id].title = obj.title;
        data[id].description = obj.description;
        data[id].price = obj.price;
        data[id].tag = obj.tag;
        if (obj.image.length > 0)
            data[id].image = 'public/img/ngoiNhaCafe/default.jpg';
        setDataImgs(data);
    };
    this.removeUser = function (idToRemove) {
        let data = this.getDataUsers();
        if (!Array.isArray(idToRemove)) idToRemove = [idToRemove];
        idToRemove.forEach((id) => {
            data[id] = {};
        });
        data = data.filter((item) => {
            return Object.keys(item).length != 0;
        });
        setDataUsers(data);
    };
    this.addImgs = function (obj) {
        let data = this.getDataImgs();
        obj.currency = 'đ';
        obj.image = 'public/img/ngoiNhaCafe/default.jpg';
        data.push(obj);
        setDataImgs(data);
    };
    this.removeImg = function (idToRemove) {
        let data = this.getDataImgs();
        if (!Array.isArray(idToRemove)) idToRemove = [idToRemove];
        idToRemove.forEach((id) => {
            data[id] = {};
        });
        data = data.filter((item) => {
            return Object.keys(item).length != 0;
        });
        setDataImgs(data);
    };
    this.removeOrder = function (idToRemove) {
        let data = this.getDataOrders();
        if (!Array.isArray(idToRemove)) idToRemove = [idToRemove];
        idToRemove.forEach((id) => {
            data[id] = {};
        });
        data = data.filter((item) => {
            return Object.keys(item).length != 0;
        });
        setDataOrders(data);
    };

    var _this = this;

    this.addUser = function (user) {
        if (!user) return;
        var dataUsers = _this.getDataUsers();
        user.dateCreate = formatDateDDMMYYYY(new Date());
        dataUsers.push(user);
        setDataUsers(dataUsers);
    };
    //cart
    this.pushCart = function (dataImg) {
        if (!dataImg) return;
        var cart = _this.getDataCart();
        if (!Array.isArray(cart)) cart = [];

        dataImg.dateCreate = formatDateDDMMYYYY(new Date());
        cart.push(dataImg);
        _this.setDataCart(cart);
    };
    this.spliceCart = function (index) {
        var cart = _this.getDataCart();
        if (Array.isArray(cart)) {
            var cartDelete = cart.splice(index, 1)[0];
            _this.setDataCart(cart);
            return cartDelete;
        }
    };
    this.removeCart = function () {
        window.localStorage.removeItem(keyCart);
    };
    /*
    customer:  {username: "admin", password: "admin", fullname: "Trần Lê Huy Quyền",…}
date : "30-10-2022"
id: 6
info:  "1 x Air max 1 Just do it size 36; "
status:  "Chưa xử lý"
totalprice : 5700000
    */
    this.pushBill = function (bill) {
        if (!bill) return;

        var bills = _this.getDataBill();
        if (!Array.isArray(bills)) bills = [];

        bill.status = 'Đang xử lý';
        bill.dateCreate = formatDateDDMMYYYY(new Date());
        bill.customer = _this.getCurrentUser();
        bills.push(bill);
        _this.setDataBill(bills);
    };
    this.spliceBill = function (index) {
        var bill = _this.getDataBill();
        if (Array.isArray(bill)) {
            bill.splice(index, 1);
            _this.setDataBill(bill);
        }
    };

    this.editBill = function (obj, id) {
        let data = this.getDataBill();
        // đặt lại ngày nếu editBill
        data[id].dateCreate = formatDateDDMMYYYY(new Date());
        data[id].status = obj.status;
        this.setDataBill(data);
    };

    this.removeBill = function (idToRemove) {
        // window.localStorage.removeItem(keyBill);

        let data = this.getDataBill();
        if (!Array.isArray(idToRemove)) idToRemove = [idToRemove];
        idToRemove.forEach((id) => {
            data[id] = {};
        });
        data = data.filter((item) => {
            return Object.keys(item).length != 0;
        });
        this.setDataBill(data);
    };
    //setter
    function setDataImgs(data) {
        window.localStorage.setItem(keyImgs, JSON.stringify(data));
    }
    function setDataUsers(data) {
        window.localStorage.setItem(keyUsers, JSON.stringify(data));
    }

    function setDataOrders(data) {
        window.localStorage.setItem(keyOrders, JSON.stringify(data));
    }

    this.setAdminNotify = function (data) {
        window.localStorage.setItem(keyAdminNotify, JSON.stringify(data));
    };

    this.resetDefaut = function () {
        // setDataUsers(dataUsers);
        // setDataImgs(dataImgs);
        // setDataOrders(dataOrders);
    };
    this.setDataCart = function (data) {
        window.localStorage.setItem(keyCart, JSON.stringify(data));
    };
    this.setDataBill = function (data) {
        window.localStorage.setItem(keyBill, JSON.stringify(data));
    };
    this.setCurrentUser = function (data) {
        window.localStorage.setItem(keyCurrentUser, JSON.stringify(data));
    };
    //getter
    this.getCurrentUser = function () {
        return JSON.parse(window.localStorage.getItem(keyCurrentUser));
    };
    this.getDataImgs = function () {
        return JSON.parse(window.localStorage.getItem(keyImgs));
    };

    this.getDataUsers = function () {
        return JSON.parse(window.localStorage.getItem(keyUsers));
    };

    this.getDataOrders = function () {
        return JSON.parse(window.localStorage.getItem(keyOrders));
    };

    this.getAdminNotify = function () {
        return JSON.parse(window.localStorage.getItem(keyAdminNotify));
    };

    this.setAdminNumOfItemsPerPage = function (num) {
        window.localStorage.setItem('admin_itemsPerPage', num);
    };
    this.getAdminNumOfItemsPerPage = function () {
        let num = window.localStorage.getItem('admin_itemsPerPage');
        return num;
    };

    this.getDataCart = function () {
        return JSON.parse(window.localStorage.getItem(keyCart));
    };
    this.getDataBill = function () {
        return JSON.parse(window.localStorage.getItem(keyBill));
    };

    //init data
    this.initData = function () {
        if (!this.getDataBill()) {
            this.setDataBill(dataBillJson);
        }
        if (!this.getDataUsers()) {
            //có nên bỏ email và id không ?
            var dataUsers = [
                {
                    id: 1,
                    username: 'admin',
                    password: 'admin',
                    fullname: 'Duy2 Vy Huy',
                    address: '273 An Dương Vương, P3, Quận 5, TPHCM',
                    phone: '0566490523',
                    dateCreate: '23-11-1999',
                    type: 'admin',
                },
                {
                    id: 1,
                    username: 'user',
                    password: 'user',
                    fullname: 'user',
                    address: '273 An Dương Vương, P3, Quận 5, TPHCM',
                    phone: '0383202799',
                    dateCreate: '8-10-2022',
                    type: 'user',
                },
            ];
            setDataUsers(dataUsers);
        }
        if (!this.getDataImgs()) {
            var dataImgs = [
                {
                    title: 'Cà Phê Sữa Đá',
                    description:
                        'Cà phê Đắk Lắk nguyên chất được pha phin truyền thống kết hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.',
                    image: 'public/img/ngoiNhaCafe/CPhSa.jpg',
                    id: 1,
                    price: 29000,
                    tag: 'Cà Phê Việt Nam',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Cà Phê Sữa Nóng',
                    description:
                        'Cà phê được pha phin truyền thống kết hợp với sữa đặc tạo nên hương vị đậm đà, hài hòa giữa vị ngọt đầu lưỡi và vị đắng thanh thoát nơi hậu vị.',
                    image: 'public/img/ngoiNhaCafe/CPhSaNng.jpg',
                    id: 2,
                    price: 35000,
                    tag: 'Cà Phê Việt Nam',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Bạc Sỉu',
                    description:
                        'Bạc sỉu chính là "Ly sữa trắng kèm một chút cà phê". Thức uống này rất phù hợp những ai vừa muốn trải nghiệm chút vị đắng của cà phê vừa muốn thưởng thức vị ngọt béo ngậy từ sữa.',
                    image: 'public/img/ngoiNhaCafe/BcSu.jpg',
                    id: 3,
                    price: 29000,
                    tag: 'Cà Phê Việt Nam',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Bạc Sỉu Nóng',
                    description:
                        'Bạc sỉu chính là "Ly sữa trắng kèm một chút cà phê". Thức uống này rất phù hợp những ai vừa muốn trải nghiệm chút vị đắng của cà phê vừa muốn thưởng thức vị ngọt béo ngậy từ sữa.',
                    image: 'public/img/ngoiNhaCafe/BcSuNng.jpg',
                    id: 4,
                    price: 35000,
                    tag: 'Cà Phê Việt Nam',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Cà Phê Đen Đá',
                    description:
                        'Không ngọt ngào như Bạc sỉu hay Cà phê sữa, Cà phê đen mang trong mình phong vị trầm lắng, thi vị hơn. Người ta thường phải ngồi rất lâu mới cảm nhận được hết hương thơm ngào ngạt, phảng phất mùi cacao và cái đắng mượt mà trôi tuột xuống vòm họng.',
                    image: 'public/img/ngoiNhaCafe/CPhen.jpg',
                    id: 5,
                    price: 29000,
                    tag: 'Cà Phê Việt Nam',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Cà Phê Đen Nóng',
                    description:
                        'Không ngọt ngào như Bạc sỉu hay Cà phê sữa, Cà phê đen mang trong mình phong vị trầm lắng, thi vị hơn. Người ta thường phải ngồi rất lâu mới cảm nhận được hết hương thơm ngào ngạt, phảng phất mùi cacao và cái đắng mượt mà trôi tuột xuống vòm họng.',
                    image: 'public/img/ngoiNhaCafe/CPhenNng.jpg',
                    id: 6,
                    price: 35000,
                    tag: 'Cà Phê Việt Nam',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Cà Phê Sữa Đá Chai Fresh 250ML',
                    description:
                        'Vẫn là hương vị cà phê sữa đậm đà quen thuộc của The Coffee House nhưng khoác lên mình một chiếc áo mới tiện lợi hơn, tiết kiệm hơn phù hợp với bình thường mới, giúp bạn tận hưởng một ngày dài trọn vẹn. *Sản phẩm dùng ngon nhất trong ngày. *Sản phẩm mặc định mức đường và không đá.',
                    image: 'public/img/ngoiNhaCafe/CPhSaChaiFresh250ML.jpg',
                    id: 7,
                    price: 75000,
                    tag: 'Cà Phê Việt Nam',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Caramel Macchiato Đá',
                    description:
                        'Caramel Macchiato sẽ mang đến một sự ngạc nhiên thú vị khi vị thơm béo của bọt sữa, sữa tươi, vị đắng thanh thoát của cà phê Espresso hảo hạng và vị ngọt đậm của sốt caramel được gói gọn trong một tách cà phê.',
                    image: 'public/img/ngoiNhaCafe/CaramelMacchiato.jpg',
                    id: 8,
                    price: 49000,
                    tag: 'Cà Phê Máy',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Caramel Macchiato Nóng',
                    description:
                        'Caramel Macchiato sẽ mang đến một sự ngạc nhiên thú vị khi vị thơm béo của bọt sữa, sữa tươi, vị đắng thanh thoát của cà phê Espresso hảo hạng và vị ngọt đậm của sốt caramel được gói gọn trong một tách cà phê.',
                    image: 'public/img/ngoiNhaCafe/CaramelMacchiatoNng.jpg',
                    id: 9,
                    price: 49000,
                    tag: 'Cà Phê Máy',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Latte Đá',
                    description:
                        'Một sự kết hợp tinh tế giữa vị đắng cà phê Espresso nguyên chất hòa quyện cùng vị sữa nóng ngọt ngào, bên trên là một lớp kem mỏng nhẹ tạo nên một tách cà phê hoàn hảo về hương vị lẫn nhãn quan.',
                    image: 'public/img/ngoiNhaCafe/Latte.jpg',
                    id: 10,
                    price: 49000,
                    tag: 'Cà Phê Máy',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Latte Nóng',
                    description:
                        'Một sự kết hợp tinh tế giữa vị đắng cà phê Espresso nguyên chất hòa quyện cùng vị sữa nóng ngọt ngào, bên trên là một lớp kem mỏng nhẹ tạo nên một tách cà phê hoàn hảo về hương vị lẫn nhãn quan.',
                    image: 'public/img/ngoiNhaCafe/LatteNng.jpg',
                    id: 11,
                    price: 49000,
                    tag: 'Cà Phê Máy',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Americano Đá',
                    description:
                        'Americano được pha chế bằng cách pha thêm nước với tỷ lệ nhất định vào tách cà phê Espresso, từ đó mang lại hương vị nhẹ nhàng và giữ trọn được mùi hương cà phê đặc trưng.',
                    image: 'public/img/ngoiNhaCafe/Americano.jpg',
                    id: 12,
                    price: 39000,
                    tag: 'Cà Phê Máy',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Americano Nóng',
                    description:
                        'Americano được pha chế bằng cách pha thêm nước với tỷ lệ nhất định vào tách cà phê Espresso, từ đó mang lại hương vị nhẹ nhàng và giữ trọn được mùi hương cà phê đặc trưng.',
                    image: 'public/img/ngoiNhaCafe/AmericanoNng.jpg',
                    id: 13,
                    price: 39000,
                    tag: 'Cà Phê Máy',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Cappuccino Đá',
                    description:
                        'Capuchino là thức uống hòa quyện giữa hương thơm của sữa, vị béo của bọt kem cùng vị đậm đà từ cà phê Espresso. Tất cả tạo nên một hương vị đặc biệt, một chút nhẹ nhàng, trầm lắng và tinh tế.',
                    image: 'public/img/ngoiNhaCafe/Cappuccino.jpg',
                    id: 14,
                    price: 49000,
                    tag: 'Cà Phê Máy',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Cappuccino Nóng',
                    description:
                        'Capuchino là thức uống hòa quyện giữa hương thơm của sữa, vị béo của bọt kem cùng vị đậm đà từ cà phê Espresso. Tất cả tạo nên một hương vị đặc biệt, một chút nhẹ nhàng, trầm lắng và tinh tế.',
                    image: 'public/img/ngoiNhaCafe/CappuccinoNng.jpg',
                    id: 15,
                    price: 49000,
                    tag: 'Cà Phê Máy',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Espresso Đá',
                    description:
                        'Một tách Espresso nguyên bản được bắt đầu bởi những hạt Arabica chất lượng, phối trộn với tỉ lệ cân đối hạt Robusta, cho ra vị ngọt caramel, vị chua dịu và sánh đặc.',
                    image: 'public/img/ngoiNhaCafe/Espresso.jpg',
                    id: 16,
                    price: 45000,
                    tag: 'Cà Phê Máy',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Espresso Nóng',
                    description:
                        'Một tách Espresso nguyên bản được bắt đầu bởi những hạt Arabica chất lượng, phối trộn với tỉ lệ cân đối hạt Robusta, cho ra vị ngọt caramel, vị chua dịu và sánh đặc.',
                    image: 'public/img/ngoiNhaCafe/EspressoNng.jpg',
                    id: 17,
                    price: 39000,
                    tag: 'Cà Phê Máy',
                    currency: 'đ',
                    salePercent: '20%',
                },
                {
                    title: 'Cold Brew Sữa Tươi',
                    description:
                        'Thanh mát và cân bằng với hương vị cà phê nguyên bản 100% Arabica Cầu Đất cùng sữa tươi thơm béo cho từng ngụm tròn vị, hấp dẫn.',
                    image: 'public/img/ngoiNhaCafe/ColdBrewSaTi.jpg',
                    id: 18,
                    price: 45000,
                    tag: 'Cold Brew',
                    currency: 'đ',
                    salePercent: '15%',
                },
                {
                    title: 'Cold Brew Truyền Thống',
                    description:
                        'Tại The Coffee House, Cold Brew được ủ và phục vụ mỗi ngày từ 100% hạt Arabica Cầu Đất với hương gỗ thông, hạt dẻ, nốt sô-cô-la đặc trưng, thoang thoảng hương khói nhẹ giúp Cold Brew giữ nguyên vị tươi mới.',
                    image: 'public/img/ngoiNhaCafe/ColdBrewTruynThng.jpg',
                    id: 19,
                    price: 45000,
                    tag: 'Cold Brew',
                    currency: 'đ',
                    salePercent: '15%',
                },
                {
                    title: 'Trà Long Nhãn Hạt Sen',
                    description:
                        'Thức uống mang hương vị của nhãn, của sen, của trà Oolong đầy thanh mát cho tất cả các thành viên trong dịp Tết này. An lành, thư thái và đậm đà chính là những gì The Coffee House mong muốn gửi trao đến bạn và gia đình.',
                    image: 'public/img/ngoiNhaCafe/TrLongNhnHtSen.jpg',
                    id: 20,
                    price: 49000,
                    tag: 'Trà trái cây',
                    currency: 'đ',
                    salePercent: '15%',
                },
                {
                    title: 'Trà Đào Cam Sả - Đá',
                    description:
                        'Vị thanh ngọt của đào, vị chua dịu của Cam Vàng nguyên vỏ, vị chát của trà đen tươi được ủ mới mỗi 4 tiếng, cùng hương thơm nồng đặc trưng của sả chính là điểm sáng làm nên sức hấp dẫn của thức uống này.',
                    image: 'public/img/ngoiNhaCafe/TroCamS.jpg',
                    id: 21,
                    price: 49000,
                    tag: 'Trà trái cây',
                    currency: 'đ',
                    salePercent: '15%',
                },
                {
                    title: 'Trà Đào Cam Sả - Nóng',
                    description:
                        'Vị thanh ngọt của đào, vị chua dịu của Cam Vàng nguyên vỏ, vị chát của trà đen tươi được ủ mới mỗi 4 tiếng, cùng hương thơm nồng đặc trưng của sả chính là điểm sáng làm nên sức hấp dẫn của thức uống này.',
                    image: 'public/img/ngoiNhaCafe/TroCamSNng.jpg',
                    id: 22,
                    price: 55000,
                    tag: 'Trà trái cây',
                    currency: 'đ',
                    salePercent: '15%',
                },
                {
                    title: 'Trà Hạt Sen - Đá',
                    description:
                        'Nền trà oolong hảo hạng kết hợp cùng hạt sen tươi, bùi bùi và lớp foam cheese béo ngậy. Trà hạt sen là thức uống thanh mát, nhẹ nhàng phù hợp cho cả buổi sáng và chiều tối.',
                    image: 'public/img/ngoiNhaCafe/TrHtSen.jpg',
                    id: 23,
                    price: 49000,
                    tag: 'Trà trái cây',
                    currency: 'đ',
                    salePercent: '15%',
                },
                {
                    title: 'Trà Hạt Sen - Nóng',
                    description:
                        'Nền trà oolong hảo hạng kết hợp cùng hạt sen tươi, bùi bùi thơm ngon. Trà hạt sen là thức uống thanh mát, nhẹ nhàng phù hợp cho cả buổi sáng và chiều tối.',
                    image: 'public/img/ngoiNhaCafe/TrHtSenNng.jpg',
                    id: 24,
                    price: 55000,
                    tag: 'Trà trái cây',
                    currency: 'đ',
                    salePercent: '15%',
                },
                {
                    title: 'Trà Long Nhãn Hạt Chia',
                    description:
                        'Vị nhãn ngọt, tươi mát đặc trưng hoà quyện tinh tế cùng vị trà oolong hảo hạng và hạt chia mang đến cho bạn một thức uống không chỉ thơm ngon mà còn bổ dưỡng.',
                    image: 'public/img/ngoiNhaCafe/TrLongNhnHtChia.jpg',
                    id: 25,
                    price: 49000,
                    tag: 'Trà trái cây',
                    currency: 'đ',
                    salePercent: '15%',
                },
                {
                    title: 'Trà Long Nhãn Hạt Chia (Nóng)',
                    description:
                        'Vị nhãn ngọt, tươi mát đặc trưng hoà quyện tinh tế cùng vị trà oolong hảo hạng và hạt chia mang đến cho bạn một thức uống không chỉ thơm ngon mà còn bổ dưỡng.',
                    image: 'public/img/ngoiNhaCafe/TrLongNhnHtChiaNng.jpg',
                    id: 26,
                    price: 55000,
                    tag: 'Trà trái cây',
                    currency: 'đ',
                    salePercent: '15%',
                },
                {
                    title: 'Trà Đào Cam Sả Chai Fresh 500ML',
                    description:
                        'Với phiên bản chai fresh 500ml, thức uống "best seller" đỉnh cao mang một diện mạo tươi mới, tiện lợi, phù hợp với bình thường mới và vẫn giữ nguyên vị thanh ngọt của đào, vị chua dịu của cam vàng nguyên vỏ và vị trà đen thơm lừng ly Trà đào cam sả nguyên bản. *Sản phẩm dùng ngon nhất trong ngày. *Sản phẩm mặc định mức đường và không đá.',
                    image: 'public/img/ngoiNhaCafe/TroCamSChaiFresh500ML.jpg',
                    id: 27,
                    price: 105000,
                    tag: 'Trà trái cây',
                    currency: 'đ',
                    salePercent: '15%',
                },
                {
                    title: 'Trà Đen Macchiato',
                    description:
                        'Trà đen được ủ mới mỗi ngày, giữ nguyên được vị chát mạnh mẽ đặc trưng của lá trà, phủ bên trên là lớp Macchiato "homemade" bồng bềnh quyến rũ vị phô mai mặn mặn mà béo béo.',
                    image: 'public/img/ngoiNhaCafe/TrenMacchiato.jpg',
                    id: 28,
                    price: 55000,
                    tag: 'Trà sữa Macchiato',
                    currency: 'đ',
                    salePercent: '25%',
                },
                {
                    title: 'Hồng Trà Sữa Trân Châu',
                    description:
                        'Thêm chút ngọt ngào cho ngày mới với hồng trà nguyên lá, sữa thơm ngậy được cân chỉnh với tỉ lệ hoàn hảo, cùng trân châu trắng dai giòn có sẵn để bạn tận hưởng từng ngụm trà sữa ngọt ngào thơm ngậy thiệt đã.',
                    image: 'public/img/ngoiNhaCafe/HngTrSaTrnChu.jpg',
                    id: 29,
                    price: 55000,
                    tag: 'Trà sữa Macchiato',
                    currency: 'đ',
                    salePercent: '25%',
                },
                {
                    title: 'Hồng Trà Sữa Nóng',
                    description:
                        'Từng ngụm trà chuẩn gu ấm áp, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện.  Trà đen nguyên lá âm ấm dịu nhẹ, quyện cùng lớp sữa thơm béo khó lẫn - hương vị ấm áp chuẩn gu trà, cho từng ngụm nhẹ nhàng, ngọt dịu lưu luyến mãi nơi cuống họng.',
                    image: 'public/img/ngoiNhaCafe/HngTrSaNng.jpg',
                    id: 30,
                    price: 55000,
                    tag: 'Trà sữa Macchiato',
                    currency: 'đ',
                    salePercent: '25%',
                },
                {
                    title: 'Trà sữa Oolong Nướng Trân Châu',
                    description:
                        'Hương vị chân ái đúng gu đậm đà với trà oolong được “sao” (nướng) lâu hơn cho hương vị đậm đà, hòa quyện với sữa thơm béo mang đến cảm giác mát lạnh, lưu luyến vị trà sữa đậm đà nơi vòm họng.',
                    image: 'public/img/ngoiNhaCafe/TrsaOolongNngTrnChu.jpg',
                    id: 31,
                    price: 55000,
                    tag: 'Trà sữa Macchiato',
                    currency: 'đ',
                    salePercent: '25%',
                },
                {
                    title: 'Trà sữa Oolong Nướng (Nóng)',
                    description:
                        'Đậm đà chuẩn gu và ấm nóng - bởi lớp trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm ấm áp, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
                    image: 'public/img/ngoiNhaCafe/TrsaOolongNngNng.jpg',
                    id: 32,
                    price: 55000,
                    tag: 'Trà sữa Macchiato',
                    currency: 'đ',
                    salePercent: '25%',
                },
                {
                    title: 'Trà Sữa Mắc Ca Trân Châu',
                    description:
                        'Mỗi ngày với The Coffee House sẽ là điều tươi mới hơn với sữa hạt mắc ca thơm ngon, bổ dưỡng quyện cùng nền trà oolong cho vị cân bằng, ngọt dịu đi kèm cùng Trân châu trắng giòn dai mang lại cảm giác “đã” trong từng ngụm trà sữa.',
                    image: 'public/img/ngoiNhaCafe/TrSaMcCaTrnChu.jpg',
                    id: 33,
                    price: 55000,
                    tag: 'Trà sữa Macchiato',
                    currency: 'đ',
                    salePercent: '25%',
                },
                {
                    title: 'Hồng Trà Latte Macchiato',
                    description:
                        'Sự kết hợp hoàn hảo bởi hồng trà dịu nhẹ và sữa tươi, nhấn nhá thêm lớp macchiato trứ danh của The Coffee House mang đến cho bạn hương vị trà sữa đúng gu tinh tế và healthy.',
                    image: 'public/img/ngoiNhaCafe/HngTrLatteMacchiato.jpg',
                    id: 34,
                    price: 55000,
                    tag: 'Trà sữa Macchiato',
                    currency: 'đ',
                    salePercent: '25%',
                },
                {
                    title: 'Trà Sữa Oolong Nướng Trân Châu Chai Fresh 500ML',
                    description:
                        'Phiên bản chai fresh 500ml mới, The Coffee House tin rằng với diện mạo mới: tiện lợi và phù hợp với bình thường mới này, các tín đồ trà sữa sẽ được thưởng thức hương vị đậm đà, hòa quyện với sữa thơm béo mang đến cảm giác mát lạnh ở bất cứ nơi đâu. *Sản phẩm dùng ngon nhất trong ngày. *Sản phẩm mặc định mức đường và không đá.',
                    image: 'public/img/ngoiNhaCafe/TrSaOolongNngTrnChuChaiFresh500ML.jpg',
                    id: 35,
                    price: 95000,
                    tag: 'Trà sữa Macchiato',
                    currency: 'đ',
                    salePercent: '25%',
                },
                {
                    title: 'Hi-Tea Xoài Aloe Vera',
                    description: '',
                    image: 'public/img/ngoiNhaCafe/HiTeaXoiAloeVera.jpg',
                    id: 36,
                    price: 49000,
                    tag: 'Hi-Tea Trà',
                    currency: 'đ',
                    salePercent: '30%',
                },
                {
                    title: 'Hi-Tea Dâu Tây Mận Muối Aloe Vera',
                    description:
                        'Sự kết hợp độc đáo giữa 3 sắc thái hương vị khác nhau: trà hoa Hibiscus chua thanh, Mận muối mặn mặn và Dâu tây tươi Đà Lạt cô đặc ngọt dịu. Ngoài ra, topping Aloe Vera tươi mát, ngon ngất ngây, đẹp đắm say, hứa hẹn sẽ khuấy đảo hè này.',
                    image: 'public/img/ngoiNhaCafe/HiTeaDuTyMnMuiAloeVera.jpg',
                    id: 37,
                    price: 49000,
                    tag: 'Hi-Tea Trà',
                    currency: 'đ',
                    salePercent: '30%',
                },
                {
                    title: 'HI-TEA Yuzu Trân Châu',
                    description:
                        'Không chỉ nổi bật với sắc đỏ đặc trưng từ trà hoa Hibiscus, Hi-Tea Yuzu còn gây ấn tượng với topping Yuzu (quýt Nhật) lạ miệng, kết hợp cùng trân châu trắng dai giòn sần sật, nhai vui vui.',
                    image: 'public/img/ngoiNhaCafe/HITEAYuzuTrnChu.jpg',
                    id: 38,
                    price: 49000,
                    tag: 'Hi-Tea Trà',
                    currency: 'đ',
                    salePercent: '30%',
                },
                {
                    title: 'Hi-Tea Vải',
                    description:
                        'Chút ngọt ngào của Vải, mix cùng vị chua thanh tao từ trà hoa Hibiscus, mang đến cho bạn thức uống đúng chuẩn vừa ngon, vừa healthy.',
                    image: 'public/img/ngoiNhaCafe/HiTeaVi.jpg',
                    id: 39,
                    price: 49000,
                    tag: 'Hi-Tea Trà',
                    currency: 'đ',
                    salePercent: '30%',
                },
                {
                    title: 'Hi-Tea Đào',
                    description:
                        'Sự kết hợp ăn ý giữa Đào cùng trà hoa Hibiscus, tạo nên tổng thể hài hoà dễ gây “thương nhớ” cho team thích món thanh mát, có vị chua nhẹ.',
                    image: 'public/img/ngoiNhaCafe/HiTeao.jpg',
                    id: 40,
                    price: 49000,
                    tag: 'Hi-Tea Trà',
                    currency: 'đ',
                    salePercent: '30%',
                },
                {
                    title: 'Hi-Tea Đá Tuyết Xoài Đào',
                    description:
                        'Những miếng đào vàng ươm kết hợp với đá tuyết vị xoài mát lành, cùng nền trà hoa Hibiscus chua dịu đem đến cảm giác lạ miệng, hấp dẫn đến tận ngụm cuối cùng.',
                    image: 'public/img/ngoiNhaCafe/HiTeaTuytXoio.jpg',
                    id: 41,
                    price: 55000,
                    tag: 'Hi-Tea Đá Tuyết',
                    currency: 'đ',
                    salePercent: '25%',
                },
                {
                    title: 'Hi-Tea Đá Tuyết Yuzu Vải',
                    description:
                        'Vị trà hoa Hibiscus chua chua, kết hợp cùng đá tuyết Yuzu mát lạnh tái tê, thêm miếng vải căng mọng, ngọt ngào sẽ khiến bạn thích thú ngay từ lần thử đầu tiên.',
                    image: 'public/img/ngoiNhaCafe/HiTeaTuytYuzuVi.jpg',
                    id: 42,
                    price: 55000,
                    tag: 'Hi-Tea Đá Tuyết',
                    currency: 'đ',
                    salePercent: '25%',
                },
                {
                    title: 'Hi-Tea Phúc Bồn Tử Bling Bling',
                    description:
                        'Nền trà Hibiscus thanh mát, quyện vị chua chua ngọt ngọt của phúc bồn tử 100% tự nhiên cùng quýt mọng nước mang đến cảm giác sảng khoái tức thì. Đặc biệt, bạn đừng bỏ lỡ trải nghiệm “khuấy để thấy trăng” với hiệu ứng bling bling lạ mắt, được làm từ bột nhũ vàng dùng trong thực phẩm.',
                    image: 'public/img/ngoiNhaCafe/HiTeaPhcBnTBlingBling.jpg',
                    id: 43,
                    price: 65000,
                    tag: 'Hi-Tea Bling Bling',
                    currency: 'đ',
                    salePercent: '25%',
                },
            ];
            for (var i = 0; i < dataImgs.length; i++) {
                dataImgs[i].count = i + 1;
            }
            setDataImgs(dataImgs);
        }
        if (!this.getDataOrders()) {
            var dataOrders = [
                {
                    maDH: 1,
                    maKH: 'abc',
                    gia: 30000,
                    soLuong: 2,
                    trangThai: 'Chưa xử lý',
                    tongGia: 60000,
                    tag: 'Cà phê',
                    ngayDK: 20000,
                },
                {
                    maDH: 2,
                    maKH: 'abcd',
                    gia: 30000,
                    soLuong: 1,
                    trangThai: 'Chưa xử lý',
                    tongGia: 30000,
                    ngayDK: 30000,
                    tag: 'Trà',
                },
                {
                    maDH: 3,
                    maKH: 'abcde',
                    gia: 30000,
                    soLuong: 1,
                    trangThai: 'Chưa xử lý',
                    tongGia: 30000,
                    ngayDK: 30000,
                    tag: 'Hi-Tea',
                },
            ];
            setDataOrders(dataOrders);
        }
    };
}
// html đã có --darkmode mặc định là dar

Data.prototype.toggleDarkMode = function () {
    if (Data.prototype.theme === 'light') {
        Data.prototype.theme = 'dark';
    } else {
        Data.prototype.theme = 'light';
    }
    Data.prototype.setTheme();
};

Data.prototype.setTheme = function () {
    window.localStorage.setItem('theme', Data.prototype.theme);
};
Data.prototype.getTheme = function () {
    var theme = window.localStorage.getItem('theme');
    if (typeof theme != 'string') theme = '';

    return theme;
};
Data.prototype.theme = Data.prototype.getTheme();
function formatDateDDMMYYYY(date) {
    return (
        date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    );
}
