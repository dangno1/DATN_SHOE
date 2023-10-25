import { useGetCategoryQuery } from "@/api/category";
import { IProduct } from "@/interface/product";
import { BsBagPlus } from "react-icons/bs";
import { useParams } from "react-router-dom";

const Kidcontent = () => {
 const {id} = useParams<{id: string}>()
 console.log(id);
 const {data} = useGetCategoryQuery(id || "")
 console.log(data);
 
 
  return (
    <>
      <div className="container max-w-full mx-auto  py-12 px-4 sm:px-6 lg:px-8 ">
        <div>
          <iframe
            className="w-full"
            height="800"
            src="https://www.youtube.com/embed/SbR_s41aUC0?si=yhf74ha7bmyCxJZm"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        {/* <div className="">
          <img
            src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_875,c_limit/816ddea1-9656-49e0-962a-7b08be9b0b4d/nike-kids.png"
            alt=""
          />
        </div> */}
      </div>

      <div className=" mx-auto max-w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="p-8">
          <h1 className="font-bold text-6xl mb-4 text-center uppercase">
          Giày trẻ em
          </h1>
          <p className="text-center font-normal  text-2xl ">
          Mickey and Friends từ Disney mang đến nét vui nhộn cho bộ sưu tập mới cho trẻ em
          </p>
        </div>
        <div className="pt-6">
          <section
            id="Projects"
            className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-14"
          >
           {data?.products.map((product: IProduct)=>(
             <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
             <a href="#">
               <img
                 src={product?.image}
                 alt="Product"
                 className="h-80 w-72 object-cover rounded-t-xl"
               />
               <div className="px-4 py-3 w-72">
                 <span className="text-gray-400 mr-3 uppercase text-xs">
                 {product?.brand}
                 </span>
                 <p className="text-lg font-bold text-black truncate block capitalize hover:underline">
                 {product?.name}
                 </p>
                 <div className="flex items-center">
                   <p className="text-lg font-semibold text-black cursor-auto my-3">
                   {product?.variants[0].price}
                   </p>
                   <del>
                     <p className="text-sm text-gray-600 cursor-auto ml-2">
                       $199
                     </p>
                   </del>
                   <div className="ml-auto font-bold text-2xl">
                     <BsBagPlus />
                   </div>
                 </div>
               </div>
             </a>
           </div>
           ))}

          </section>
        </div>
      </div>

      <div className=" mx-auto max-w-full py-12 px-4 sm:px-6 lg:px-8">
        <div>
          <div className="pt-6">
            <h1 className="font-medium text-3xl mb-4  hover:underline">Nổi Bật</h1>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-4">
              <div className="">
                <img
                  className="w-full h-full"
                  src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/t_prod/h_1016,c_limit/84989cd7-feb4-4ebf-9456-3d9614295562/nike-kids.png"
                  alt=""
                />
              </div>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <img
                    className="w-full h-full"
                    src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_875,c_limit/3b7b4ddb-b8a1-44b2-a3d2-441b33a8a26b/nike-kids.png"
                    alt=""
                  />
                </div>
                <div>
                  <img
                    className="w-full h-full"
                    src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_875,c_limit/3b7b4ddb-b8a1-44b2-a3d2-441b33a8a26b/nike-kids.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Kidcontent;
