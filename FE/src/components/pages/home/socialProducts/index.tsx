import { Link } from "react-router-dom";
import "./style.css"

const Social = () => {
  return (
    <div className="banner__v2">
      <div className="banner__v2--item">
        <Link to='/Men/652245a9a28ec9214f4be70a'>
          <img src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_800,w_800/fw23_brand_campaign_launch_hp_gender_visual_nav_mens_d_db216f2797.jpg" alt="" />
          <div className='banner__v2--bg'>
            <div className='banner__v2--content'>
              <div className='banner__v2--subtitle'>Nam</div>
              <h3 className='banner__v2--title'>Sản Phẩm Dành Cho Nam</h3>
            </div>
          </div>
        </Link>
      </div>

      <div className="banner__v2--item">
        <Link to='/Women/652258d4a28ec9214f4be747'>
          <img src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_800,w_800/fw23_brand_campaign_launch_hp_gender_visual_nav_womens_d_e31f24de86.jpg" alt="" />
          <div className='banner__v2--bg'>
            <div className='banner__v2--content'>
              <div className='banner__v2--subtitle'>Nữ</div>
              <h3 className='banner__v2--title'>Sản Phẩm Dành Cho Nữ</h3>
            </div>
          </div>
        </Link>
      </div>

      <div className="banner__v2--item">
        <Link to='/Kids/65225bd7a28ec9214f4be75a'>
          <img src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_800,w_800/fw23_brand_campaign_launch_hp_gender_visual_nav_kids_d_806511dc65.jpg" alt="" />
          <div className='banner__v2--bg'>
            <div className='banner__v2--content'>
              <div className='banner__v2--subtitle'>Trẻ Em</div>
              <h3 className='banner__v2--title'>Sản Phẩm Dành Cho Trẻ Em</h3>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Social;