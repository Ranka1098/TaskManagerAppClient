import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";

import axios from "axios";

const Task = () => {
  const [input, setInput] = useState("");
  // store api
  const [task, setTask] = useState([]);

  // edit task track by id
  const [editTaskId, setEditTaskId] = useState(null);
  // task is checked or unchecked
  const [searchInput, setSearchInput] = useState(""); // For search input
  // filtet task
  const [copytask, setCopyTask] = useState([]);

  const inputHandler = (e) => {
    console.log(e.target.value);
    setInput(e.target.value);
  };

  const searchInputHandler = (e) => {
    setSearchInput(e.target.value);
  };

  // fetch task
  useEffect(() => {
    const fetched = async () => {
      const res = await axios.get("http://localhost:3000/fetched");
      console.log(res.data.data);
      setTask(res.data.data);
      setCopyTask(res.data.data);
    };
    fetched();
  }, []);
  const addTask = async () => {
    // check validate input field empty or not
    if (input.trim() === "") {
      alert("pls enter task");
      return;
    }
    // if editTaskId se track karenge add karna ya update karna hai
    if (editTaskId) {
      // update task karenge
      try {
        // api call kar ke put request bhejna hai
        const res = await axios.put(
          `http://localhost:3000/update/${editTaskId}`, //editTaskId me =>task._id ot taskName hai
          {
            taskName: input, // input jo likhenge wo serever ko bhejenge or taskNmae me edit hoga
          }
        );
        // upadate message
        alert("task update successfully");

        // update ui in new Data
        setTask((prev) =>
          prev.map((t) =>
            t._id === editTaskId
              ? { ...t, taskName: res.data.data.taskName } //edited data ko taskName data ko save karna hai
              : t
          )
        );

        // uske baad task id ko wapas null kardenge or input clear kar denge
        setEditTaskId(null);
        setInput("");
      } catch (error) {
        console.log("error :", error);
        alert("failed to update task");
      }
    } else {
      try {
        // create task
        // make post api call to server useme data bhejenge
        const res = await axios.post("http://localhost:3000/create", {
          taskName: input,
          isDone: false,
        });
        alert("task added successfully");
        //update in ui added data
        setTask((prev) => [...prev, res.data.data]);
        setInput("");
      } catch (error) {
        console.log("error :", error);
        alert("failed to create task");
      }
    }
  };

  // Filter tasks based on search input
  const filteredTasks = task.filter((task) =>
    task.taskName.toLowerCase().includes(searchInput.toLowerCase())
  );

  // edit jo task hai usse input field me availabel karna hai
  const editTask = (taskId, taskName) => {
    setEditTaskId(taskId); // current task ki id set karenge
    setInput(taskName); // input file task availabel karenge
  };

  const completeTask = async (taskId, currentStatus) => {
    console.log(
      "Updating task with ID:",
      taskId,
      "Current Status:",
      currentStatus
    );

    const res = await axios.put(`http://localhost:3000/status/${taskId}`, {
      isDone: !currentStatus, // Toggle the current status
    });

    console.log("API Response:", res.data); // Log response to verify

    // Update the UI with the new status
    setTask((prev) =>
      prev.map((t) =>
        t._id === taskId ? { ...t, isDone: res.data.data.isDone } : t
      )
    );
  };

  const deleteTask = async (taskId) => {
    await axios.delete(`http://localhost:3000/delete/${taskId}`);

    setTask((prev) => prev.filter((t) => t._id !== taskId));
    alert("task deleted successfully");
  };

  const deleteAllTask = async () => {
    await axios.delete("http://localhost:3000/deleteAll");
    alert("all task dleted successfully");
    // up mei update karna hai jo rsponse aayega
    setTask([]);
  };
  return (
    <div className="bg-gray-300  p-5">
      <div className="container mx-auto p-5 w-[600px] border-[1px] border-black shadow-md">
        <h1 className="text-center text-2xl font-bold">Task management App</h1>

        <div className="mt-5 flex gap-5">
          {/* add task */}
          <div className="flex">
            <input
              type="text"
              placeholder="add task"
              className="p-2"
              value={input}
              onChange={inputHandler}
            />
            <button className="p-2 bg-green-500 ml-2" onClick={addTask}>
              <MdAddCircle className="text-xl" />
            </button>
          </div>

          {/* search task */}
          <div className="flex relative">
            <input
              type="text"
              placeholder="search task"
              className="p-2 w-[240px]"
              value={searchInput}
              onChange={searchInputHandler}
            />
            <div className="absolute right-3 top-3">
              <FaSearch />
            </div>
          </div>
        </div>

        {/* delete all task */}
        {task.length > 0 ? (
          <button
            className="bg-red-500 p-1 mt-2 text-white"
            onClick={deleteAllTask}
          >
            delete all task
          </button>
        ) : (
          ""
        )}

        {/* display the task */}
        <div className="mt-5 flex justify-between items-start flex-col gap-2 ">
          {task.length === 0 ? (
            <p className="p-2 w-[510px] bg-white font-serif">no task found</p>
          ) : (
            filteredTasks.map((data, index) => {
              return (
                <div key={index} className="w-full">
                  <div className="bg-white p-1 m-1 text-xl flex justify-between ">
                    <div
                      className={`mt-2 ${
                        data.isDone ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {index + 1} {"."} {data.taskName}
                    </div>
                    <div>
                      {/* task checked or unchecked */}
                      <button
                        onClick={() => completeTask(data._id, data.isDone)}
                      >
                        {data.isDone ? (
                          <p className="bg-gray-600 p-1 text-xl text-white">
                            completed
                          </p>
                        ) : (
                          <p className="bg-gray-600 p-1 text-xl text-white">
                            uncompelete
                          </p>
                        )}
                      </button>

                      {/* edit task */}
                      <button
                        className="p-2 bg-green-500 m-1"
                        onClick={() => editTask(data._id, data.taskName)}
                      >
                        <FaRegEdit className="text-xl" />
                      </button>

                      {/* delete task */}
                      <button
                        className="p-2 bg-red-500 m-1"
                        onClick={() => {
                          deleteTask(data._id);
                        }}
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Task;
