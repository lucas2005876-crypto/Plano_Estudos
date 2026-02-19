import "./Button.style.css";

export function Button({ children, ...rest }) {
  return (
    <button className="btn-Save" {...rest}>
      {children}
    </button>
  );
}
