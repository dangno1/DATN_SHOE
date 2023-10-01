import ColorForm from "../components/form";

const UpdateColor = () => {
  return (
    <div className="w-full h-max max-w-5xl mx-auto">
      <h2 className="text-blue-500 font-bold text-[30px] text-center mt-[10px]">
        Cập nhật Color
      </h2>
      <ColorForm contentButton="Cập nhật color" disabled={false} />
    </div>
  );
};

export default UpdateColor;
