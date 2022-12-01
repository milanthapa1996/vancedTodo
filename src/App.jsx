import { useState, useEffect } from "react";
import TaskMoal from "./components/TaskMoal";
import { nanoid } from "nanoid";
function App() {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setDeletetModal] = useState(false);
  const [title, setTitle] = useState();
  const [status, setStatus] = useState("pending");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editTodo, setEditTodo] = useState({});
  const [todoList, setTodoList] = useState(
    !localStorage.getItem("todoListSaved")
      ? [
          {
            id: nanoid(),
            task: "This is demo todo.",
            createdAt: "2022/12/11",
            status: "pending",
          },
        ]
      : JSON.parse(localStorage.getItem("todoListSaved"))
  );

  const handleAddTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: nanoid(),
      task: title,
      createdAt: "2022-01-12",
      status: status,
    };
    setTodoList([...todoList, newTodo]);
    localStorage.setItem(
      "todoListSaved",
      JSON.stringify([...todoList, newTodo])
    );
    setShowModal(false);
  };

  const handleEditModal = (e) => {
    setShowEditModal(true);
    // const toEditTodo = todoList.filter((x) => x.id === e.currentTarget.id);
    const toEdit = todoList.find((obj) => obj.id === e.currentTarget.id);
    setEditTodo(toEdit);
  };
  const handleEditTodo = (e) => {
    e.preventDefault();
    const editedTodo = {
      id: editTodo.id,
      task: editTodo.task,
      createdAt: "2022-01-12",
      status: editTodo.status,
    };
    const newTodoList = todoList.map((todo) =>
      todo.id === editTodo.id ? editedTodo : todo
    );
    setTodoList(newTodoList);
    localStorage.setItem("todoListSaved", JSON.stringify(newTodoList));
    setShowEditModal(false);
  };

  const handleChangeCheck = (e) => {
    let objIndex = todoList.findIndex((obj) => obj.id == e.target.id);
    todoList[objIndex].status === "pending"
      ? (todoList[objIndex].status = "completed")
      : (todoList[objIndex].status = "pending");
    setTodoList([...todoList]);
    localStorage.setItem("todoListSaved", JSON.stringify([...todoList]));
  };

  const handleDeleteTodo = (e) => {
    console.log(e.currentTarget.id);

    /// stop delete if status is pending
    const toDelete = todoList.find((obj) => obj.id === e.currentTarget.id);
    if (toDelete.status === "pending") {
      setDeletetModal(true);
      return;
    }
    const newTodoList = todoList.filter(
      (todo) => todo.id !== e.currentTarget.id
    );
    setTodoList(newTodoList);
    localStorage.setItem("todoListSaved", JSON.stringify(newTodoList));
  };
  return (
    <>
      <div
        className={`min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-10 rounded-none`}
      >
        <div className="sticky top-0 bg-gray-200 p-4">
          <h1 className="text-5xl text-black text-center font-extrabold">
            TODO APP
          </h1>
          <div className="flex justify-between items-center p-4">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-lg text-xl hover:bg-green-600 hover:scale-105 duration-300"
              onClick={() => setShowModal(true)}
            >
              Add Task
            </button>
            <div>
              <select
                className="form-select form-select-lg cursor-pointer block w-full px-4 py-3
      text-xl
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      duration-500
      focus:text-gray-700  focus:border-blue-600 focus:outline-none"
                aria-label=".form-select-lg example"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
        {/* // list all todos here */}
        <div className="mt-4 p-4 bg-gray-200 rounded-lg space-y-3">
          {
            // map over todos
            todoList.map((todo) => (
              <div
                className="flex justify-between items-center p-4 bg-white rounded-lg"
                key={todo.id}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox h-6 w-6 text-indigo-600"
                    checked={todo.status === "completed" ? true : false}
                    value={todo.status}
                    id={todo.id}
                    onChange={handleChangeCheck}
                  />
                  <span className="flex flex-col justify-center items-start ml-4">
                    <h1
                      className={`text-md font-semibold text-gray-600 ${
                        todo.status === "completed" ? "line-through" : ""
                      }`}
                    >
                      {todo.task}
                    </h1>
                    <p className="text-gray-400 text-sm">
                      {todo.createdAt}
                      <span
                        className={`${
                          todo.status === "completed"
                            ? "bg-red-500"
                            : "bg-green-500"
                        } text-white px-2 py-1 rounded-2xl text-[9px] ml-2`}
                      >
                        {todo.status === "completed" ? "Completed" : "Pending"}
                      </span>
                    </p>
                  </span>
                </div>
                <div className="space-x-2">
                  <button
                    className="bg-gray-200 text-white px-4 py-2 rounded-lg text-xl hover:bg-gray-300 hover:scale-105 duration-300"
                    id={todo.id}
                    onClick={handleEditModal}
                  >
                    <svg
                      className="w-6 h-6 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                      <path
                        fillRule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <button
                    id={todo.id}
                    className="bg-gray-200 text-white px-4 py-2 rounded-lg text-xl hover:bg-gray-300 hover:scale-105 duration-300"
                    onClick={handleDeleteTodo}
                  >
                    <svg
                      className="w-6 h-6 text-black"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <TaskMoal isVisible={showModal} onClose={() => setShowModal(false)}>
        <form className="p-4 space-y-6" onSubmit={handleAddTodo}>
          <h1 className="text-xl font-bold text-gray-600 tracking-wide">
            Add ToDo
          </h1>
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Task Title
            </span>
            <input
              type="text"
              name="text"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="My first task"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="block mt-2">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Status
            </span>
            <select
              className="bg-white rounded-md form-select form-select-lg cursor-pointer block w-full px-4 py-3 transition ease-in-out duration-500"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          <div className="space-x-3">
            <button
              className="bg-indigo-600 p-2 rounded-lg text-white tracking-wider font-medium text-lg hover:bg-indigo-700"
              type="submit"
            >
              Add Task
            </button>
            <button
              className="bg-gray-300 p-2 rounded-lg text-gray-600 tracking-wider font-medium text-lg hover:bg-gray-400 hover:text-white"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </TaskMoal>
      <TaskMoal
        isVisible={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        <form className="p-4 space-y-6" onSubmit={handleEditTodo}>
          <h1 className="text-xl font-bold text-gray-600 tracking-wide">
            Edit ToDo
          </h1>
          <label className="block">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Task Title
            </span>
            <input
              type="text"
              name="text"
              className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1"
              placeholder="My first task"
              value={editTodo.task}
              onChange={(e) =>
                setEditTodo({ ...editTodo, task: e.target.value })
              }
            />
          </label>
          <label className="block mt-2">
            <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
              Status
            </span>
            <select
              className="bg-white rounded-md form-select form-select-lg cursor-pointer block w-full px-4 py-3 transition ease-in-out duration-500"
              value={editTodo.status}
              onChange={(e) => {
                setEditTodo({ ...editTodo, status: e.target.value });
              }}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </label>
          <div className="space-x-3">
            <button
              className="bg-indigo-600 p-2 rounded-lg text-white tracking-wider font-medium text-lg hover:bg-indigo-700"
              type="submit"
            >
              Update Task
            </button>
            <button
              className="bg-gray-300 p-2 rounded-lg text-gray-600 tracking-wider font-medium text-lg hover:bg-gray-400 hover:text-white"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </TaskMoal>
      <TaskMoal
        isVisible={showDeleteModal}
        onClose={() => setDeletetModal(false)}
      >
        <h1 className="text-2xl text-center py-4 text-gray-600">
          You can't delete a pending Todo.
        </h1>
        <p className="text-sm text-center text-red-400">
          * you need to complete the todo before delete
        </p>
        <span className="flex justify-center items-center mt-4">
          <svg
            className="w-44 h-44 text-red-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </TaskMoal>
    </>
  );
}

export default App;
