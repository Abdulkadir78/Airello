import { useRef, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { addDoc, serverTimestamp } from "firebase/firestore/lite";

import { tasksCollection } from "../../firebase/firebase";
import categoryColors from "../../utils/categoryColors";
import Alert from "../UI/Alert";
import Meta from "../Meta";

function AddTaskModal({ toggleModal, category, handleRefresh }) {
  const [error, setError] = useState("");
  const titleRef = useRef();
  const descriptionRef = useRef();

  const resetError = () => {
    setError("");
  };

  const onClose = () => {
    resetError();
    toggleModal();
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const titleValue = titleRef.current?.value;
    const descriptionValue = descriptionRef.current?.value;
    if (!titleValue?.trim()) {
      setError("Title is required");
      return;
    }

    try {
      // add task to firebase
      await addDoc(tasksCollection, {
        title: titleValue,
        description: descriptionValue,
        status: category,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      setError("Something went wrong");
      return;
    }

    toggleModal();
    handleRefresh();
  };

  return (
    <>
      <Meta title="Add task" />
      <div className="fixed top-0 right-0 left-0 bottom-0 bg-black bg-opacity-40" />

      <div className="w-screen h-5/6 fixed top-[10%] md:left-[25%] right-0 overflow-auto">
        <div className="md:w-[50%] bg-white border-2 p-10 relative">
          <button className="absolute top-5 right-5" onClick={onClose}>
            <MdOutlineClose size={30} />
          </button>

          <h1 className="w-full text-center text-xl mt-14 md:mt-7">
            Add a task
          </h1>

          <div className="flex justify-center">
            <h5
              className={`text-center w-28 mt-2 px-2 rounded-sm ${
                categoryColors[category] || "white shadow-md"
              }`}
            >
              {category}
            </h5>
          </div>

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

          <form onSubmit={onSubmit}>
            <div className="text-center mt-7">
              <input
                required
                type="text"
                className="border-2 w-full lg:w-[80%] h-14 p-2 rounded-md"
                placeholder="Title"
                ref={titleRef}
              />

              <textarea
                rows="10"
                className="border-2 w-full lg:w-[80%] p-2 mt-5 resize-none rounded-md"
                placeholder="Description"
                ref={descriptionRef}
              />

              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="block border-2 px-7 py-3 bg-black text-white rounded-md"
                >
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddTaskModal;
