import {
    closeDisplay,
    openDisplay,
    btnCloseId,
    closeModal,
    resetInputs,
} from '../library/display.js';
export function run() {
    const termsOfUseBtn = document.querySelector('.terms-of-use-btn');
    const privacyRulesBtn = document.querySelector('.privacy-rules-btn');

    const termsOfUse = document.querySelector('.terms-of-use');
    const privacyRules = document.querySelector('.privacy-rules');

    termsOfUseBtn.addEventListener('click', () => {
        termsOfUse.innerHTML = `
        <div id="article" class="">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="article_wrap">
                            <div class="article_content_wrap">
                                <h1 class="line_after_heading section_heading">
                                    ĐIỀU KHOẢN SỬ DỤNG
                                </h1>
                                <div class="article_content">
                                    <h3>Giới thiệu</h3>
                                    <p>
                                        Khi khách hàng truy cập vào ứng dụng The
                                        Coffee House, website
                                        order.thecoffeehouse.com hoặc đặt hàng
                                        qua hotline 18006936 của The Coffee
                                        House có nghĩa là khách hàng đã đồng ý
                                        với các điều khoản này. The Coffee House
                                        có quyền thay đổi, chỉnh sửa, thêm hoặc
                                        lược bỏ bất kỳ phần nào trong Điều khoản
                                        sử dụng này vào bất cứ lúc nào. Các thay
                                        đổi có hiệu lực ngay khi được đăng trên
                                        trang web, ứng dụng mà không cần thông
                                        báo trước. Khi khách hàng tiếp tục sử
                                        dụng dịch vụ giao hàng của The Coffee
                                        House, sau khi các thay đổi về Điều
                                        khoản này được đăng tải, có nghĩa là
                                        khách hàng chấp nhận với những thay đổi
                                        đó.
                                    </p>
                                    <p>
                                        Khách hàng vui lòng kiểm tra thường
                                        xuyên để cập nhật những thay đổi của
                                        chúng tôi.
                                    </p>
                                    <h3>Giới thiệu về các loại dịch vụ</h3>
                                    <p>
                                        Dịch vụ “Giao hàng”: là dịch vụ mà khách
                                        hàng đặt sản phẩm ngay tại nhà và được
                                        The Coffee House giao hàng tận nơi.
                                    </p>
                                    <p>
                                        - Sau khi khách hàng đặt hàng thành
                                        công, The Coffee House sẽ thực hiện đơn
                                        hàng và giao hàng đến địa chỉ mà khách
                                        hàng đã chọn.
                                    </p>
                                    <p>
                                        Dịch vụ “Mang đi” (tại ứng dụng The
                                        Coffee House): là dịch vụ mà khách hàng
                                        có thể đặt món trước và đến The Coffee
                                        House nhận sản phẩm mang đi.
                                    </p>
                                    <p>
                                        - Sau khi chọn hình thức "Mang Đi" và
                                        đặt hàng thành công, khách hàng chủ động
                                        đến Cửa hàng đã chọn trên đơn hàng để
                                        nhận sản phẩm.
                                    </p>
                                    <h3>Chính sách sử dụng dịch vụ</h3>
                                    <p>
                                        Khách hàng được quyền chủ động chọn loại
                                        dịch vụ để sử dụng khi bắt đầu đặt đơn
                                        hàng
                                    </p>
                                    <p>
                                        Với đơn hàng của dịch vụ "Giao hàng" và
                                        "Mang đi", khách hàng vui lòng không sử
                                        dụng tại Cửa hàng.
                                    </p>
                                    <p>
                                        The Coffee House có quyền từ chối hỗ trợ
                                        giao hàng với đơn hàng của dịch vụ “Mang
                                        đi”.
                                    </p>
                                    <h3>Chấp nhận đơn hàng và giá cả</h3>
                                    <p>
                                        The Coffee House có quyền từ chối hoặc
                                        hủy đơn hàng của khách hàng vì bất kỳ lý
                                        do gì liên quan đến lỗi kỹ thuật, hệ
                                        thống một cách khách quan sau khi đã
                                        liên hệ thông báo với khách hàng. Trường
                                        hợp liên hệ 3 lần liên tục không thành
                                        công trong vòng 30 phút, chúng tôi sẽ tự
                                        động hủy đơn hàng của quý khách. The
                                        Coffee House rất tiếc vì chưa thể hoàn
                                        thành đơn hàng của quý khách trong
                                        trường hợp này.
                                    </p>
                                    <p>
                                        The Coffee House cam kết sẽ cung cấp
                                        thông tin giá cả chính xác nhất cho
                                        khách hàng. Tuy nhiên, đôi lúc vẫn có
                                        sai sót xảy ra, ví dụ như trường hợp giá
                                        sản phẩm không hiển thị chính xác trên
                                        trang web hoặc sai giá, tùy theo từng
                                        trường hợp chúng tôi sẽ liên hệ hướng
                                        dẫn hoặc thông báo hủy đơn hàng đó cho
                                        khách hàng.
                                    </p>
                                    <h3>Thay đổi thông tin đặt hàng</h3>
                                    <p>
                                        Khách hàng vui lòng cung cấp thông tin
                                        đầy đủ và chính xác ngay khi hoàn tất
                                        đặt hàng trên tại The Coffee House.
                                    </p>
                                    <p>
                                        The Coffee House chỉ chấp nhận thay đổi
                                        thông tin trên đơn hàng bao gồm: địa chỉ
                                        giao hàng, sản phẩm trong giỏ hàng,
                                        thông tin người nhận, thời gian giao
                                        nhận trước bước Thực hiện đơn hàng trên
                                        ứng dụng. Tùy thuộc từng trường hợp có
                                        thể hỗ trợ khách hàng sau khi kiểm tra
                                        với cửa hàng thực hiện đơn hàng và đơn
                                        vị vận chuyển, The Coffee House sẽ liên
                                        hệ thông tin cho khách hàng hoặc có
                                        quyền từ chối hỗ trợ.
                                    </p>
                                    <h3>Hủy bỏ Đặt hàng</h3>
                                    <p>
                                        Khách hàng được quyền chủ động hủy đơn
                                        hàng trên ứng dụng đối với trường hợp
                                        đơn hàng chưa có tài xế nhận giao hàng
                                    </p>
                                    <p>
                                        Khách hàng vui lòng liên hệ hotline
                                        18006936 để hủy đơn hàng với các trường
                                        hợp: Đơn hàng đã có tài xế nhận giao
                                        hàng (từ bước Đã tìm thấy tài xế trên
                                        ứng dụng)
                                    </p>
                                    <p>
                                        Đơn hàng sẽ được trả về cửa hàng nếu
                                        nhân viên giao hàng không liên lạc được
                                        với Khách hàng tại thời điểm giao hàng
                                        (tối đa 3 cuộc gọi)
                                    </p>
                                    <p>
                                        Với trường hợp Đã giao đơn hàng đến địa
                                        chỉ yêu cầu, tuy nhiên không liên hệ
                                        được người nhận trong vòng 30 phút kể từ
                                        tài xế trả hàng về cửa hàng:
                                    </p>
                                    <p>
                                        - Đơn thanh toán COD: Đơn hàng sẽ được
                                        hủy và hủy bỏ việc tích điểm cho đơn
                                        hàng này.
                                    </p>
                                    <p>
                                        - Đơn đã thanh toán Online: Không hoàn
                                        tiền, The Coffee House sẽ lưu giữ đơn
                                        hàng và chỉ hỗ trợ giao lại đơn hàng
                                        trong ngày cho khách hàng (The Coffee
                                        House chưa thể đảm bảo về chất lượng sản
                                        phẩm nếu thời gian giao hàng hơn 30
                                        phút)
                                    </p>
                                    <p>
                                        The Coffee House sẽ có toàn quyền không
                                        thực hiện đặt hàng của
                                    </p>
                                    <p>
                                        - Địa chỉ được chọn nằm ngoài khu vực
                                        giao hàng được cung cấp trên ứng dụng;
                                    </p>
                                    <p>
                                        - Không liên lạc được với khách hàng qua
                                        điện thoại vào thời điểm xác nhận đặt
                                        hàng;
                                    </p>
                                    <p>
                                        - Không thực hiện được đơn hàng của
                                        khách hàng do thiếu thông tin, chỉ dẫn
                                        hoặc ủy quyền từ khách hàng tại thời
                                        điểm giao hàng
                                    </p>
                                    <p>
                                        - Không có sẵn tất cả các mặt hàng khách
                                        hàng đặt mua tại thời điểm đặt hàng.
                                    </p>
                                    <h3>Phương thức thanh toán</h3>
                                    <p>
                                        Thanh toán tiền mặt (COD): thanh toán
                                        khi giao hàng.
                                    </p>
                                    <p>
                                        Thanh toán trực tuyến bằng thẻ nội địa
                                        (ATM), thẻ quốc tế (Visa, master…) qua
                                        cổng thanh toán
                                    </p>
                                    <p>
                                        Thanh toán trực tuyến bằng các ví điện
                                        tử như Momo, ZaloPay, ShopeePay...
                                    </p>
                                    <h3>Chính sách Tài khoản Người dùng</h3>
                                    <p>
                                        Khách hàng cam kết và cung cấp thông tin
                                        chính xác nhằm mục đích nhận được phục
                                        vụ tốt nhất từ The Coffee House
                                    </p>
                                    <p>
                                        Mỗi số điện thoại chỉ tạo được một (01)
                                        tài khoản cho mục đích sử dụng cá nhân.
                                    </p>
                                    <p>
                                        Để đảm bảo quyền lợi, khách hàng không
                                        chia sẻ thông tin tài khoản (tên truy
                                        cập và mật khẩu) cho người khác sử dụng
                                        tài khoản The Coffee House, hoặc chuyển
                                        nhượng tài khoản cho bất kỳ ai khác mà
                                        chưa thông qua The Coffee House
                                    </p>
                                    <p>
                                        The Coffee House có quyền khóa tài khoản
                                        hoặc khóa một phần tính năng của tài
                                        khoản (như tính năng Đặt hàng/ Tích
                                        điểm..) của khách hàng khi The Coffee
                                        House phát hiện khách hàng vi phạm điều
                                        khoản hoặc chính sách của công ty hoặc
                                        có hành vi mua hàng không trung thực
                                        điển hình như:
                                    </p>
                                    <p>
                                        - Tạo các đơn hàng ảo, boom hàng hoặc
                                        đánh giá ảo.
                                    </p>
                                    <p>
                                        - Có dấu hiệu lừa đảo hoặc lạm dụng các
                                        mã giảm giá và chương trình khuyến mãi
                                        để trục lợi
                                    </p>
                                    <p>
                                        - Các trường hợp khác mà hệ thống của
                                        The Coffee House phát hiện được. Tùy
                                        từng trường hợp, The Coffee House sẽ có
                                        biện pháp xử lý thích hợp, bao gồm khóa
                                        tài khoản mà không cần thông báo trước.
                                    </p>
                                    <p>
                                        Tài khoản bị khóa hoặc khóa một phần
                                        tính năng sẽ được cấp lại sau khi hoàn
                                        thành quá trình xác minh qua các chứng
                                        từ/thông tin khách hàng cung cấp chứng
                                        minh việc mua hàng (hóa đơn, hình ảnh
                                        sản phẩm đã mua,..) và có sự đồng thuận
                                        giữa khách hàng và The Coffee House.
                                    </p>
                                    <h3>Chính sách hoàn tiền</h3>
                                    <p>
                                        The Coffee House rất tiếc khi đã không
                                        thể hoàn thành đơn hàng của khách hàng.
                                        Khách hàng có thể yên tâm về số tiền đã
                                        thanh toán. The Coffee House cùng với
                                        các đối tác Ví điện tử/Ngân hàng sẽ
                                        nhanh chóng hoàn tất thủ tục hoàn tiền.
                                    </p>
                                    <p>
                                        Khách hàng có thể tham khảo thời gian
                                        hoàn tiền về Ví/Tài khoản thẻ như sau:
                                    </p>
                                    <p>
                                        - Thẻ nội địa (ATM): tối đa 7 ngày làm
                                        việc
                                    </p>
                                    <p>
                                        - Thẻ quốc tế (Visa/Master/JCB…): từ 30
                                        tới 45 ngày làm việc hoặc 1 chu kỳ sao
                                        kê
                                    </p>
                                    <p>
                                        - Ví MoMo, Ví ZaloPay, Ví ShopeePay: tối
                                        đa 7 ngày làm việc đối với nguồn tiền
                                        trực tiếp từ Ví.
                                    </p>
                                    <p>
                                        * Lưu ý: Nếu quá thời gian trên, khách
                                        hàng chưa nhận được tiền hoàn, khách
                                        hàng vui lòng liên hệ với ngân hàng phát
                                        hành thẻ hoặc Ví điện tử để yêu cầu hỗ
                                        trợ tra soát giao dịch hoặc thông báo
                                        cho The Coffee House các thông tin: mã
                                        đơn hàng, vấn đề gặp phải, hình ảnh đính
                                        kèm để The Coffee House có thể hỗ trợ
                                        khách hàng kịp thời.
                                    </p>
                                    <h3>Phí vận chuyển</h3>
                                    <p>
                                        Đơn hàng có tổng thanh toán sau khi
                                        chiết khấu khuyến mãi trên 50.000đ được
                                        miễn phí vận chuyển.
                                    </p>
                                    <p>
                                        Đơn hàng có tổng thanh toán sau khi
                                        chiết khấu khuyến mãi dưới 50.000đ sẽ
                                        cộng thêm 10.000đ phí giao hàng trực
                                        tiếp trên đơn hàng.
                                    </p>
                                    <p>
                                        (*) Vào những dịp lễ, Tết, The Coffee
                                        House có thể sẽ thêm khoản phụ thu trực
                                        tiếp vào đơn hàng, khoản phụ thu này sẽ
                                        hiển thị ngay trên màn hình Thanh toán
                                        trước khi hoàn tất đặt hàng.
                                    </p>
                                    <p>
                                        Phí vận chuyển sẽ được The Coffee House
                                        thanh toán cho tài xế, khách hàng KHÔNG
                                        thanh toán thêm bất cứ khoản phí vận
                                        chuyển riêng nào cho tài xế.
                                    </p>
                                    <p>
                                        Trường hợp tài xế yêu cầu khách hàng
                                        thanh toán thêm bất kỳ khoản nào khác
                                        ngoài tổng giá trị đơn hàng, khách hàng
                                        vui lòng liên hệ 18006936 ngay để được
                                        hỗ trợ xử lý.
                                    </p>
                                    <h3>Thời gian giao hàng</h3>
                                    <p>Khung giờ giao hàng: 7h00 - 20h30</p>
                                    <p>
                                        Khung giờ khách hàng nhận hàng: 7:30 -
                                        21h00
                                    </p>
                                    <p>
                                        Thời gian bộ phận Giao hàng tận nơi hỗ
                                        trợ: 7:00 - 21:00
                                    </p>
                                    <p>
                                        (*) Ngoài khung giờ dự kiến như trên,
                                        khung giờ giao hàng có thể thay đổi theo
                                        thời gian hoạt động của cửa hàng
                                    </p>
                                    <p>
                                        Tất cả đơn hàng đặt ngoài khung giờ giao
                                        hàng sẽ được tự động chuyển sang khung
                                        giờ giao hàng tiếp theo ( sớm nhất 7h30
                                        ngày tiếp theo)
                                    </p>
                                    <p>
                                        Đối với đơn hàng Giao ngay, The Coffee
                                        House giao hàng trong vòng 30 phút từ
                                        khi xác nhận đơn hàng.
                                    </p>
                                    <p>
                                        Đối với đơn hàng Hẹn giờ, The Coffee
                                        House giao hàng trong vòng 30 phút so
                                        với thời gian hẹn giờ được chọn.
                                    </p>
                                    <p>
                                        Đối với các khu vực hơn 5km có xác nhận
                                        đồng ý của khách hàng về thời gian giao
                                        hàng hơn 30 phút, và đồng thuận về việc
                                        không đảm bảo chất lượng sản phẩm tốt
                                        nhất.
                                    </p>
                                    <h3>Chính sách hoàn trả hàng</h3>
                                    <p>
                                        Ngay tại thời điểm tài xế bàn giao sản
                                        phẩm cho khách hàng, khách hàng vui lòng
                                        tiến hành đồng kiểm tra sản phẩm với tài
                                        xế.
                                    </p>
                                    <p>
                                        Trường hợp sản phẩm không đúng hoặc sản
                                        phẩm bị hư hại, khách hàng có quyền từ
                                        chối nhận sản phẩm.
                                    </p>
                                    <p>
                                        Nếu tài xế không đồng ý nhận lại sản
                                        phẩm, khách hàng vui lòng liên hệ
                                        hotline 18006936 để được hỗ trợ ngay.
                                    </p>
                                    <p>
                                        Vậy, tất cả thức ăn và đồ uống bán trên
                                        The Coffee House sẽ không được hoàn lại
                                        khi khách hàng đã nhận và đã đồng ý nhận
                                        sản phẩm từ phía tài xế.
                                    </p>
                                    <h3>Khoảng cách giao hàng</h3>
                                    <p>
                                        Để đảm bảo chất lượng sản phẩm, The
                                        Coffee House chỉ hỗ trợ giao hàng trong
                                        phạm vi 5km từ địa chỉ cửa hàng gần nhất
                                        đến địa điểm khách hàng yêu cầu (khoảng
                                        cách tính theo đường bộ).
                                    </p>
                                    <p>
                                        The Coffee House có quyền từ chối yêu
                                        cầu giao hàng ngoài phạm vi 5km. Trong
                                        một vài trường hợp ngoại lệ, The Coffee
                                        House có thể hỗ trợ giao hàng với khoảng
                                        cách tối đa là 6km khi nhận được thỏa
                                        thuận giữa phía tài xế và khách hàng
                                        (The Coffee House hiện chưa đảm bảo về
                                        chất lượng sản phẩm tốt nhất cho các đơn
                                        hàng có khoảng cách giao hàng xa hơn
                                        5km, khách hàng vui lòng cân nhắc khi
                                        lựa chọn sản phẩm)
                                    </p>
                                    <h3>Phí vận chuyển</h3>
                                    <p>
                                        Đơn hàng có tổng thanh toán sau khi
                                        chiết khấu khuyến mãi trên 50.000đ được
                                        miễn phí vận chuyển.
                                    </p>
                                    <p>
                                        Đơn hàng có tổng thanh toán sau khi
                                        chiết khấu khuyến mãi dưới 50.000đ sẽ
                                        cộng thêm 10.000đ phí giao hàng trực
                                        tiếp trên đơn hàng.
                                    </p>
                                    <p>
                                        (*) Vào những dịp lễ, Tết, The Coffee
                                        House có thể sẽ thêm khoản phụ thu trực
                                        tiếp vào đơn hàng, khoản phụ thu này sẽ
                                        hiển thị ngay trên màn hình Thanh toán
                                        trước khi hoàn tất đặt hàng.
                                    </p>
                                    <p>
                                        Phí vận chuyển sẽ được The Coffee House
                                        thanh toán cho tài xế, khách hàng KHÔNG
                                        thanh toán thêm bất cứ khoản phí vận
                                        chuyển riêng nào cho tài xế.
                                    </p>
                                    <p>
                                        Trường hợp tài xế yêu cầu khách hàng
                                        thanh toán thêm bất kỳ khoản nào khác
                                        ngoài tổng giá trị đơn hàng, khách hàng
                                        vui lòng liên hệ 18006936 ngay để được
                                        hỗ trợ xử lý.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
    privacyRulesBtn.addEventListener('click', () => {
        privacyRules.innerHTML = `
        <div id="article" class="">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div class="article_wrap">
                            <div class="article_content_wrap">
                                <h1 class="line_after_heading section_heading">
                                    CHÍNH SÁCH BẢO MẬT THÔNG TIN
                                </h1>
                                <div class="article_content">
                                    <h3>BẢO MẬT THÔNG TIN</h3>
                                    <p>
                                        Chính sách bảo mật thông tin (“Chính
                                        sách bảo mật” hoặc “Chính sách”) này bao
                                        gồm các quy định liên quan đến việc thu
                                        thập, sử dụng, tiết lộ và/hoặc xử lý
                                        Thông Tin Khách Hàng (như được định
                                        nghĩa bên dưới) mà Quý khách đã cung cấp
                                        cho Công ty CP TM dịch vụ trà cà phê CN
                                        (“Công ty”) hoặc Công ty lưu giữ của Quý
                                        khách trong quá trình Quý khách đăng ký
                                        tài khoản, mua hàng, sử dụng các sản
                                        phẩm và dịch vụ của Công ty (“Sản Phẩm -
                                        Dịch Vụ”), hoặc khi Quý khách giao dịch
                                        với Công ty thông qua
                                        https://thecoffeehouse.com (“WEBSITE”).
                                        Chính sách này cũng quy định về nghĩa vụ
                                        của Công ty đối với Thông Tin Khách Hàng
                                        cũng như sự chấp thuận của Quý khách đối
                                        với việc thu thập, sử dụng, tiết lộ
                                        và/hoặc xử lý Thông Tin Khách Hàng của
                                        Công ty.
                                    </p>
                                    <h3>THÔNG TIN KHÁCH HÀNG</h3>
                                    <p>
                                        Thông tin khách hàng (“Thông Tin Khách
                                        Hàng”) bao gồm nhưng không giới hạn ở:
                                    </p>
                                    <p>
                                        Thông tin Quý khách cung cấp cho Công
                                        ty:
                                    </p>
                                    <ul>
                                        <li>
                                            Thông tin này bao gồm nhưng không
                                            giới hạn ở họ và tên, địa chỉ email,
                                            số điện thoại, địa chỉ giao hàng,
                                            tài khoản ngân hàng và thông tin
                                            thanh toán, thông tin trên biểu mẫu,
                                            tờ khai, đơn đăng ký, phiếu khảo
                                            sát, đơn phản hồi hoặc khiếu nại (dù
                                            trực tuyến hay bằng hình thức khác),
                                            các thông tin được gửi bởi hoặc cung
                                            cấp thông qua các thiết bị được sử
                                            dụng để truy cập vào WEBSITE, hoặc
                                            các thông tin mà Quý khách chủ động
                                            gửi đến cho Công ty.
                                        </li>
                                    </ul>
                                    <p>
                                        Thông tin có được do sự tương tác của
                                        Quý khách với Công ty:
                                    </p>
                                    <ul>
                                        <li>
                                            Thông tin này bao gồm bất kỳ thông
                                            tin nào khác về Quý khách khi Quý
                                            khách trao đổi với Công ty qua bất
                                            kỳ phương tiện nào (điện thoại, thư
                                            từ, fax, gặp gỡ trực tiếp, email,
                                            mạng xã hội, các ứng dụng), đăng
                                            nhập và sử dụng Sản Phẩm - Dịch Vụ
                                            hoặc tương tác thông qua WEBSITE, kể
                                            cả việc Quý khách đã sử dụng như thế
                                            nào.
                                        </li>
                                    </ul>
                                    <p>
                                        Thông tin về Quý khách mà Công ty tổng
                                        hợp hoặc có được từ những nguồn khác
                                        (nếu có).
                                    </p>
                                    <h3>SỰ CHẤP THUẬN CỦA KHÁCH HÀNG</h3>
                                    <p>
                                        Khi sử dụng Sản Phẩm - Dịch Vụ và/hoặc
                                        tương tác với Công ty, Quý khách xác
                                        nhận và đồng ý rằng Quý khách chấp nhận
                                        các quy định của Chính sách bảo mật này,
                                        và Quý khách đồng ý cho Công ty thu
                                        thập, sử dụng, tiết lộ và/hoặc xử lý
                                        Thông Tin Khách Hàng theo quy định mô tả
                                        trong đây. TRONG TRƯỜNG HỢP QUÝ KHÁCH
                                        KHÔNG ĐỒNG Ý VỚI CHÍNH SÁCH BẢO MẬT NÀY,
                                        QUÝ KHÁCH CÓ THỂ CÂN NHẮC DỪNG CUNG CẤP
                                        THÔNG TIN KHÁCH HÀNG CHO CÔNG TY; TỰ
                                        ĐĂNG NHẬP TÀI KHOẢN ĐỂ KIỂM TRA, CẬP
                                        NHẬT, ĐIỀU CHỈNH THÔNG TIN KHÁCH HÀNG
                                        HOẶC YÊU CẦU CÔNG TY THỰC HIỆN VIỆC NÀY.
                                        Chính sách bảo mật này có thể được sửa
                                        đổi, bổ sung nhằm hoàn thiện vào từng
                                        thời điểm, Công ty khuyến khích Quý
                                        khách thường xuyên xem lại để được cập
                                        nhật và bảo vệ quyền lợi của mình.
                                    </p>
                                    <h3>MỤC ĐÍCH SỬ DỤNG THÔNG TIN</h3>
                                    <ul>
                                        <li>
                                            Thông Tin Khách Hàng chỉ được Công
                                            ty sử dụng cho một hoặc tất cả các
                                            mục đích (“Mục Đích”) sau đây:
                                        </li>
                                        <li>
                                            Xử lý đơn đặt hàng và cung cấp Sản
                                            Phẩm - Dịch Vụ cho Quý khách;
                                        </li>
                                        <li>
                                            Cung cấp thông tin, chính sách, tiến
                                            độ mua bán liên quan đến Sản Phẩm -
                                            Dịch Vụ; hỗ trợ khi Quý khách có yêu
                                            cầu
                                        </li>
                                        <li>
                                            Xác nhận và thực hiện các giao dịch
                                            tài chính liên quan đến các khoản
                                            thanh toán trực tuyến của Quý khách
                                            khi Quý khách sử dụng Sản Phẩm -
                                            Dịch Vụ;
                                        </li>
                                        <li>
                                            Gửi thông tin sản phẩm, dịch vụ mới,
                                            các ưu đãi dành riêng cho Quý khách;
                                        </li>
                                        <li>
                                            Cập nhật về các sự kiện sắp tới,
                                            chương trình ưu đãi hoặc thông tin
                                            tuyển dụng nếu Quý khách đăng ký
                                            nhận email/sms thông báo;
                                        </li>
                                        <li>
                                            Lấy ý kiến khảo sát của Quý khách,
                                            nếu Quý khách đăng ký nhận email/sms
                                            thông báo;
                                        </li>
                                        <li>
                                            Phân tích, đánh giá và nâng cao chất
                                            lượng Sản Phẩm - Dịch Vụ;
                                        </li>
                                        <li>
                                            Cải thiện trải nghiệm của người dùng
                                            trên WEBSITE hoặc đối với Sản Phẩm -
                                            Dịch Vụ;
                                        </li>
                                        <li>
                                            Hỗ trợ Quý khách trong quá trình bảo
                                            hành, đổi trả hoặc hoàn tiền (tùy
                                            theo chính sách của Công ty vào từng
                                            thời điểm);
                                        </li>
                                        <li>
                                            Giải quyết các tranh chấp, khiếu nại
                                            liên quan;
                                        </li>
                                        <li>
                                            Ngăn ngừa các hoạt động phá hủy tài
                                            khoản của Quý khách hoặc giả mạo Quý
                                            khách;
                                        </li>
                                        <li>
                                            Theo yêu cầu của cơ quan nhà nước có
                                            thẩm quyền hoặc theo quy định của
                                            pháp luật vào từng thời điểm.
                                        </li>
                                    </ul>
                                    <h3>
                                        ĐỐI TƯỢNG TIẾP CẬN THÔNG TIN KHÁCH HÀNG
                                    </h3>
                                    <p>
                                        Trừ trường hợp pháp luật Việt Nam có quy
                                        định khác, chỉ những đối tượng dưới đây
                                        mới được tiếp cận Thông Tin Khách Hàng:
                                    </p>
                                    <ul>
                                        <li>
                                            Cơ quan nhà nước có thẩm quyền như
                                            Viện kiểm sát, tòa án, cơ quan công
                                            an điều tra, khi có yêu cầu cụ thể
                                            theo quy định của pháp luật Việt
                                            Nam;
                                        </li>
                                        <li>
                                            Ngân hàng hoặc các Tổ chức thẻ
                                            Visa/Mastercard liên quan đến hành
                                            vi vi phạm pháp luật hoặc gian lận
                                            thẻ tín dụng liên quan đến Khách
                                            hàng; và/hoặc
                                        </li>
                                        <li>
                                            Công ty, công ty mẹ, công ty con,
                                            công ty liên kết của Công ty, đại
                                            lý, nhà thầu, đơn vị cung cấp dịch
                                            vụ của Công ty, hoặc bên thứ ba, có
                                            liên quan đến việc Công ty cung cấp
                                            Sản Phẩm - Dịch Vụ cho Quý khách mới
                                            được tiếp cận Thông Tin Khách Hàng
                                            để thực hiện Mục Đích như quy định
                                            bên trên.
                                        </li>
                                    </ul>
                                    <h3>THỜI GIAN LƯU TRỮ</h3>
                                    <p>
                                        Thông Tin Khách Hàng được lưu trữ cho
                                        đến khi Quý khách có yêu cầu Công ty hủy
                                        bỏ, hoặc Quý khách tự đăng nhập và hủy
                                        bỏ thông tin. Trong mọi trường hợp,
                                        Thông Tin Khách Hàng được lưu trữ và bảo
                                        mật trên máy chủ của Công ty.
                                    </p>
                                    <h3>THÔNG TIN LIÊN HỆ CỦA CÔNG TY</h3>
                                    <p>
                                        Trong trường hợp Quý khách có bất kỳ
                                        thắc mắc nào liên quan đến Chính sách
                                        bảo mật này, Quý khách có thể liên hệ
                                        Công ty theo thông tin dưới đây:
                                    </p>
                                    <p>
                                        Công ty cổ phần thương mại dịch vụ trà
                                        cà phê VN
                                    </p>
                                    <p>
                                        Địa chỉ: Tầng 3,4 Toà nhà The Hub
                                        195/10E Điện Biên Phủ, Phường 15, Quận
                                        Bình Thạnh, TP Hồ Chí Minh
                                    </p>
                                    <p>Email: hi@thecoffeehouse.vn</p>
                                    <p>Hotline: 028.71.087.088</p>
                                    <h3>HIỆU LỰC</h3>
                                    <p>
                                        Chính sách bảo mật này có hiệu lực kể từ
                                        ngày 20/09/2021.
                                    </p>
                                </div>
                                <!-- <div class="share_article">
                                    <div
                                        class="fb-like fb_iframe_widget"
                                        data-href="https://thecoffeehouse.com"
                                        data-layout="button_count"
                                        data-action="like"
                                        data-size="small"
                                        data-show-faces="false"
                                        data-share="true"
                                        fb-xfbml-state="rendered"
                                        fb-iframe-plugin-query="action=like&amp;app_id=&amp;container_width=651&amp;href=https%3A%2F%2Fthecoffeehouse.com%2F&amp;layout=button_count&amp;locale=vi_VN&amp;sdk=joey&amp;share=true&amp;show_faces=false&amp;size=small"
                                    >
                                        <span
                                            style="
                                                vertical-align: bottom;
                                                width: 150px;
                                                height: 28px;
                                            "
                                            ><iframe
                                                name="f11a7a38c7c55a4"
                                                width="1000px"
                                                height="1000px"
                                                data-testid="fb:like Facebook Social Plugin"
                                                title="fb:like Facebook Social Plugin"
                                                frameborder="0"
                                                allowtransparency="true"
                                                allowfullscreen="true"
                                                scrolling="no"
                                                allow="encrypted-media"
                                                src="https://www.facebook.com/v3.1/plugins/like.php?action=like&amp;app_id=&amp;channel=https%3A%2F%2Fstaticxx.facebook.com%2Fx%2Fconnect%2Fxd_arbiter%2F%3Fversion%3D46%23cb%3Df3e2316d6483da8%26domain%3Dthecoffeehouse.com%26is_canvas%3Dfalse%26origin%3Dhttps%253A%252F%252Fthecoffeehouse.com%252Ff302f15c5331d78%26relation%3Dparent.parent&amp;container_width=651&amp;href=https%3A%2F%2Fthecoffeehouse.com%2F&amp;layout=button_count&amp;locale=vi_VN&amp;sdk=joey&amp;share=true&amp;show_faces=false&amp;size=small"
                                                style="
                                                    border: none;
                                                    visibility: visible;
                                                    width: 150px;
                                                    height: 28px;
                                                "
                                                class=""
                                            ></iframe
                                        ></span>
                                    </div>
                                    <script>
                                        (function (d, s, id) {
                                            var js,
                                                fjs =
                                                    d.getElementsByTagName(
                                                        s
                                                    )[0];
                                            if (d.getElementById(id)) return;
                                            js = d.createElement(s);
                                            js.id = id;
                                            js.src =
                                                'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.1';
                                            fjs.parentNode.insertBefore(
                                                js,
                                                fjs
                                            );
                                        })(
                                            document,
                                            'script',
                                            'facebook-jssdk'
                                        );
                                    </script>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    });
}
