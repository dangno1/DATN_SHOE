import ProductForm from "../components/form";

const AddProduct = () => {
  return (
    <div className="w-full h-max max-w-5xl mx-auto">
      <h2 className="text-blue-500 font-bold text-[30px] text-center mt-[10px]">
        Thêm mới sản phẩm
      </h2>
      <ProductForm />
    </div>
  );
};

export default AddProduct;
