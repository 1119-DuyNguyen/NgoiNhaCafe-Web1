export function Data() {
    var _this = this;
    var dataUsers = [];
    var dataImgs = [];
    var bill = {
        user: 'a',
        date: '28-10-2022',
        id: 5,
        info: '1 x Superstar White Gold size 36; ',
        status: 'Chưa xử lý',
        totalprice: 2100000,
    };
    const keyImgs = 'dataImgs';
    const keyUsers = 'dataUsers';
    const keyCart = 'dataCart';
    const keyBill = 'bill';
    const keyCurrentUser = 'currentUser';
    //user
    this.addUser = function (user) {
        if (!user) return;
        user.dateCreate = formatDateDDMMYYYY(new Date());
        dataUsers.push(user);
        setDataUsers(dataUsers);
    };
    this.removeUser = function (id) {};

    //imgs
    this.addImgs = function () {};
    this.removeImgs = function (id) {};
    //cart
    this.pushCart = function (dataImg) {
        if (!dataImg) return;
        var cart = _this.getDataCart();
        if (!Array.isArray(cart)) cart = [];
        dataImg.isPay = false;
        dataImg.dateCreate = formatDateDDMMYYYY(new Date());
        cart.push(dataImg);
        _this.setDataCart(cart);
    };
    this.spliceCart = function (index) {
        var cart = _this.getDataCart();
        if (Array.isArray(cart)) {
            cart.splice(index, 1);
            _this.setDataCart(cart);
        }
    };
    this.removeCart = function () {
        window.localStorage.removeItem(keyCart);
    };
    //bill
    var bill = [];
    /*
    customer:  {username: "admin", password: "admin", fullname: "Trần Lê Huy Quyền",…}
date : "30-10-2022"
id: 6
info:  "1 x Air max 1 Just do it size 36; "
status:  "Chưa xử lý"
totalprice : 5700000
    */
    this.pushBill = function (cart) {
        if (!cart) return;
        var bill = _this.getDataBill();
        console.log(bill);
        if (!Array.isArray(bill)) bill = [];
        cart.isPay = false;
        dataImg.dateCreate = formatDateDDMMYYYY(new Date());
        bill.push(dataImg);
        _this.setDataBill(bill);
    };
    this.spliceBill = function (index) {
        var bill = _this.getDataBill();
        if (Array.isArray(bill)) {
            bill.splice(index, 1);
            _this.setDataBill(bill);
        }
    };
    this.removeBill = function () {
        window.localStorage.removeItem(keyBill);
    };
    //setter
    function setDataImgs(data) {
        window.localStorage.setItem(keyImgs, JSON.stringify(data));
    }
    function setDataUsers(data) {
        window.localStorage.setItem(keyUsers, JSON.stringify(data));
    }
    this.setDataCart = function (data) {
        window.localStorage.setItem(keyCart, JSON.stringify(data));
    };
    this.setBill = function () {
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
    this.getDataCart = function () {
        return JSON.parse(window.localStorage.getItem(keyCart));
    };
    this.getDataBill = function () {
        return JSON.parse(window.localStorage.getItem(keyBill));
    };

    //init data
    this.initData = function () {
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
                {
                    id: 1,
                    username: 'Bret',
                    email: 'Sincere@april.biz',
                    address:
                        '215/39 Bông Sao, Phường 5, Quận 8, Thành phố Hồ Chí Minh, Việt Nam',
                    phone: '04147274',
                    password: 'khongcopass',
                    type: 'admin',
                },
                {
                    id: 1,
                    username: 'Antonette',
                    email: 'Shanna@melissa.tv',
                    address:
                        '215/39 Bông Sao, Phường 5, Quận 8, Thành phố Hồ Chí Minh, Việt Nam',
                    phone: '04252181',
                    password: 'khongcopass',
                    type: 'user',
                },
                {
                    id: 1,
                    username: 'Samantha',
                    email: 'Nathan@yesenia.net',
                    address:
                        '215/39 Bông Sao, Phường 5, Quận 8, Thành phố Hồ Chí Minh, Việt Nam',
                    phone: '06949196',
                    password: 'khongcopass',
                    type: 'user',
                },
                {
                    id: 1,
                    username: 'Karianne',
                    email: 'Julianne.OConner@kory.org',
                    address:
                        '215/39 Bông Sao, Phường 5, Quận 8, Thành phố Hồ Chí Minh, Việt Nam',
                    phone: '01261619',
                    password: 'khongcopass',
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
                    priceTotal: 34800,
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
                    priceTotal: 42000,
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
                    priceTotal: 34800,
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
                    priceTotal: 42000,
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
                    priceTotal: 34800,
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
                    priceTotal: 42000,
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
                    priceTotal: 90000,
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
                    priceTotal: 58800,
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
                    priceTotal: 58800,
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
                    priceTotal: 58800,
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
                    priceTotal: 58800,
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
                    priceTotal: 46800,
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
                    priceTotal: 46800,
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
                    priceTotal: 58800,
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
                    priceTotal: 58800,
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
                    priceTotal: 54000,
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
                    priceTotal: 46800,
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
                    priceTotal: 51750,
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
                    priceTotal: 51750,
                },
                {
                    title: 'CloudFee Creamy Hạnh Nhân Nướng',
                    description:
                        'Vị đắng của cà phê được dung hòa bởi sự ngọt ngào từ kem sữa, điểm tô chút nhẹ nhàng cùng lớp foam trắng bồng bềnh, quyện lẫn vị hạnh nhân nướng bùi bùi vui miệng, thêm thạch cà phê giòn ngon khó cưỡng. Đây là thức uống đúng gu giúp bạn khởi đầu ngày mới với tinh thần phơi phới.',
                    image: 'public/img/ngoiNhaCafe/CloudFeeCreamyHnhNhnNng.jpg',
                    id: 20,
                    price: 39000,
                    tag: 'Creamy',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 42900,
                },
                {
                    title: 'CloudFee Creamy Caramel',
                    description:
                        'Vừa khơi dậy sự tươi tỉnh đầu ngày nhờ vị đắng nhè nhẹ của cà phê, vừa vỗ về khẩu vị với sự ngọt ngào quyện hòa giữa kem sữa và caramel thơm béo. Không chỉ vậy, topping thạch cà phê giòn dai để bạn thỏa sức nhâm nhi, càng tăng thêm sức hấp dẫn của thức uống cực đỉnh này.',
                    image: 'public/img/ngoiNhaCafe/CloudFeeCreamyCaramel.jpg',
                    id: 21,
                    price: 39000,
                    tag: 'Creamy',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 42900,
                },
                {
                    title: 'CloudFee Creamy Pandan Coconut',
                    description:
                        'Một kết hợp ăn ý giữa cà phê phin truyền thống và Espresso lừng danh nước Ý, kèm chút biến tấu cùng kem sữa ngọt ngào, lẫn vị thơm béo dừa lá dứa đậm chất Việt Nam. Đặc biệt, topping thạch cà phê giòn dai nhai cực đã, thử là ghiền ngay.',
                    image: 'public/img/ngoiNhaCafe/CloudFeeCreamyPandanCoconut.jpg',
                    id: 22,
                    price: 39000,
                    tag: 'Creamy',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 42900,
                },
                {
                    title: 'CloudFee Creme Brulee Hạnh Nhân Nướng',
                    description:
                        'CloudFee Creme Brulee Hạnh Nhân Nướng đánh thức vị giác bằng lớp kem trứng Creme Brulee ngọt ngào lẫn chút đắng nhẹ từ cà phê Espresso Ý. Nhấp từng ngụm để cảm nhận trọn vẹn vị hạnh nhân nướng thơm bùi cùng topping thạch cà phê dai giòn cực cuốn.',
                    image: 'public/img/ngoiNhaCafe/CloudFeeCremeBruleeHnhNhnNng.jpg',
                    id: 23,
                    price: 49000,
                    tag: 'Creme Brulee',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 53900,
                },
                {
                    title: 'CloudFee Creme Brulee Caramel',
                    description:
                        'CloudFee Creme Brulee Caramel ngon khó cưỡng bởi lớp kem trứng Creme Brulee bồng bềnh béo mịn, ngọt thanh của Caramel, thêm xíu đắng nhẹ từ cà phê, kèm topping thạch cà phê dai dai giòn giòn.',
                    image: 'public/img/ngoiNhaCafe/CloudFeeCremeBruleeCaramel.jpg',
                    id: 24,
                    price: 49000,
                    tag: 'Creme Brulee',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 53900,
                },
                {
                    title: 'CloudFee Creme Brulee Ovaltine',
                    description:
                        'Hương vị cà phê Espresso Ý được biến tấu vô cùng ngọt ngào cùng lớp đường khò giòn tan, hoà quyện với độ mềm mịn của kem trứng, nhấn nhá chút vị socola Ovaltine đậm đà. Món còn nhân đôi độ ngon với topping thạch cà phê dai giòn mê ly.',
                    image: 'public/img/ngoiNhaCafe/CloudFeeCremeBruleeOvaltine.jpg',
                    id: 25,
                    price: 49000,
                    tag: 'Creme Brulee',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 53900,
                },
                {
                    title: 'CloudFee Sữa Đá Sài Gòn',
                    description:
                        'Hương vị cà phê nguyên chất, kết hợp cùng sữa đặc và kem sữa tạo nên thức uống mới mẻ. CloudFee Sữa Đá Sài Gòn êm mượt, ngậy nhưng không ngấy, vừa ngòn ngọt vừa đăng đắng, hấp dẫn đến giọt cuối cùng.',
                    image: 'public/img/ngoiNhaCafe/CloudFeeSaSiGn.jpg',
                    id: 26,
                    price: 45000,
                    tag: 'Đoàn viên',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 51750,
                },
                {
                    title: 'CloudFee Muối Đà Nẵng',
                    description:
                        'Một chút mằn mặn của muối, quyện cùng vị đậm đà từ cà phê, beo béo của sữa đặc và kem sữa, CloudFee Muối Đà Nẵng chỉ cần nhấp một ngụm là nhớ hoài.',
                    image: 'public/img/ngoiNhaCafe/CloudFeeMuiNng.jpg',
                    id: 27,
                    price: 45000,
                    tag: 'Đoàn viên',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 51750,
                },
                {
                    title: 'CloudFee Trứng Hà Nội',
                    description:
                        'Lấy cảm hứng từ cà phê trứng đặc sản thủ đô, CloudFee Trứng Hà Nội khiến bạn dễ ghiền ngay từ ngụm đầu tiên, bởi chút thơm béo từ kem trứng, ngọt của sữa, hài hòa cùng vị đắng nhẹ từ ca cao và cà phê.',
                    image: 'public/img/ngoiNhaCafe/CloudFeeTrngHNi.jpg',
                    id: 28,
                    price: 45000,
                    tag: 'Đoàn viên',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 51750,
                },
                {
                    title: 'Trà Long Nhãn Hạt Sen',
                    description:
                        'Thức uống mang hương vị của nhãn, của sen, của trà Oolong đầy thanh mát cho tất cả các thành viên trong dịp Tết này. An lành, thư thái và đậm đà chính là những gì The Coffee House mong muốn gửi trao đến bạn và gia đình.',
                    image: 'public/img/ngoiNhaCafe/TrLongNhnHtSen.jpg',
                    id: 29,
                    price: 49000,
                    tag: 'Trà trái cây',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 56350,
                },
                {
                    title: 'Trà Đào Cam Sả - Đá',
                    description:
                        'Vị thanh ngọt của đào, vị chua dịu của Cam Vàng nguyên vỏ, vị chát của trà đen tươi được ủ mới mỗi 4 tiếng, cùng hương thơm nồng đặc trưng của sả chính là điểm sáng làm nên sức hấp dẫn của thức uống này.',
                    image: 'public/img/ngoiNhaCafe/TroCamS.jpg',
                    id: 30,
                    price: 49000,
                    tag: 'Trà trái cây',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 56350,
                },
                {
                    title: 'Trà Đào Cam Sả - Nóng',
                    description:
                        'Vị thanh ngọt của đào, vị chua dịu của Cam Vàng nguyên vỏ, vị chát của trà đen tươi được ủ mới mỗi 4 tiếng, cùng hương thơm nồng đặc trưng của sả chính là điểm sáng làm nên sức hấp dẫn của thức uống này.',
                    image: 'public/img/ngoiNhaCafe/TroCamSNng.jpg',
                    id: 31,
                    price: 55000,
                    tag: 'Trà trái cây',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 63250,
                },
                {
                    title: 'Trà Hạt Sen - Đá',
                    description:
                        'Nền trà oolong hảo hạng kết hợp cùng hạt sen tươi, bùi bùi và lớp foam cheese béo ngậy. Trà hạt sen là thức uống thanh mát, nhẹ nhàng phù hợp cho cả buổi sáng và chiều tối.',
                    image: 'public/img/ngoiNhaCafe/TrHtSen.jpg',
                    id: 32,
                    price: 49000,
                    tag: 'Trà trái cây',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 56350,
                },
                {
                    title: 'Trà Hạt Sen - Nóng',
                    description:
                        'Nền trà oolong hảo hạng kết hợp cùng hạt sen tươi, bùi bùi thơm ngon. Trà hạt sen là thức uống thanh mát, nhẹ nhàng phù hợp cho cả buổi sáng và chiều tối.',
                    image: 'public/img/ngoiNhaCafe/TrHtSenNng.jpg',
                    id: 33,
                    price: 55000,
                    tag: 'Trà trái cây',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 63250,
                },
                {
                    title: 'Trà Long Nhãn Hạt Chia',
                    description:
                        'Vị nhãn ngọt, tươi mát đặc trưng hoà quyện tinh tế cùng vị trà oolong hảo hạng và hạt chia mang đến cho bạn một thức uống không chỉ thơm ngon mà còn bổ dưỡng.',
                    image: 'public/img/ngoiNhaCafe/TrLongNhnHtChia.jpg',
                    id: 34,
                    price: 49000,
                    tag: 'Trà trái cây',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 56350,
                },
                {
                    title: 'Trà Long Nhãn Hạt Chia (Nóng)',
                    description:
                        'Vị nhãn ngọt, tươi mát đặc trưng hoà quyện tinh tế cùng vị trà oolong hảo hạng và hạt chia mang đến cho bạn một thức uống không chỉ thơm ngon mà còn bổ dưỡng.',
                    image: 'public/img/ngoiNhaCafe/TrLongNhnHtChiaNng.jpg',
                    id: 35,
                    price: 55000,
                    tag: 'Trà trái cây',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 63250,
                },
                {
                    title: 'Trà Đào Cam Sả Chai Fresh 500ML',
                    description:
                        'Với phiên bản chai fresh 500ml, thức uống "best seller" đỉnh cao mang một diện mạo tươi mới, tiện lợi, phù hợp với bình thường mới và vẫn giữ nguyên vị thanh ngọt của đào, vị chua dịu của cam vàng nguyên vỏ và vị trà đen thơm lừng ly Trà đào cam sả nguyên bản. *Sản phẩm dùng ngon nhất trong ngày. *Sản phẩm mặc định mức đường và không đá.',
                    image: 'public/img/ngoiNhaCafe/TroCamSChaiFresh500ML.jpg',
                    id: 36,
                    price: 105000,
                    tag: 'Trà trái cây',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 120750,
                },
                {
                    title: 'Trà Đen Macchiato',
                    description:
                        'Trà đen được ủ mới mỗi ngày, giữ nguyên được vị chát mạnh mẽ đặc trưng của lá trà, phủ bên trên là lớp Macchiato "homemade" bồng bềnh quyến rũ vị phô mai mặn mặn mà béo béo.',
                    image: 'public/img/ngoiNhaCafe/TrenMacchiato.jpg',
                    id: 37,
                    price: 55000,
                    tag: 'Trà sữa Macchiato',
                    currency: 'đ',
                    salePercent: '25%',
                    priceTotal: 68750,
                },
                {
                    title: 'Hồng Trà Sữa Trân Châu',
                    description:
                        'Thêm chút ngọt ngào cho ngày mới với hồng trà nguyên lá, sữa thơm ngậy được cân chỉnh với tỉ lệ hoàn hảo, cùng trân châu trắng dai giòn có sẵn để bạn tận hưởng từng ngụm trà sữa ngọt ngào thơm ngậy thiệt đã.',
                    image: 'public/img/ngoiNhaCafe/HngTrSaTrnChu.jpg',
                    id: 38,
                    price: 55000,
                    tag: 'Trà sữa Macchiato',
                    currency: 'đ',
                    salePercent: '25%',
                    priceTotal: 68750,
                },
                {
                    title: 'Hồng Trà Sữa Nóng',
                    description:
                        'Từng ngụm trà chuẩn gu ấm áp, đậm đà beo béo bởi lớp sữa tươi chân ái hoà quyện.  Trà đen nguyên lá âm ấm dịu nhẹ, quyện cùng lớp sữa thơm béo khó lẫn - hương vị ấm áp chuẩn gu trà, cho từng ngụm nhẹ nhàng, ngọt dịu lưu luyến mãi nơi cuống họng.',
                    image: 'public/img/ngoiNhaCafe/HngTrSaNng.jpg',
                    id: 39,
                    price: 55000,
                    tag: 'Trà sữa Macchiato',
                    currency: 'đ',
                    salePercent: '25%',
                    priceTotal: 68750,
                },
                {
                    title: 'Trà sữa Oolong Nướng Trân Châu',
                    description:
                        'Hương vị chân ái đúng gu đậm đà với trà oolong được “sao” (nướng) lâu hơn cho hương vị đậm đà, hòa quyện với sữa thơm béo mang đến cảm giác mát lạnh, lưu luyến vị trà sữa đậm đà nơi vòm họng.',
                    image: 'public/img/ngoiNhaCafe/TrsaOolongNngTrnChu.jpg',
                    id: 40,
                    price: 55000,
                    tag: 'Trà sữa Macchiato',
                    currency: 'đ',
                    salePercent: '25%',
                    priceTotal: 68750,
                },
                {
                    title: 'Trà sữa Oolong Nướng (Nóng)',
                    description:
                        'Đậm đà chuẩn gu và ấm nóng - bởi lớp trà oolong nướng đậm vị hoà cùng lớp sữa thơm béo. Hương vị chân ái đúng gu đậm đà - trà oolong được "sao" (nướng) lâu hơn cho vị đậm đà, hoà quyện với sữa thơm ngậy. Cho từng ngụm ấm áp, lưu luyến vị trà sữa đậm đà mãi nơi cuống họng.',
                    image: 'public/img/ngoiNhaCafe/TrsaOolongNngNng.jpg',
                    id: 41,
                    price: 55000,
                    tag: 'Trà sữa Macchiato',
                    currency: 'đ',
                    salePercent: '25%',
                    priceTotal: 68750,
                },
                {
                    title: 'Trà Sữa Mắc Ca Trân Châu',
                    description:
                        'Mỗi ngày với The Coffee House sẽ là điều tươi mới hơn với sữa hạt mắc ca thơm ngon, bổ dưỡng quyện cùng nền trà oolong cho vị cân bằng, ngọt dịu đi kèm cùng Trân châu trắng giòn dai mang lại cảm giác “đã” trong từng ngụm trà sữa.',
                    image: 'public/img/ngoiNhaCafe/TrSaMcCaTrnChu.jpg',
                    id: 42,
                    price: 55000,
                    tag: 'Trà sữa Macchiato',
                    currency: 'đ',
                    salePercent: '25%',
                    priceTotal: 68750,
                },
                {
                    title: 'Hồng Trà Latte Macchiato',
                    description:
                        'Sự kết hợp hoàn hảo bởi hồng trà dịu nhẹ và sữa tươi, nhấn nhá thêm lớp macchiato trứ danh của The Coffee House mang đến cho bạn hương vị trà sữa đúng gu tinh tế và healthy.',
                    image: 'public/img/ngoiNhaCafe/HngTrLatteMacchiato.jpg',
                    id: 43,
                    price: 55000,
                    tag: 'Trà sữa Macchiato',
                    currency: 'đ',
                    salePercent: '25%',
                    priceTotal: 68750,
                },
                {
                    title: 'Trà Sữa Oolong Nướng Trân Châu Chai Fresh 500ML',
                    description:
                        'Phiên bản chai fresh 500ml mới, The Coffee House tin rằng với diện mạo mới: tiện lợi và phù hợp với bình thường mới này, các tín đồ trà sữa sẽ được thưởng thức hương vị đậm đà, hòa quyện với sữa thơm béo mang đến cảm giác mát lạnh ở bất cứ nơi đâu. *Sản phẩm dùng ngon nhất trong ngày. *Sản phẩm mặc định mức đường và không đá.',
                    image: 'public/img/ngoiNhaCafe/TrSaOolongNngTrnChuChaiFresh500ML.jpg',
                    id: 44,
                    price: 95000,
                    tag: 'Trà sữa Macchiato',
                    currency: 'đ',
                    salePercent: '25%',
                    priceTotal: 118750,
                },
                {
                    title: 'Hi-Tea Xoài Aloe Vera',
                    description: '',
                    image: 'public/img/ngoiNhaCafe/HiTeaXoiAloeVera.jpg',
                    id: 45,
                    price: 49000,
                    tag: 'Hi-Tea Trà',
                    currency: 'đ',
                    salePercent: '30%',
                    priceTotal: 63700,
                },
                {
                    title: 'Hi-Tea Dâu Tây Mận Muối Aloe Vera',
                    description:
                        'Sự kết hợp độc đáo giữa 3 sắc thái hương vị khác nhau: trà hoa Hibiscus chua thanh, Mận muối mặn mặn và Dâu tây tươi Đà Lạt cô đặc ngọt dịu. Ngoài ra, topping Aloe Vera tươi mát, ngon ngất ngây, đẹp đắm say, hứa hẹn sẽ khuấy đảo hè này.',
                    image: 'public/img/ngoiNhaCafe/HiTeaDuTyMnMuiAloeVera.jpg',
                    id: 46,
                    price: 49000,
                    tag: 'Hi-Tea Trà',
                    currency: 'đ',
                    salePercent: '30%',
                    priceTotal: 63700,
                },
                {
                    title: 'HI-TEA Yuzu Trân Châu',
                    description:
                        'Không chỉ nổi bật với sắc đỏ đặc trưng từ trà hoa Hibiscus, Hi-Tea Yuzu còn gây ấn tượng với topping Yuzu (quýt Nhật) lạ miệng, kết hợp cùng trân châu trắng dai giòn sần sật, nhai vui vui.',
                    image: 'public/img/ngoiNhaCafe/HITEAYuzuTrnChu.jpg',
                    id: 47,
                    price: 49000,
                    tag: 'Hi-Tea Trà',
                    currency: 'đ',
                    salePercent: '30%',
                    priceTotal: 63700,
                },
                {
                    title: 'Hi-Tea Vải',
                    description:
                        'Chút ngọt ngào của Vải, mix cùng vị chua thanh tao từ trà hoa Hibiscus, mang đến cho bạn thức uống đúng chuẩn vừa ngon, vừa healthy.',
                    image: 'public/img/ngoiNhaCafe/HiTeaVi.jpg',
                    id: 48,
                    price: 49000,
                    tag: 'Hi-Tea Trà',
                    currency: 'đ',
                    salePercent: '30%',
                    priceTotal: 63700,
                },
                {
                    title: 'Hi-Tea Đào',
                    description:
                        'Sự kết hợp ăn ý giữa Đào cùng trà hoa Hibiscus, tạo nên tổng thể hài hoà dễ gây “thương nhớ” cho team thích món thanh mát, có vị chua nhẹ.',
                    image: 'public/img/ngoiNhaCafe/HiTeao.jpg',
                    id: 49,
                    price: 49000,
                    tag: 'Hi-Tea Trà',
                    currency: 'đ',
                    salePercent: '30%',
                    priceTotal: 63700,
                },
                {
                    title: 'Hi-Tea Đá Tuyết Xoài Đào',
                    description:
                        'Những miếng đào vàng ươm kết hợp với đá tuyết vị xoài mát lành, cùng nền trà hoa Hibiscus chua dịu đem đến cảm giác lạ miệng, hấp dẫn đến tận ngụm cuối cùng.',
                    image: 'public/img/ngoiNhaCafe/HiTeaTuytXoio.jpg',
                    id: 50,
                    price: 55000,
                    tag: 'Hi-Tea Đá Tuyết',
                    currency: 'đ',
                    salePercent: '25%',
                    priceTotal: 68750,
                },
                {
                    title: 'Hi-Tea Đá Tuyết Yuzu Vải',
                    description:
                        'Vị trà hoa Hibiscus chua chua, kết hợp cùng đá tuyết Yuzu mát lạnh tái tê, thêm miếng vải căng mọng, ngọt ngào sẽ khiến bạn thích thú ngay từ lần thử đầu tiên.',
                    image: 'public/img/ngoiNhaCafe/HiTeaTuytYuzuVi.jpg',
                    id: 51,
                    price: 55000,
                    tag: 'Hi-Tea Đá Tuyết',
                    currency: 'đ',
                    salePercent: '25%',
                    priceTotal: 68750,
                },
                {
                    title: 'Hi-Tea Phúc Bồn Tử Bling Bling',
                    description:
                        'Nền trà Hibiscus thanh mát, quyện vị chua chua ngọt ngọt của phúc bồn tử 100% tự nhiên cùng quýt mọng nước mang đến cảm giác sảng khoái tức thì. Đặc biệt, bạn đừng bỏ lỡ trải nghiệm “khuấy để thấy trăng” với hiệu ứng bling bling lạ mắt, được làm từ bột nhũ vàng dùng trong thực phẩm.',
                    image: 'public/img/ngoiNhaCafe/HiTeaPhcBnTBlingBling.jpg',
                    id: 52,
                    price: 65000,
                    tag: 'Hi-Tea Bling Bling',
                    currency: 'đ',
                    salePercent: '25%',
                    priceTotal: 81250,
                },
                {
                    title: 'Bánh Mì Gậy Gà Kim Quất',
                    description:
                        'Phiên bản nâng cấp với trọng lượng tăng 80% so với bánh mì que thông thường, đem đến cho bạn bữa ăn nhanh gọn mà vẫn đầy đủ dinh dưỡng. Cắn một miếng là mê mẩn bởi vỏ bánh nướng giòn rụm, nhân đậm vị với từng miếng thịt gà mềm, ướp sốt kim quất chua ngọt, thơm nức đặc trưng. Càng "đúng bài" hơn khi thưởng thức kèm Cà phê đượm vị hoặc trà Hi-Tea thanh mát.',
                    image: 'public/img/ngoiNhaCafe/BnhMGyGKimQut.jpg',
                    id: 53,
                    price: 25000,
                    tag: 'Bánh mặn',
                    currency: 'đ',
                    salePercent: '20%',
                    priceTotal: 30000,
                },
                {
                    title: 'Bánh Mì Gậy Cá Ngừ Mayo',
                    description:
                        'Trọng lượng tăng 70% so với bánh mì que thông thường, thêm nhiều dinh dưỡng, thích hợp cho cả bữa ăn nhẹ lẫn ăn no. Ngon hết chỗ chê từ vỏ bánh nướng nóng giòn, cá ngừ đậm đà quyện lẫn sốt mayo thơm béo đến từng hạt bắp ngọt bùi hấp dẫn. Nhâm nhi bánh cùng ly Cà phê thơm nồng hay Hi-Tea tươi mát thì đúng chuẩn "điểm mười".',
                    image: 'public/img/ngoiNhaCafe/BnhMGyCNgMayo.jpg',
                    id: 54,
                    price: 25000,
                    tag: 'Bánh mặn',
                    currency: 'đ',
                    salePercent: '20%',
                    priceTotal: 30000,
                },
                {
                    title: 'Bánh Mì Que Pate',
                    description:
                        'Vỏ bánh mì giòn tan, kết hợp với lớp nhân pate béo béo đậm đà sẽ là lựa chọn lý tưởng nhẹ nhàng để lấp đầy chiếc bụng đói , cho 1 bữa sáng - trưa - chiều - tối của bạn thêm phần thú vị.',
                    image: 'public/img/ngoiNhaCafe/BnhMQuePate.jpg',
                    id: 55,
                    price: 15000,
                    tag: 'Bánh mặn',
                    currency: 'đ',
                    salePercent: '20%',
                    priceTotal: 18000,
                },
                {
                    title: 'Bánh Mì Que Pate Cay',
                    description:
                        'Vỏ bánh mì giòn tan, kết hợp với lớp nhân pate béo béo đậm đà và 1 chút cay cay sẽ là lựa chọn lý tưởng nhẹ nhàng để lấp đầy chiếc bụng đói , cho 1 bữa sáng - trưa - chiều - tối của bạn thêm phần thú vị.',
                    image: 'public/img/ngoiNhaCafe/BnhMQuePateCay.jpg',
                    id: 56,
                    price: 15000,
                    tag: 'Bánh mặn',
                    currency: 'đ',
                    salePercent: '20%',
                    priceTotal: 18000,
                },
                {
                    title: 'Bánh Mì VN Thịt Nguội',
                    description:
                        'Gói gọn trong ổ bánh mì Việt Nam là từng lớp chả, từng lớp jambon hòa quyện cùng bơ và pate thơm lừng, thêm dưa rau cho bữa sáng đầy năng lượng.  *Phần bánh sẽ ngon và đậm đà nhất khi kèm pate. Để đảm bảo hương vị được trọn vẹn, Nhà mong bạn thông cảm vì không thể thay đổi định lượng pate.',
                    image: 'public/img/ngoiNhaCafe/BnhMVNThtNgui.jpg',
                    id: 57,
                    price: 35000,
                    tag: 'Bánh mặn',
                    currency: 'đ',
                    salePercent: '20%',
                    priceTotal: 42000,
                },
                {
                    title: 'Croissant trứng muối',
                    description:
                        'Croissant trứng muối thơm lừng, bên ngoài vỏ bánh giòn hấp dẫn bên trong trứng muối vị ngon khó cưỡng.',
                    image: 'public/img/ngoiNhaCafe/Croissanttrngmui.jpg',
                    id: 58,
                    price: 35000,
                    tag: 'Bánh mặn',
                    currency: 'đ',
                    salePercent: '20%',
                    priceTotal: 42000,
                },
                {
                    title: 'Chà Bông Phô Mai',
                    description:
                        'Chiếc bánh với lớp phô mai vàng sánh mịn bên trong, được bọc ngoài lớp vỏ xốp mềm thơm lừng. Thêm lớp chà bông mằn mặn hấp dẫn bên trên.',
                    image: 'public/img/ngoiNhaCafe/ChBngPhMai.jpg',
                    id: 59,
                    price: 35000,
                    tag: 'Bánh mặn',
                    currency: 'đ',
                    salePercent: '20%',
                    priceTotal: 42000,
                },
                {
                    title: 'Mochi Kem Phúc Bồn Tử',
                    description:
                        'Bao bọc bởi lớp vỏ Mochi dẻo thơm, bên trong là lớp kem lạnh cùng nhân phúc bồn tử ngọt ngào. Gọi 1 chiếc Mochi cho ngày thật tươi mát. Sản phẩm phải bảo quán mát và dùng ngon nhất trong 2h sau khi nhận hàng.',
                    image: 'public/img/ngoiNhaCafe/MochiKemPhcBnT.jpg',
                    id: 60,
                    price: 19000,
                    tag: 'Bánh ngọt',
                    currency: 'đ',
                    salePercent: '20%',
                    priceTotal: 22800,
                },
                {
                    title: 'Mochi Kem Việt Quất',
                    description:
                        'Bao bọc bởi lớp vỏ Mochi dẻo thơm, bên trong là lớp kem lạnh cùng nhân việt quất đặc trưng thơm thơm, ngọt dịu. Gọi 1 chiếc Mochi cho ngày thật tươi mát.  Sản phẩm phải bảo quán mát và dùng ngon nhất trong 2h sau khi nhận hàng.',
                    image: 'public/img/ngoiNhaCafe/MochiKemVitQut.jpg',
                    id: 61,
                    price: 19000,
                    tag: 'Bánh ngọt',
                    currency: 'đ',
                    salePercent: '20%',
                    priceTotal: 22800,
                },
                {
                    title: 'Mochi Kem Dừa Dứa',
                    description:
                        'Bao bọc bởi lớp vỏ Mochi dẻo thơm, bên trong là lớp kem lạnh cùng nhân dừa dứa thơm lừng lạ miệng. Gọi 1 chiếc Mochi cho ngày thật tươi mát.  Sản phẩm phải bảo quán mát và dùng ngon nhất trong 2h sau khi nhận hàng.',
                    image: 'public/img/ngoiNhaCafe/MochiKemDaDa.jpg',
                    id: 62,
                    price: 19000,
                    tag: 'Bánh ngọt',
                    currency: 'đ',
                    salePercent: '20%',
                    priceTotal: 22800,
                },
                {
                    title: 'Mochi Kem Chocolate',
                    description:
                        'Bao bọc bởi lớp vỏ Mochi dẻo thơm, bên trong là lớp kem lạnh cùng nhân chocolate độc đáo. Gọi 1 chiếc Mochi cho ngày thật tươi mát. Sản phẩm phải bảo quán mát và dùng ngon nhất trong 2h sau khi nhận hàng.',
                    image: 'public/img/ngoiNhaCafe/MochiKemChocolate.jpg',
                    id: 63,
                    price: 19000,
                    tag: 'Bánh ngọt',
                    currency: 'đ',
                    salePercent: '20%',
                    priceTotal: 22800,
                },
                {
                    title: 'Mochi Kem Matcha',
                    description:
                        'Bao bọc bởi lớp vỏ Mochi dẻo thơm, bên trong là lớp kem lạnh cùng nhân trà xanh đậm vị. Gọi 1 chiếc Mochi cho ngày thật tươi mát. Sản phẩm phải bảo quán mát và dùng ngon nhất trong 2h sau khi nhận hàng.',
                    image: 'public/img/ngoiNhaCafe/MochiKemMatcha.jpg',
                    id: 64,
                    price: 19000,
                    tag: 'Bánh ngọt',
                    currency: 'đ',
                    salePercent: '20%',
                    priceTotal: 22800,
                },
                {
                    title: 'Mochi Kem Xoài',
                    description:
                        'Bao bọc bởi lớp vỏ Mochi dẻo thơm, bên trong là lớp kem lạnh cùng nhân xoài chua chua ngọt ngọt. Gọi 1 chiếc Mochi cho ngày thật tươi mát.  Sản phẩm phải bảo quán mát và dùng ngon nhất trong 2h sau khi nhận hàng.',
                    image: 'public/img/ngoiNhaCafe/MochiKemXoi.jpg',
                    id: 65,
                    price: 19000,
                    tag: 'Bánh ngọt',
                    currency: 'đ',
                    salePercent: '20%',
                    priceTotal: 22800,
                },
                {
                    title: 'Mousse Red Velvet',
                    description:
                        'Bánh nhiều lớp được phủ lớp kem bên trên bằng Cream cheese.',
                    image: 'public/img/ngoiNhaCafe/MousseRedVelvet.jpg',
                    id: 66,
                    price: 35000,
                    tag: 'Bánh ngọt',
                    currency: 'đ',
                    salePercent: '20%',
                    priceTotal: 42000,
                },
                {
                    title: 'Mousse Tiramisu',
                    description:
                        'Hương vị dễ ghiền được tạo nên bởi chút đắng nhẹ của cà phê, lớp kem trứng béo ngọt dịu hấp dẫn',
                    image: 'public/img/ngoiNhaCafe/MousseTiramisu.jpg',
                    id: 67,
                    price: 35000,
                    tag: 'Bánh ngọt',
                    currency: 'đ',
                    salePercent: '20%',
                    priceTotal: 42000,
                },
                {
                    title: 'Mousse Gấu Chocolate',
                    description:
                        'Với vẻ ngoài đáng yêu và hương vị ngọt ngào, thơm béo nhất định bạn phải thử ít nhất 1 lần.',
                    image: 'public/img/ngoiNhaCafe/MousseGuChocolate.jpg',
                    id: 68,
                    price: 39000,
                    tag: 'Bánh ngọt',
                    currency: 'đ',
                    salePercent: '20%',
                    priceTotal: 46800,
                },
                {
                    title: 'Mít Sấy',
                    description:
                        'Mít sấy khô vàng ươm, giòn rụm, giữ nguyên được vị ngọt lịm của mít tươi.',
                    image: 'public/img/ngoiNhaCafe/MtSy.jpg',
                    id: 69,
                    price: 20000,
                    tag: 'Snack',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 22000,
                },
                {
                    title: 'Gà Xé Lá Chanh',
                    description:
                        'Thịt gà được xé tơi, mang hương vị mặn, ngọt, cay cay quyện nhau vừa chuẩn, thêm chút thơm thơm thơm từ lá chanh sấy khô giòn giòn xua tan ngay cơn buồn miệng.',
                    image: 'public/img/ngoiNhaCafe/GXLChanh.jpg',
                    id: 70,
                    price: 25000,
                    tag: 'Snack',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 27500,
                },
                {
                    title: 'Thùng Cà Phê Sữa Espresso',
                    description: '',
                    image: 'public/img/ngoiNhaCafe/ThngCPhSaEspresso.jpg',
                    id: 71,
                    price: 336000,
                    tag: 'Cà phê tại nhà',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 386400,
                },
                {
                    title: 'Combo 6 Lon Cà Phê Sữa Espresso',
                    description: '',
                    image: 'public/img/ngoiNhaCafe/Combo6LonCPhSaEspresso.jpg',
                    id: 72,
                    price: 84000,
                    tag: 'Cà phê tại nhà',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 96600,
                },
                {
                    title: 'Cà Phê Rang Xay Original 1 Túi 1KG',
                    description:
                        'Cà phê Original 1 của The Coffee House với 100% thành phần cà phê Robusta Đăk Lăk, vùng trồng cà phê ngon nhất Việt Nam. Bằng cách áp dụng kỹ thuật rang xay hiện đại, Cà phê Original 1 mang đến trải nghiệm tuyệt vời khi uống cà phê tại nhà với hương vị đậm đà truyền thống hợp khẩu vị của giới trẻ sành cà phê.',
                    image: 'public/img/ngoiNhaCafe/CPhRangXayOriginal1Ti1KG.jpg',
                    id: 73,
                    price: 235000,
                    tag: 'Cà phê tại nhà',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 270250,
                },
                {
                    title: 'Cà Phê Hòa Tan Đậm Vị Việt Túi 40x16G',
                    description:
                        'Bắt đầu ngày mới với tách cà phê sữa “Đậm vị Việt” mạnh mẽ sẽ giúp bạn luôn tỉnh táo và hứng khởi cho ngày làm việc thật hiệu quả.',
                    image: 'public/img/ngoiNhaCafe/CPhHaTanmVVitTi40x16G.jpg',
                    id: 74,
                    price: 99000,
                    tag: 'Cà phê tại nhà',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 113850,
                },
                {
                    title: 'Cà Phê Rang Xay Original 1 250g',
                    description:
                        'Cà phê Original 1 của The Coffee House với thành phần chính cà phê Robusta Đắk Lắk, vùng trồng cà phê nổi tiếng nhất Việt Nam. Bằng cách áp dụng kỹ thuật rang xay hiện đại, Cà phê Original 1 mang đến trải nghiệm tuyệt vời khi uống cà phê tại nhà với hương vị đậm đà truyền thống hợp khẩu vị của giới trẻ sành cà phê.',
                    image: 'public/img/ngoiNhaCafe/CPhRangXayOriginal1250g.jpg',
                    id: 75,
                    price: 60000,
                    tag: 'Cà phê tại nhà',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 69000,
                },
                {
                    title: 'Cà Phê Sữa Đá Hòa Tan (10 gói x 22g)',
                    description:
                        'Thật dễ dàng để bắt đầu ngày mới với tách cà phê sữa đá sóng sánh, thơm ngon như cà phê pha phin. Vị đắng thanh của cà phê hoà quyện với vị ngọt béo của sữa, giúp bạn luôn tỉnh táo và hứng khởi cho ngày làm việc thật hiệu quả.',
                    image: 'public/img/ngoiNhaCafe/CPhSaHaTan10gix22g.jpg',
                    id: 76,
                    price: 44000,
                    tag: 'Cà phê tại nhà',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 50600,
                },
                {
                    title: 'Cà Phê Hoà Tan Đậm Vị Việt (18 gói x 16 gam)',
                    description:
                        'Bắt đầu ngày mới với tách cà phê sữa “Đậm vị Việt” mạnh mẽ sẽ giúp bạn luôn tỉnh táo và hứng khởi cho ngày làm việc thật hiệu quả.',
                    image: 'public/img/ngoiNhaCafe/CPhHoTanmVVit18gix16gam.jpg',
                    id: 77,
                    price: 48000,
                    tag: 'Cà phê tại nhà',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 55200,
                },
                {
                    title: 'Cà Phê Sữa Đá Hòa Tan Túi 25x22G',
                    description:
                        'Thật dễ dàng để bắt đầu ngày mới với tách cà phê sữa đá sóng sánh, thơm ngon như cà phê pha phin. Vị đắng thanh của cà phê hoà quyện với vị ngọt béo của sữa, giúp bạn luôn tỉnh táo và hứng khởi cho ngày làm việc thật hiệu quả.',
                    image: 'public/img/ngoiNhaCafe/CPhSaHaTanTi25x22G.jpg',
                    id: 78,
                    price: 99000,
                    tag: 'Cà phê tại nhà',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 113850,
                },
                {
                    title: 'Cà Phê Sữa Đá Pack 6 Lon',
                    description:
                        'Với thiết kế lon cao trẻ trung, hiện đại và tiện lợi, Cà phê sữa đá lon thơm ngon đậm vị của The Coffee House sẽ đồng hành cùng nhịp sống sôi nổi của tuổi trẻ và giúp bạn có được một ngày làm việc đầy hứng khởi.',
                    image: 'public/img/ngoiNhaCafe/CPhSaPack6Lon.jpg',
                    id: 79,
                    price: 84000,
                    tag: 'Cà phê tại nhà',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 96600,
                },
                {
                    title: 'Thùng 24 Lon Cà Phê Sữa Đá ',
                    description:
                        'Với thiết kế lon cao trẻ trung, hiện đại và tiện lợi, Cà phê sữa đá lon thơm ngon đậm vị của The Coffee House sẽ đồng hành cùng nhịp sống sôi nổi của tuổi trẻ và giúp bạn có được một ngày làm việc đầy hứng khởi.',
                    image: 'public/img/ngoiNhaCafe/Thng24LonCPhSa.jpg',
                    id: 80,
                    price: 336000,
                    tag: 'Cà phê tại nhà',
                    currency: 'đ',
                    salePercent: '15%',
                    priceTotal: 386400,
                },
                {
                    title: 'Trà Oolong Túi Lọc Tearoma 20x2G',
                    description:
                        'Trà Oolong túi lọc với mùi hương dịu nhẹ hoàn toàn từ tự nhiên, vị hậu ngọt,  và hương thơm tinh tế. Trà túi lọc Tearoma tiện lợi để sử dụng tại văn phòng, tại nhà,... nhưng vẫn đảm bảo được chất lượng về hương trà tinh tế, vị trà đậm đà.',
                    image: 'public/img/ngoiNhaCafe/TrOolongTiLcTearoma20x2G.jpg',
                    id: 81,
                    price: 28000,
                    tag: 'Trà tại nhà',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 30800,
                },
                {
                    title: 'Trà Lài Túi Lọc Tearoma 20x2G',
                    description:
                        'Trà túi lọc Tearoma hương lài thơm tinh tế, thanh mát, trên nền trà xanh đậm đà khó quên. Trà túi lọc Tearoma tiện lợi để sử dụng tại văn phòng, tại nhà,.. nhưng vẫn đảm bảo được chất lượng về hương trà tinh tế, vị trà đậm đà.',
                    image: 'public/img/ngoiNhaCafe/TrLiTiLcTearoma20x2G.jpg',
                    id: 82,
                    price: 28000,
                    tag: 'Trà tại nhà',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 30800,
                },
                {
                    title: 'Trà Sen Túi Lọc Tearoma 20x2G',
                    description:
                        'Trà túi lọc Tearoma hương sen tinh tế, thanh mát, trên nền trà xanh đậm đà khó quên. Trà túi lọc Tearoma tiện lợi để sử dụng tại văn phòng, tại nhà, đi du lịch,... nhưng vẫn đảm bảo được chất lượng về hương trà tinh tế, vị trà đậm đà.',
                    image: 'public/img/ngoiNhaCafe/TrSenTiLcTearoma20x2G.jpg',
                    id: 83,
                    price: 28000,
                    tag: 'Trà tại nhà',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 30800,
                },
                {
                    title: 'Trà Đào Túi Lọc Tearoma 20x2G',
                    description:
                        'Trà túi lọc Tearoma hương đào với hương thơm tinh tế và hoàn toàn tự nhiên, cùng nền trà đen đậm vị khó quên. Trà túi lọc Tearoma tiện lợi để sử dụng tại văn phòng, tại nhà,.. nhưng vẫn đảm bảo được chất lượng về hương trà tinh tế, vị trà đậm đà.',
                    image: 'public/img/ngoiNhaCafe/TroTiLcTearoma20x2G.jpg',
                    id: 84,
                    price: 28000,
                    tag: 'Trà tại nhà',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 30800,
                },
                {
                    title: 'Trà Oolong Lá Tearoma 100G',
                    description:
                        'Trà Oolong Tearoma  được chọn lọc  bởi các búp trà non phủ sương, tươi mát trên cao nguyên Lâm Đồng. Có mùi hương dịu nhẹ hoàn toàn từ tự nhiên, vị hậu ngọt.',
                    image: 'public/img/ngoiNhaCafe/TrOolongLTearoma100G.jpg',
                    id: 85,
                    price: 100000,
                    tag: 'Trà tại nhà',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 110000,
                },
                {
                    title: 'Trà Xanh Lá Tearoma 100G',
                    description:
                        'Trà Xanh Tearoma không còn quá xa lạ với người Việt, hương trà xanh đặc trưng thoang thoảng từ búp trà tươi phủ sương tự nhiên, cùng hương vị đậm đà đặc trưng khó quên.',
                    image: 'public/img/ngoiNhaCafe/TrXanhLTearoma100G.jpg',
                    id: 86,
                    price: 75000,
                    tag: 'Trà tại nhà',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 82500,
                },
                {
                    title: 'Trà Lài Lá Tearoma 100G',
                    description:
                        'Trà Tearoma hương lài tinh tế, thanh mát, trên nền trà xanh đậm đà khó quên.',
                    image: 'public/img/ngoiNhaCafe/TrLiLTearoma100G.jpg',
                    id: 87,
                    price: 80000,
                    tag: 'Trà tại nhà',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 88000,
                },
                {
                    title: 'Trà Sen Lá Tearoma 100G',
                    description:
                        'Trà Tearoma hương sen tinh tế, thanh mát, trên nền trà xanh đậm đà, đặc trưng khó quên.',
                    image: 'public/img/ngoiNhaCafe/TrSenLTearoma100G.jpg',
                    id: 88,
                    price: 80000,
                    tag: 'Trà tại nhà',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 88000,
                },
                {
                    title: 'Giftset Trà Tearoma',
                    description:
                        'Hộp quà tặng với 4 hộp trà túi lọc Tearoma các loại là món quà thật ý nghĩa cho những người thân yêu.',
                    image: 'public/img/ngoiNhaCafe/GiftsetTrTearoma.jpg',
                    id: 89,
                    price: 166000,
                    tag: 'Trà tại nhà',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 182600,
                },
                {
                    title: 'Chocolate Đá',
                    description:
                        'Bột chocolate nguyên chất hoà cùng sữa tươi béo ngậy. Vị ngọt tự nhiên, không gắt cổ, để lại một chút đắng nhẹ, cay cay trên đầu lưỡi.',
                    image: 'public/img/ngoiNhaCafe/Chocolate.jpg',
                    id: 90,
                    price: 55000,
                    tag: 'Chocolate',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 60500,
                },
                {
                    title: 'Chocolate Nóng',
                    description:
                        'Bột chocolate nguyên chất hoà cùng sữa tươi béo ngậy. Vị ngọt tự nhiên, không gắt cổ, để lại một chút đắng nhẹ, cay cay trên đầu lưỡi.',
                    image: 'public/img/ngoiNhaCafe/ChocolateNng.jpg',
                    id: 91,
                    price: 55000,
                    tag: 'Chocolate',
                    currency: 'đ',
                    salePercent: '10%',
                    priceTotal: 60500,
                },
            ];
            setDataImgs(dataImgs);
        }
    };
    this.updateData = function () {
        var users = this.getDataUsers();
        var imgs = this.getDataImgs();
        if (users) dataUsers = users;
        if (imgs) dataImgs = imgs;
    };
    this.updateData();
}
Data.prototype.currentUser = '';
function formatDateDDMMYYYY(date) {
    return (
        date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()
    );
}
