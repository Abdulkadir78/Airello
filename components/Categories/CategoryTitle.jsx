import { BsThreeDots, BsPlus } from "react-icons/bs";

function CategoryTitle({ title, numberOfTasks, bgColor, onAddClick }) {
  return (
    <div className="flex justify-between">
      <div className="flex">
        <h5 className={`${bgColor} w-28 px-2 rounded-sm`}>{title}</h5>
        <span className="font-medium text-gray-400 ml-3 w-14 truncate">
          {numberOfTasks}
        </span>
      </div>

      <div className="flex">
        <button>
          <BsThreeDots size={22} className="text-gray-400" />
        </button>
        <button className="ml-2" onClick={onAddClick}>
          <BsPlus size={28} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}

export default CategoryTitle;
