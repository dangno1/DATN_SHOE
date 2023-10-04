interface IState {
  content: string;
  disabled: boolean;
}

const ButtonSubmit = ({ content, disabled }: IState) => {
  return (
    <button
      className="capitalize bg-gradient-to-r from-[#6f89fb] to-[#5151ec] w-max font-medium text-white p-2 rounded-lg"
      type="submit"
      disabled={disabled}>
      {content}
    </button>
  );
};

export default ButtonSubmit;
