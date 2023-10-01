import ColorForm from "../components/form";

const AddColor = () => {
  return (
    <div className="w-full h-max max-w-5xl mx-auto">
      <h2 className="text-blue-500 font-bold text-[30px] text-center mt-[10px]">
        Thêm mới Color
      </h2>
      <ColorForm contentButton="Thêm mới color" disabled={false} />
    </div>
  );
};

export default AddColor;
