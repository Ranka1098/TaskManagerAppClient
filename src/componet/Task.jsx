import React from "react";

const Task = () => {
  const addTaskHandler = () => {
    alert("add task");
  };

  const searchTaskHandler = () => {
    alert("SeachTask");
  };

  const checkedTaskHandler = () => {
    alert("checktask");
  };
  const editTaskHandler = () => {
    alert("edittask");
  };
  const deleteTaskHandler = () => {
    alert("dletetask");
  };

  return (
    <div className="bg-gray-400 h-screen p-5">
      <div className="container mx-auto p-5 border-[1px] border-black w-[700px] shadow-md">
        <h1 className="text-center text-white font-bold text-xl">
          Task management App
        </h1>

        <div className="flex justify-between items-center">
          {/* add */}
          <div className="mt-5">
            <input
              type="text"
              placeholder="Add task"
              className="p-1 border-[2px] border-black rounded-md"
            />
            <button
              onClick={addTaskHandler}
              className=" bg-purple-600 p-1 rounded-md ml-2"
            >
              Add task
            </button>
          </div>
          {/* search */}
          <div className="mt-5">
            <input
              type="text"
              placeholder="Search task"
              className="p-1 border-[2px] border-black rounded-md"
            />
            <button
              onClick={searchTaskHandler}
              className=" bg-purple-600 p-1 rounded-md ml-2"
            >
              Search task
            </button>
          </div>
        </div>

        <div className=" mt-10">
          <input
            type="text"
            placeholder="task"
            className="w-[510px]  p-1 rounded-md border-[2px] border-black"
          />
          <button
            onClick={checkedTaskHandler}
            className="bg-gray-500 p-1 ml-1 rounded-md"
          >
            check
          </button>
          <button
            onClick={editTaskHandler}
            className="bg-green-500 p-1 ml-1 rounded-md"
          >
            edit
          </button>
          <button
            onClick={deleteTaskHandler}
            className="bg-red-500 p-1 ml-1 rounded-md"
          >
            delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Task;
