const Account = () => {
  return (
    <div>
      <div className="col-s-12 theme___2YIgI bg-slate-100 pt-10 pb-10 ">
        <div className='max-w-screen-2xl mx-auto'>
          <h4 className='font-bold text-2xl align-items-center'>
            THÔNG TIN CỦA TÔI
          </h4>
          <p className="col-s-12">
            Hãy chỉnh sửa bất kỳ thông tin chi tiết nào bên dưới để tài khoản của bạn luôn được cập nhật.
          </p> <br />
          <div className="col-s-12">
            <h4 className="customSpacing___7RI69 gl-heading-font-set-standard-14___1p8HS font-bold text-xl">
              THÔNG TIN CHI TIẾT
            </h4>
            <div className="info-item align-items-center">
              <div>
                Nguyễn Qúy Minh PH 2 4 6 2 6
              </div>
              <div>
                01-01-2003
              </div>
              <div>
                Giới Tính
              </div>
              <div>
                Chỉnh sửa
              </div>
            </div> <br />
            <div>
              <h4 className='font-bold text-xl'>
                CHI TIẾT ĐĂNG NHẬP
              </h4>
              <h5>Email</h5>
              <div>
                minhnqph2345
              </div>
              <div>
                Chỉnh sửa
              </div>
            </div> <br />
            <div>
              <h5 className="font-bold text-xl">Mật khẩu</h5>
              <div>************</div>
              <div>
                Chỉnh sửa
              </div>
            </div> <br /> <br />
            <div>
              <h5 className="font-bold text-xl">Đăng xuất khỏi tất cả trình duyệt web</h5>
              <span> Thao tác này sẽ giúp bạn đăng xuất khỏi tất cả các trình duyệt web mà bạn đã sử dụng để truy cập vào trang web của </span>
              <span>adidas</span>
              <span>. Để đăng nhập lại, bạn sẽ phải nhập thông tin đăng nhập của mình.</span>
            </div>
            <button className='col-s-12 col-m-6'>
              <span className="gl-icon__wrapper">Đăng xuất</span>
            </button>
          </div>
        </div>
      </div> <br /> <br />

      <h1 className='max-w-screen-2xl mx-auto text-2xl align-items-center font-bold'>
        Bạn Cần Trợ Giúp?
      </h1> <br />

      <div className="col-s-12 theme___2YIgI bg-slate-100 pt-5 pb-5 ">
        <div className='max-w-screen-2xl mx-auto'>
          <div className='d-flex justify-between'>
            <div>sản phẩm</div>
            <div>Chương Trình Khuyến Mãi Thông Tin Công Ty</div>
            <div>Đặt Hàng & Thanh Toán</div>
            <div>Trả Lại Hàng & Hoàn Tiền</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account;
