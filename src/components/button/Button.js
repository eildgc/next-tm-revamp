"use client";

const Button = ({ children, disabled, type, className = '', variant, handler }) => {
  return (
    <button
      onClick={handler}
      type={type}
      disabled={disabled}
      className={`px-7 py-5 text-xl font-medium uppercase rounded-xl border ${
        disabled
          ? "bg-white text-slate-700 hover:bg-white"
          : "hover:bg-sky-800 transition ease-in-out delay-75 duration-100"
      } ${variant === "secondary" ? "text-slate-900 hover:text-white" : "bg-sky-600" } ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
