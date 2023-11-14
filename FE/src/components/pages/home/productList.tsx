import { useGetProductsQuery } from "@/api/product";
import { IProduct } from "@/interface/product";
import { useEffect } from "react";
import { useState } from "react";
import { BsBagPlus} from "react-icons/bs";
import { ICart } from "@/interface/cart";
import { useCreateCartMutation } from "@/api/cart";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const { data } = useGetProductsQuery(false);

  console.log(data);
  const [alex, setAlex] = useState<IProduct[]>([]);
  useEffect(() => {
    if (data) {
      const productRandom = [];
      const dataCopy = [...data];
      for (let index = 0; index < 4 && dataCopy.length > 0; index++) {
        const indexRandom = Math.floor(Math.random() * dataCopy.length);
        const randomProduct = dataCopy.splice(indexRandom, 1)[0];
        productRandom.push(randomProduct);
      }
      setAlex(productRandom);
    }
  }, [data]);
  console.log(alex);
  const [addCart] = useCreateCartMutation();
  const [userData, setUserData] = useState(localStorage);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setUserData(userData);
    }
  }, []);
  const navigate = useNavigate();
  const handleAddCar = async() => {
    if (!userData.username || !userData.email || !userData.address) {
      message.
error({
  content: "Bạn chưa có tài khoản. Vui lòng đăng nhập hoặc đăng ký để thêm sản phẩm vào giỏ hàng.",
  duration: 5, 
});
setTimeout(() => {   
  navigate("/signup");},3000);
      return;
    }
    if (data && alex.length > 0) {
      const productToAdd:ICart = {
        userName: userData.fullname,
        userEmail: userData.email,
        userAddress: userData.address,
        productName: alex[0].name,
        quantity: 1,
        price: alex[0].variants[0].price,
        initialPrice: alex[0].variants[0].price,
        totalPrice: alex[0].variants[0].price,
        category: alex[0].categoryId,
        image: String(alex[0].image),
        color: alex[0].variants[0].colorId,
        status:String(alex[0].variants[0].status)
      };

      const data = await addCart(productToAdd);
      message.info("Đã thêm sản phẩm vào giỏ hàng thành công")
      data && setTimeout(() => {   
        navigate("/cart");},2000);
      console.log(data);
      
      
    } else {
      console.error("data is not defined.");
    }
  };
  return (
    <>
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4 uppercase">sản phẩm mới nhất</h1>
      </div>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-14"
      >
        {alex?.map((product: IProduct) => (
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
                  {product?.variants[0].price.toLocaleString('vi-VN')} VND
                  </p>
                  <del>
                    <p className="text-sm text-gray-600 cursor-auto ml-2">
                    {product?.variants[0].discount} VND
                    </p>
                  </del>
                 
                  <div className="ml-auto font-bold text-2xl" onClick={handleAddCar}>
                    <BsBagPlus  />
                  </div>
                  
                </div>
              </div>
            </a>
          </div>
        ))}
      </section>
    </>
  );
};

export default ProductList;
