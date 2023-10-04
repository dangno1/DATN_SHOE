import { Link, useNavigate } from "react-router-dom";
import { useAddSizeMutation } from "@/api/size";
import { ISize } from "@/interface/size";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import sizeSchema from "@/schemas/size";
import ButtonSubmit from "../components/button.submit";

const AddSize = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISize>({
    resolver: joiResolver(sizeSchema),
  });

  const [addSize, { isLoading }] = useAddSizeMutation();

  const onSubmit = (data: ISize) => {
    addSize(data)
      .unwrap()
      .then(() => alert("Thêm mới size thành công"));
    navigate("/admin/size");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative w-full h-max px-[50px] mt-[5px] ">
        <label
          className="text-gray-600 px-[8px] text-sm lowercase bg-white absolute top-[-20px] left-[60px] translate-y-[50%] "
          htmlFor="value">
          product size
        </label>
        <input
          className="h-[40px] shadow appearance-none border border-gray-500 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-pink-600 focus:border-[none] focus:shadow-outline"
          type="number"
          {...register("value")}
          placeholder=" "
        />
        {errors.value && (
          <p className="text-pink-600 text-[13px] font-[600]">
            {errors.value.message}
          </p>
        )}
        <div className="w-max grid grid-cols-2 items-center justify-items-start mt-[10px] gap-x-[10px] ">
          <ButtonSubmit content="Thêm mới size" disabled={isLoading} />
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
export default AddSize;
