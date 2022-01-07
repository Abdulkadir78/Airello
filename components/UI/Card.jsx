import { forwardRef } from "react";

const Card = forwardRef(({ title, className, ...rest }, ref) => {
  return (
    <div
      ref={ref}
      className={`mt-3 shadow-md w-full rounded-md border-2 border-opacity-50 ${className}`}
      {...rest}
    >
      <h3 className="p-5 font-medium text-lg break-all">{title}</h3>
    </div>
  );
});

export default Card;
