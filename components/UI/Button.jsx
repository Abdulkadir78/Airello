import { forwardRef } from "react";

const Button = forwardRef(
  ({ children, className, outlined, onClick, ...rest }, ref) => {
    const buttonVariantClasses = outlined
      ? "text-primary bg-white border-2 border-black"
      : "text-white bg-black";

    return (
      <button
        onClick={onClick}
        ref={ref}
        className={`${className} ${buttonVariantClasses} dark:bg-yellow rounded-md font-medium block 
        px-6 py-3`}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

export default Button;
