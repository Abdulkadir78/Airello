import { useState } from "react";
import { useRouter } from "next/router";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Card from "../UI/Card";
import NewBtn from "./NewBtn";
import AddTaskModal from "./AddTaskModal";
import CategoryTitle from "./CategoryTitle";
import categoryColors from "../../utils/categoryColors";

function Column({ id, colName, tasks, handleRefresh }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const toggleModal = () => {
    setOpen((prevState) => !prevState);
  };

  const handlePush = (id) => {
    router.push(`/tasks/${id}`);
  };

  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="flex-grow basis-[30%] mt-10 lg:mt-0 min-h-0"
        >
          {open && (
            <AddTaskModal
              open={open}
              toggleModal={toggleModal}
              handleRefresh={handleRefresh}
              category={colName}
            />
          )}

          <CategoryTitle
            title={colName}
            bgColor={categoryColors[colName]}
            numberOfTasks={tasks?.length}
            onAddClick={toggleModal}
          />

          {tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provided) => (
                <Card
                  key={task.id}
                  title={task.title}
                  onClick={() => handlePush(task.id)}
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                />
              )}
            </Draggable>
          ))}

          {provided.placeholder}
          <NewBtn onClick={toggleModal} />
        </div>
      )}
    </Droppable>
  );
}

export default Column;
