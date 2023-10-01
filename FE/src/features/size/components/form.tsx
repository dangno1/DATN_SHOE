import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import sizeSchema from "@/schemas/size";
import { useAddSizeMutation } from "@/api/size";
import { ISize } from "@/interface/size";
import ButtonSubmit from "./button.submit";

interface IState {
  contentButton: string;
  disabled: false;
}

const SizeForm = ({ contentButton, disabled }: IState) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISize>({
    resolver: joiResolver(sizeSchema),
  });

  const [addSize, { isLoading }] = useAddSizeMutation();

  const onSubmit = (dataSize: ISize) => {
    addSize(dataSize)
      .unwrap()
      .then(() => alert("Thêm thành công"));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 capitalize"
          htmlFor="value">
          Product Size
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
      </div>
      <ButtonSubmit content={contentButton} disabled={isLoading || disabled} />
    </form>
  );
};

export default SizeForm;
