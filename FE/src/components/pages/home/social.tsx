const Social = () => {
  return (
    <div className=" 2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
      <div className=" text-center">
        <h2 className=" font-semibold lg:text-4xl text-3xl lg:leading-9 md:leading-7 leading-9 text-gray-800 md:w-full w-9/12 mx-auto">
          WHO ARE YOU SHOPPING FOR?
        </h2>
      </div>
      <div className=" grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:grap-8 md:gap-6 gap-4 mt-10">
        <div className="relative group">
          <img
            src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_800,w_800/fw23_brand_campaign_launch_hp_gender_visual_nav_womens_d_e31f24de86.jpg"
            alt="A picture of a sitting dog"
            className=" lg:block hidden w-full "
          />
          <img
            src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_800,w_800/fw23_brand_campaign_launch_hp_gender_visual_nav_womens_d_e31f24de86.jpg"
            alt="A picture of a sitting dog"
            className="lg:hidden block w-full "
          />
          <div className=" flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-[490px] w-full" />
          <p className="font-bold uppercase">woman</p>
        </div>
        <div className="relative group">
          <img
            src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_800,w_800/fw23_brand_campaign_launch_hp_gender_visual_nav_mens_d_db216f2797.jpg"
            alt="A picture of a sitting dog"
            className=" lg:block hidden w-full "
          />
          <img
            src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_800,w_800/fw23_brand_campaign_launch_hp_gender_visual_nav_mens_d_db216f2797.jpg"
            alt="A picture of a sitting dog"
            className="lg:hidden block w-full "
          />
          <div className=" flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-[490px] w-full" />
          <p className="font-bold uppercase">Men</p>
        </div>
        <div className="relative group">
          <img
            src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_800,w_800/fw23_brand_campaign_launch_hp_gender_visual_nav_kids_d_806511dc65.jpg"
            alt="A picture of a sitting dog"
            className=" lg:block hidden w-full "
          />
          <img
            src="https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_800,w_800/fw23_brand_campaign_launch_hp_gender_visual_nav_kids_d_806511dc65.jpg"
            alt="A picture of a sitting dog"
            className="lg:hidden block w-full "
          />
          <div className=" flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-[490px] w-full" />
          <p className="font-bold uppercase">Kids</p>
        </div>
      </div>
    </div>
  );
};

export default Social;
