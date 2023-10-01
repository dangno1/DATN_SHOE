interface IState {
  content: string;
  disabled: boolean;
}

const ButtonSubmit = ({ content, disabled }: IState) => {
  return (
    <button
      className="bg-blue-500 text-white rounded p-2 capitalize"
      type="submit"
      disabled={disabled}>
      {content}
    </button>
  );
};

export default ButtonSubmit;
