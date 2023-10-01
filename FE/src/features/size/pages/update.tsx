import SizeForm from "../components/form";

const UpdateSize = () => {
  return (
    <div className="w-full h-max max-w-5xl mx-auto">
      <h2 className="text-blue-500 font-bold text-[30px] text-center mt-[10px]">
        Cập nhật Size
      </h2>
      <SizeForm contentButton="Cập nhật size" />
    </div>
  );
};

export default UpdateSize;
