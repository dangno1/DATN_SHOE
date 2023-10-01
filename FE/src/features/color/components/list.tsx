import { Outlet } from "react-router-dom";

const ColorList = () => {
  return (
    <div className="w-full h-max max-w-5xl mx-auto">
      <h2 className="text-blue-500 font-bold text-[30px] text-center mt-[10px]">
        Quản lý size
      </h2>
      <Outlet />
    </div>
  );
};

export default ColorList;
