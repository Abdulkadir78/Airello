import {
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore/lite";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { MdDelete } from "react-icons/md";
import Link from "next/link";

import { db } from "../../firebase/firebase";
import Meta from "../Meta";
import Brand from "../Brand";
import Alert from "../UI/Alert";
import Button from "../UI/Button";
import HomeBtn from "../Categories/HomeBtn";
import CategoryRadio from "./CategoryRadio";
import categoryColors from "../../utils/categoryColors";

function TaskById({ task }) {
  const router = useRouter();
  const titleRef = useRef();
  const descriptionRef = useRef();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [category, setCategory] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const resetError = () => {
    setError("");
  };

  const resetSuccess = () => {
    setSuccess("");
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleDelete = async () => {
    const docRef = doc(db, `tasks/${task.id}`);
    try {
      await deleteDoc(docRef);
      router.push("/");
    } catch (err) {
      setError("Something went wrong");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleValue = titleRef.current?.value?.trim();
    const descriptionValue = descriptionRef.current?.value?.trim();

    if (
      titleValue !== task.title ||
      descriptionValue !== task.description ||
      task.status !== category
    ) {
      const updatedTask = {
        title: titleValue,
        description: descriptionValue,
        status: category || task.status,
      };

      const docRef = doc(db, `tasks/${task.id}`);
      try {
        await updateDoc(docRef, {
          ...updatedTask,
          updatedAt: serverTimestamp(),
        });
        setIsUpdated(true);
      } catch (err) {
        setError("Something went wrong");
        return;
      }
    }
    setSuccess("Task updated successfully");
  };

  return (
    <>
      <Meta title={task?.status} />
      <div className="container">
        <Brand />
        {task && (
          <div className="my-10 xl:mb-0">
            <HomeBtn />
          </div>
        )}
      </div>

      {task ? (
        <div className="flex flex-col justify-center h-screen items-center mb-20 xl:mb-0">
          <div className="md:border-2 lg:w-[50%] p-5 sm:p-10 relative">
            <button className="absolute top-5 right-5" onClick={handleDelete}>
              <MdDelete
                size={25}
                title="Delete task"
                className="text-red-400"
              />
            </button>

            <h1 className="w-full text-center text-xl mt-14 md:mt-7">
              Update a task
            </h1>

            <div className="flex justify-center">
              <h5
                className={`text-center w-28 mt-2 px-2 rounded-sm ${
                  categoryColors[
                    isUpdated && category ? category : task.status
                  ] || "white shadow-md"
                }`}
              >
                {isUpdated && category ? category : task.status}
              </h5>
            </div>

            {success && (
              <div className="flex justify-center">
                <Alert
                  type="success"
                  message={success}
                  onClose={resetSuccess}
                  className="w-full lg:w-[80%]"
                />
              </div>
            )}
            {error && (
              <div className="flex justify-center">
                <Alert
                  type="error"
                  message={error}
                  onClose={resetError}
                  className="w-full lg:w-[80%]"
                />
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="text-center mt-7">
                <input
                  required
                  type="text"
                  className="border-2 w-full lg:w-[80%] h-14 p-2 rounded-md"
                  placeholder="Title"
                  defaultValue={task.title}
                  ref={titleRef}
                />

                <textarea
                  rows="10"
                  className="border-2 w-full lg:w-[80%] p-2 mt-5 resize-none rounded-md"
                  placeholder="Description"
                  defaultValue={task.description}
                  ref={descriptionRef}
                />

                <CategoryRadio
                  categories={["Not started", "In progress", "Completed"]}
                  checkedCategory={category || task.status}
                  handleCategoryChange={handleCategoryChange}
                />

                <div className="flex justify-center mt-5">
                  <button
                    type="submit"
                    className="block border-2 px-7 py-3 bg-black text-white rounded-md"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-gray-500 p-10 md:text-lg text-center mt-48 flex flex-col items-center">
          <p className="leading-10">Task not found</p>
          <p>Seems like you have followed a broken link.</p>

          <Link href="/" passHref>
            <Button className="mt-6">Back to safety</Button>
          </Link>
        </div>
      )}
    </>
  );
}

export default TaskById;
