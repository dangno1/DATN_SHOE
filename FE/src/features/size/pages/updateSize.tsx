import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSizeQuery, useUpdateSizeMutation } from "@/api/size";
import { ISize } from "@/interface/size";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import sizeSchema from "@/schemas/size";
import ButtonSubmit from "../components/button.submit";

const UpdateSize = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    // reset,
  } = useForm<ISize>({
    resolver: joiResolver(sizeSchema),
  });
  const { id } = useParams<{ id: string }>();

  const { data: dataSize } = useGetSizeQuery(id || "");

  const [updateSize, { isLoading }] = useUpdateSizeMutation();

  useEffect(() => {
    // dataSize ? reset(dataSize) : reset();
  }, [dataSize]);

  const onSubmit = (data: ISize) => {
    console.log({ ...data, _id: id });
    updateSize({ ...data, _id: id })
      .unwrap()
      .then(() => alert("Cập nhật thành công"))
      .then(() => navigate("/admin/size"))
      .catch((errors) => console.log(errors));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full max-w-full px-[50px] ">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 capitalize"
          htmlFor="value">
          Product size
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="number"
          {...register("value")}
          placeholder="40..."
        />
        {errors.value && (
          <p className="text-red-500 text-[13px]">{errors.value.message}</p>
        )}
        {errors._id && (
          <p className="text-red-500 text-[13px]">{errors._id.message}</p>
        )}
        <div className="w-max grid grid-cols-2 items-center justify-items-start mt-[10px] gap-x-[10px] ">
          <ButtonSubmit content="Update size" disabled={isLoading} />
          <Link
            to={"/admin/size"}
            className="w-full decoration-[none] hover:decoration-[none] grid justify-start">
            <button className="capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] w-full max-w-[80px] font-medium text-white p-2 rounded-lg">
              quay lại
            </button>
          </Link>
        </div>
      </div>
    </form>
  );
};
export default UpdateSize;
