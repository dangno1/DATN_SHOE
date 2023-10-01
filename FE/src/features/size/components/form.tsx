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
      .then(() => {
        window.onload = () => {
          const alert_success = document.querySelector(
            ".alert_success"
          ) as HTMLDivElement;
          if (alert_success) {
            !alert_success.style.display = "block";
          }
        };
      });
  };
  return (
    <>
      <div className="alert_success invalid:hidden w-[200px] h-[150px] bg-gray-500 rounded-[20px] grid place-items-center text-[1.5rem] text-white fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        Thành công
      </div>
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
        <ButtonSubmit
          content={contentButton}
          disabled={isLoading || disabled}
        />
      </form>
    </>
  );
};

export default SizeForm;
