import Brand from "../Brand";

function Loader() {
  return (
    <div className="container">
      <Brand />

      <div className="flex justify-center h-[70vh] items-center">
        <div className="w-16 h-16 border-b-2 border-gray-900 rounded-full animate-spin" />
      </div>
    </div>
  );
}

export default Loader;
