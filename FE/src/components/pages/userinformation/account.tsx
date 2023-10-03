const Account = () => {
  return (
    <div>
      <div className="max-w-screen-2xl mx-auto p-14 ">
        <h4 className="font-bold text-2xl align-items-center pb-5">
          THÔNG TIN CỦA TÔI
        </h4>
        <p className="col-s-12">
          Hãy chỉnh sửa bất kỳ thông tin chi tiết nào bên dưới để tài khoản của
          bạn luôn được cập nhật.
        </p>
        <br />
        <hr />
        <div className="col-s-12">
          <h4 className="customSpacing___7RI69 gl-heading-font-set-standard-14___1p8HS font-bold text-xl pb-5 pt-3">
            THÔNG TIN CHI TIẾT
          </h4>
          <div className="info-item align-items-center">
            <div>Nguyễn Qúy Minh PH 2 4 6 2 6</div>
            <div>01-01-2003</div>
            <div>Giới Tính: Nam</div>
            <div className="text-blue-500 cursor-pointer">Chỉnh sửa</div>
          </div>
          <br />
          <hr />
          <div>
            <h4 className="font-bold text-xl pt-5 pb-3">CHI TIẾT ĐĂNG NHẬP</h4>
            <h5>Email</h5>
            <div>minhnqph2345@gmail.com</div>
            <div className="text-blue-500 cursor-pointer">Chỉnh sửa</div>
          </div>
          <br />
          <hr />
          <div>
            <h5 className="font-bold text-xl pt-5 pb-3">Mật khẩu</h5>
            <div>************</div>
            <div className="text-blue-500 cursor-pointer">Chỉnh sửa</div>
          </div>
          <br /> <br />
          <hr />
          <div>
            <h5 className="font-bold text-xl pt-5 pb-3">
              Đăng xuất khỏi tất cả trình duyệt web
            </h5>
            <span>
              Thao tác này sẽ giúp bạn đăng xuất khỏi tất cả các trình duyệt web
              mà bạn đã sử dụng để truy cập vào trang web của
            </span>
            <span>adidas</span>
            <span>
              . Để đăng nhập lại, bạn sẽ phải nhập thông tin đăng nhập của mình.
            </span>
          </div>
          <button className="col-s-12 col-m-6">
            <span className="gl-icon__wrapper text-red-500 cursor-pointer">Đăng xuất</span>
          </button>
        </div>
      </div>
      <br /> <br />
      <br />
      <div className="max-w-screen-2xl mx-auto p-14 ">
        <h1 className="max-w-screen-2xl mx-auto text-2xl align-items-center font-bold pb-5">
          Bạn Cần Trợ Giúp?
        </h1>
        <div className="d-flex justify-between">
          <div>Sản phẩm</div>
          <div>Chương Trình Khuyến Mãi Thông Tin Công Ty</div>
          <div>Đặt Hàng & Thanh Toán</div>
          <div>Trả Lại Hàng & Hoàn Tiền</div>
        </div>
      </div>
    </div>
  );
};

export default Account;
