import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getDocs } from "firebase/firestore/lite";
import { DragDropContext } from "react-beautiful-dnd";

import { tasksCollection } from "../firebase/firebase";
import Brand from "../components/Brand";
import Column from "../components/Categories/Column";
import useDragAndDrop from "../hooks/useDragAndDrop";

function Home({ taskColumns }) {
  const router = useRouter();
  const [winReady, setWinReady] = useState(false);
  const { columns, handleDragEnd } = useDragAndDrop(taskColumns);

  useEffect(() => {
    setWinReady(true);
  }, []);

  const handleRefresh = () => {
    router.replace(router.asPath);
  };

  return (
    <div className="container mb-10">
      <Brand />

      {winReady && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="mt-10 lg:mt-32 flex md:flex-wrap flex-col md:flex-row justify-center lg:justify-between gap-10">
            {Object.values(columns).map((col) => (
              // Each column is a category ("In progress", "Completed" etc)
              <Column
                key={col.id}
                id={col.id}
                colName={col.title}
                tasks={col.list}
                handleRefresh={handleRefresh}
              />
            ))}
          </div>
        </DragDropContext>
      )}
    </div>
  );
}

export const getServerSideProps = async () => {
  const snapshot = await getDocs(tasksCollection);

  const tasks = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    updatedAt: doc.data().updatedAt.toDate().toString(),
  }));

  tasks.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));

  let byStatus = {};

  tasks.forEach((task) => {
    // if that particular status is not present in the obj
    // create a new key (task.status)
    if (!byStatus[task.status]) {
      byStatus[task.status] = {
        id: task.status,
        title: task.status,
        list: [task],
      };
    } else {
      // else just push that existing status array
      byStatus[task.status].list.push(task);
    }
  });

  const defaultArrangement = {
    "Not started": {
      list: [],
      id: "Not started",
      title: "Not started",
    },
    "In progress": {
      list: [],
      id: "In progress",
      title: "In progress",
    },
    Completed: {
      list: [],
      id: "Completed",
      title: "Completed",
    },
  };

  // rearrange
  byStatus = {
    "Not started": {
      ...defaultArrangement["Not started"],
      ...byStatus["Not started"],
    },
    "In progress": {
      ...defaultArrangement["In progress"],
      ...byStatus["In progress"],
    },
    Completed: {
      ...defaultArrangement["Completed"],
      ...byStatus["Completed"],
    },
    ...byStatus,
  };

  return {
    props: {
      taskColumns: byStatus,
    },
  };
};

export default Home;
