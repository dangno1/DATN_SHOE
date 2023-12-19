import { useGetCategoryQuery } from "@/api/category";
import { IProduct } from "@/interface/product";
import { Link } from "react-router-dom";
const Similarproduct = (props: { categoryId: string, productId: string }) => {
  const { data } = useGetCategoryQuery(props.categoryId);

  const productData = data?.products?.filter(product => product._id != props.productId).slice(0, 8)

  return (
    <div>
      <div className=" 2xl:container 2xl:mx-auto md:py-12 lg:px-20 md:px-6 py-9 px-4">
        <div className="flex items-center justify-between">
          <div className="relative w-full h-[43px] text-[26px] font-semibold uppercase text-center before:content-[''] before:w-[100px] before:h-[3px] before:bg-[#51adcd] before:absolute before:bottom-0 before:left-[50%] before:translate-x-[-50%]">
            Sản phẩm khác
          </div>
        </div>
        <section
          id="Projects"
          className="flex flex-wrap gap-16 mt-10"
        >
          {productData?.length
            ? productData.map((product: IProduct) => (
              <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl" key={product._id}>
                <Link to={`/detail/${product._id}`} onClick={() => window.scrollTo(0, 0)}>
                  <img
                    src={String(product?.image)}
                    alt="Product"
                    className="h-80 w-72 object-cover rounded-t-xl"
                  />
                  <div className="px-4 py-3 w-72">
                    <p className="text-lg font-bold text-black truncate block capitalize hover:underline">
                      {product?.name}
                    </p>
                    <div className="flex items-center">
                      <p className="text-lg font-semibold cursor-auto my-3 text-red-500">
                        {product?.variants[0].discount?.toLocaleString('vi-VN')} VND
                      </p>
                      <del>
                        <p className="text-sm text-gray-600 cursor-auto ml-2">
                          {product?.variants[0].price?.toLocaleString('vi-VN')} VND
                        </p>
                      </del>
                    </div>
                  </div>
                </Link>
              </div>
            ))
            : <div className="w-full text-center text-[20px] my-[20px] ">Đang cập nhật</div>}
        </section>
      </div>
    </div>
  );
};

export default Similarproduct;
