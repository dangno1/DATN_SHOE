import "./style.css"

const Blog = () => {
    return (
        <div className="blogv1">
        <div className="product__title">
        BLOG CỦA CHÚNG TÔI
        </div>
        <div className="blog">
          <div className="blog__item">
            <div className="blog__img">
              <img src="https://yikan-store-demo.myshopify.com/cdn/shop/articles/blog1_1024x1024.jpg?v=1628044228" alt=""/>
              <div className="blog__time">
                <div className="blog__day">
                  10
                </div>
                <div className="blog__month">
                  aug
                </div>
              </div>
            </div>
            <div className="blog__content">
              <div className="blog__new">
                Mới
              </div>
              <div className="blog__title">
              TỐC ĐỘ CHẠY VÀ KẾT NỐI VỚI GIÀY
              </div>
              <div className="blog__subtitle">
              Các vận động viên chạy cạnh tranh luôn muốn giày chạy bộ nhẹ và các nhà sản xuất luôn đáp ứng
                cái đó
                sự mong muốn. Có một số bằng chứng cho thấy giày nặng hơn
              </div>
            </div>
          </div>
    
          <div className="blog__item">
            <div className="blog__img">
              <img src="https://yikan-store-demo.myshopify.com/cdn/shop/articles/blog3_1024x1024.jpg?v=1628045252" alt=""/>
              <div className="blog__time">
                <div className="blog__day">
                  11
                </div>
                <div className="blog__month">
                  aug
                </div>
              </div>
            </div>
            <div className="blog__content">
              <div className="blog__new">
                Mới
              </div>
              <div className="blog__title">
              GIÀY BÓNG RỔ LÀM BẠN NHẢY CAO HƠN ?
              </div>
              <div className="blog__subtitle">
              Hôm nay tôi muốn nói về một chủ đề mà thỉnh thoảng một số người lại nhắc tới. Tôi muốn giải thích điều gì đó cho tất cả các bạn bằng quan điểm CÁ NHÂN của tôi.
              </div>
            </div>
          </div>
    
          <div className="blog__item">
            <div className="blog__img">
              <img src="https://yikan-store-demo.myshopify.com/cdn/shop/articles/blog2_1024x1024.jpg?v=1628044790" alt=""/>
              <div className="blog__time">
                <div className="blog__day">
                  12
                </div>
                <div className="blog__month">
                  aug
                </div>
              </div>
            </div>
            <div className="blog__content">
              <div className="blog__new">
                Mới
              </div>
              <div className="blog__title">
              MỘT GIÀY BÓNG CHUYỀN TUYỆT VỜI
              </div>
              <div className="blog__subtitle">
              Những người lập công trong một trận bóng chuyền được coi là người dẫn dắt đội. Họ quyết định ai nhận bóng, vào thời điểm nào và có trách nhiệm bố trí cầu thủ sao cho đường chuyền bóng thành công và không ai phạm lỗi, đặc biệt là cầu thủ ở vị trí nhận bóng.
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Blog;
  