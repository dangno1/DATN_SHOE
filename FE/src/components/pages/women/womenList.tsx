import { useGetCategoryQuery } from "@/api/category";
import { IProduct } from "@/interface/product";
import { BsBagPlus } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
const WomenList = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const { data } = useGetCategoryQuery(id || "");
  console.log(data);

  return (
    <>
      <div className="text-center p-10">
        <h2 className="font-bold text-4xl mb-4 uppercase">Giày Nữ</h2>
        <h1 className="text-3xl">NÂNG CAO PHONG CÁCH CỦA BẠN</h1>
      </div>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {data?.products.map((product: IProduct) => (
          <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
            <Link to={`/detail/${product._id}`}>
              <img
                src={product?.image}
                alt="Product"
                className="h-80 w-72 object-cover rounded-t-xl"
              />
              <div className="px-4 py-3 w-72">
                <span className="text-gray-400 mr-3 uppercase text-xs">
                  {product?.brand}
                </span>
                <p className="text-lg font-bold text-black truncate block capitalize  hover:underline">
                  {product?.name}
                </p>
                <div className="flex items-center">
                  <p className="text-lg font-semibold text-black cursor-auto my-3">
                  {product?.variants[0].price.toLocaleString('vi-VN')} VND
                  </p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">
                    {product?.variants[0].discount} VND

                    </p>
                  </del>
                  <div className="ml-auto font-bold text-2xl">
                    <BsBagPlus />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
};

export default WomenList;
