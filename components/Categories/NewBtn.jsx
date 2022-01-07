import { BsPlus } from "react-icons/bs";

function NewBtn({ onClick }) {
  return (
    <button className="text-gray-400 text-lg mt-5 pr-2" onClick={onClick}>
      <BsPlus size={24} className="text-gray-400 inline -mt-1" />
      New
    </button>
  );
}

export default NewBtn;
