import { Outlet } from "react-router-dom";

const SizeList = () => {
  return (
    <div className="w-full h-max max-w-[screen] mx-auto px-[50px]">
      <h2 className="text-blue-500 font-bold text-[30px] my-[20px] uppercase text-left">
        Quản lý size
      </h2>
      <Outlet />
    </div>
  );
};

export default SizeList;
