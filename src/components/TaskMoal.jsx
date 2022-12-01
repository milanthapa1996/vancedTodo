import React from "react";

const TaskMoal = ({ isVisible, onClose,children }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="w-[80%] md:w-[50%] flex flex-col space-y-1">
        <button
          className="text-gray-600 text-xl place-self-end bg-gray-300 px-4 py-2 hover:bg-gray-400 hover:text-white rounded"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="bg-gray-200 p-2 rounded">{children}</div>
      </div>
    </div>
  );
};

export default TaskMoal;
