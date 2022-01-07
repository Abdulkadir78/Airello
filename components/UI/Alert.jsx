import { IoIosClose } from "react-icons/io";

const alertTypeToColorClasses = {
  success: "bg-green-100 text-green-700",
  error: "bg-red-100 text-red-700",
  warning: "bg-yellow-100 text-yellow-700",
  info: "bg-cyan-100 text-cyan-700",
};

function Alert({ type, message, onClose, className }) {
  const colorClasses =
    alertTypeToColorClasses[type] || alertTypeToColorClasses.error;

  return (
    <div
      className={`flex justify-between items-center px-4 py-3 mt-5
        rounded-md ${colorClasses} ${className}`}
    >
      <h4>{message}</h4>

      {onClose && (
        <button onClick={onClose}>
          <IoIosClose size={35} />
        </button>
      )}
    </div>
  );
}

export default Alert;
