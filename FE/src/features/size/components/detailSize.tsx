import { useGetSizeQuery, useRemoveSizeMutation } from "@/api/size";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteSweep } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { IProduct } from "@/interface/product";

const DetailSize = () => {
  const { id } = useParams();
  const { data: detailSizeData } = useGetSizeQuery(id || "");

  const [deleteSize] = useRemoveSizeMutation();
  const handleDeleteSize = (id: string) => {
    deleteSize(id);
    alert("Xóa thành công");
  };

  return (
    <div className="max-w-screen-2xl m-auto shadow-lg">
      <Link
        to={"add"}
        className="w-full decoration-[none] hover:decoration-[none] grid place-items-end">
        <button className="bg-gradient-to-r from-[#6f89fb] to-[#5151ec] w-max font-medium text-white mt-3 mb-3 p-2 rounded-lg">
          Thêm mới size
        </button>
      </Link>
      <table className="w-full text-sm text-left text-gray-500 border border-collapse p-0 m-0 box-border">
        <thead className="text-gray-400 uppercase bg-gray-50">
          <tr className="text-center">
            <th className="py-[10px] border border-slate-200">ID</th>
            <th className="py-[10px] border border-slate-200">Value</th>
            <th className="py-[10px] border border-slate-200">Product</th>
            <th className="py-[10px] border border-slate-200">createdAt</th>
            <th className="py-[10px] border border-slate-200">updatedAt</th>
            <th className="py-[10px] border border-slate-200">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border border-slate-200 text-gray-500 text-center">
            <td className="py-[10px] border border-slate-200 font-semibol">
              {detailSizeData?._id}
            </td>
            <td className="py-[10px] border border-slate-200 font-semibold w-auto">
              {detailSizeData?.value}
            </td>
            <td className="py-[10px] border border-slate-200 font-semibold w-auto">
              {detailSizeData?.products?.map(({ name, _id }: IProduct) => (
                <div
                  key={_id}
                  className="w-max grid grid-cols-1 place-items-center py-2">
                  <span>{name}</span>
                </div>
              ))}
            </td>
            <td className="py-[10px] border border-slate-200 font-semibold w-auto">
              {detailSizeData?.createdAt}
            </td>
            <td className="py-[10px] border border-slate-200 font-semibold w-auto">
              {detailSizeData?.updatedAt}
            </td>
            <td className="py-[10px] border w-[200px] max-w-[200px]">
              <div className="cursor-pointer w-max h-max mx-auto grid grid-cols-3 place-items-center font-semibold">
                <div
                  className="hover:text-red-500"
                  onClick={() =>
                    confirm("Xóa size!") &&
                    handleDeleteSize(String(detailSizeData?._id))
                  }>
                  <MdDeleteSweep className="fill-red-500 w-[25px] h-[25px]" />
                </div>
                <div className="w-[2px] h-full bg-gray-200"></div>
                <Link
                  to={`/admin/size/update/${detailSizeData?._id}`}
                  className="decoration-[none]">
                  <BiEditAlt className="fill-blue-500 w-[25px] h-[25px]" />
                </Link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DetailSize;
