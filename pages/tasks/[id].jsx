import { doc, getDoc } from "firebase/firestore/lite";

import { db } from "../../firebase/firebase";
import TaskById from "../../components/Task-by-id/TaskById";

function ById({ task }) {
  return <TaskById task={task} />;
}

export const getServerSideProps = async (context) => {
  const docRef = await doc(db, "tasks", context.params.id);
  const taskDoc = await getDoc(docRef);
  const task = {
    id: taskDoc.id,
    ...taskDoc.data(),
    updatedAt: taskDoc.data()?.updatedAt.toDate().toString() || null,
  };

  return {
    props: {
      task: task?.updatedAt ? task : null,
    },
  };
};

export default ById;
