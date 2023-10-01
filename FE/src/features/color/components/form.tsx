import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import ButtonSubmit from "./button.submit";
import colorSchema from "@/schemas/color";
import { IColor } from "@/interface/color";
import { useAddColorMutation } from "@/api/color";

interface IState {
  contentButton: string;
  disabled: false;
}

const ColorForm = ({ contentButton, disabled }: IState) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IColor>({
    resolver: joiResolver(colorSchema),
  });

  const [addColor, { isLoading }] = useAddColorMutation();

  const onSubmit = (dataColor: IColor) => {
    addColor(dataColor)
      .unwrap()
      .then(() => alert("Thêm thành công"));
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2 capitalize"
          htmlFor="value">
          Product color
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          {...register("value")}
          placeholder="Trắng..."
        />
        {errors.value && (
          <p className="text-red-500 text-[13px]">{errors.value.message}</p>
        )}
      </div>
      <ButtonSubmit content={contentButton} disabled={isLoading || disabled} />
    </form>
  );
};

export default ColorForm;
