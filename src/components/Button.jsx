
// import './Button.css';

function Button({ children, onClick, type = 'button', variant = 'primary',text }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {text}
    </button>
  );
}

export default Button;
