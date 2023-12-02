import style from "./Button.module.css";

function Button({ children, onclick, disabled, type }) {
  return (
    <button
      type={type}
      onClick={onclick}
      className={`${style.btn}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
