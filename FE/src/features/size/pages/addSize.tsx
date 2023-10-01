import SizeForm from "../components/form";

const AddSize = () => {
  return (
    <div className="w-full h-max max-w-5xl mx-auto">
      <h2 className="text-blue-500 font-bold text-[30px] text-center mt-[10px]">
        Thêm mới Size
      </h2>
      <SizeForm contentButton="Thêm mới size" disabled={false} />
    </div>
  );
};

export default AddSize;
