// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import "./style.css"

const Social = () => {
  return (
    <div className="banner__v2">
    <div className="banner__v2--item">
      <Link to='/Men/652245a9a28ec9214f4be70a'>
        <img src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_800,w_800/fw23_brand_campaign_launch_hp_gender_visual_nav_mens_d_db216f2797.jpg" alt=""/>
      
      <div className='banner__v2--bg'>
        <div className='banner__v2--content'>
          <div className='banner__v2--subtitle'>Nam</div>
          <h3 className='banner__v2--title'>Sản Phẩm Dành Cho Nam</h3>
          <div className='banner__v2--flex'>
            <Link to='#'>Xem Thêm</Link>
            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
              <path
                d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
            </svg>
          </div>
        </div>
      </div>
      </Link>
    </div>

    <div className="banner__v2--item">
      <Link to='/Women/652258d4a28ec9214f4be747'>
        <img src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_800,w_800/fw23_brand_campaign_launch_hp_gender_visual_nav_womens_d_e31f24de86.jpg" alt=""/>
      
      <div className='banner__v2--bg'>
        <div className='banner__v2--content'>
          <div className='banner__v2--subtitle'>Nữ</div>
          <h3 className='banner__v2--title'>Sản Phẩm Dành Cho Nữ</h3>
          <div className='banner__v2--flex'>
            <a href='#'>Xem Thêm</a>
            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
              <path
                d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
            </svg>
          </div>
        </div>
      </div>
      </Link>
    </div>

    <div className="banner__v2--item">
      <Link to='/Kids/65225bd7a28ec9214f4be75a'>
        <img src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_800,w_800/fw23_brand_campaign_launch_hp_gender_visual_nav_kids_d_806511dc65.jpg" alt=""/>
     
      <div className='banner__v2--bg'>
        <div className='banner__v2--content'>
          <div className='banner__v2--subtitle'>Trẻ Em</div>
          <h3 className='banner__v2--title'>Sản Phẩm Dành Cho Trẻ Em</h3>
          <div className='banner__v2--flex'>
            <a href='#'>Xem Thêm</a>
            <svg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='0 0 512 512'>
              <path
                d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
            </svg>
          </div>
        </div>
      </div>
      </Link>
    </div>
  </div>
  );
};

export default Social;