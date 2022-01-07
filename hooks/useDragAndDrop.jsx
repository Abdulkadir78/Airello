import { useState } from "react";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore/lite";

import { db } from "../firebase/firebase";

function useDragAndDrop(initialColumns) {
  const [columns, setColumns] = useState(initialColumns);

  const updateDocInDb = async (docId, updatedTask) => {
    const docRef = doc(db, `tasks/${docId}`);
    try {
      await updateDoc(docRef, {
        ...updatedTask,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDragEnd = async ({ source, destination }) => {
    // Make sure we have a valid destination
    if (!destination) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return null;

    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((_, index) => index !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        title: start.title,
        list: newList,
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));

      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter(
        (_, index) => index !== source.index
      );

      // Create a new start column
      const newStartCol = {
        id: start.id,
        title: start.title,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        title: end.title,
        list: newEndList,
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));

      const sourceTask = columns[source.droppableId].list[source.index];
      const updatedTask = sourceTask
        ? {
            ...sourceTask,
            status: destination.droppableId,
          }
        : {};
      await updateDocInDb(sourceTask.id, updatedTask);

      return null;
    }
  };

  return { columns, handleDragEnd };
}

export default useDragAndDrop;
