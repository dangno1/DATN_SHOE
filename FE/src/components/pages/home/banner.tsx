/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";

function Slider() {
 

  return (
    <div className="sliderAx h-auto ">
      {/* Điều chỉnh tương ứng với code jQuery */}
      <div 
      //  id="slider-1" 
      className={`container mx-auto transition duration-400`} >
        {/* Điều chỉnh tương ứng với code jQuery */}
        <div  className="bg-cover bg-center w-full h-[400px] text-white py-24 px-10 object-fill" style={{ backgroundImage:
              "url(https://brand.assets.adidas.com/image/upload/f_auto,q_auto,fl_lossy/if_w_gt_1920,w_1920/viVN/Images/tennis-SS23-cybersonic-launch-PLP-masthead-small-dual-d_tcm337-974155.jpg)",
              
          }}>
          <div className="md:w-1/2 p-10">
            <p className="text-3xl font-bold">Hello Nike App</p>
            <p className="text-2xl mb-10 mt-4 leading-none">
              New Styles on Sale: Up to 40% Off Shop All Our New
              Markdowns
            </p>
            <a
              href="#"
              className="bg-white py-4 px-8 text-black font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
            >
              Mua ngay
            </a>
          </div>
        </div>
        <br />
      </div>

     
    </div>
  );
}

export default Slider;
