import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Input = () => {
  const [task, setTask] = useState("");
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    fetch("https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Viridian-a")
      .then((response) => response.json())
      .then((data) => setTaskList(data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      if (task) {
        const newTask = {
          done: false,
          id: Math.floor(Math.random() * 1000),
          label: task,
        };
        setTaskList((prevTaskList) => [...prevTaskList, newTask]);
        setTask("");
      } else {
        alert("The field is empty!");
      }
    }
  };

  const handleErase = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList.splice(index, 1);
    setTaskList(updatedTaskList);
  };

  const handleMouseEnter = (index) => {
    setTaskList((prevTaskList) => {
      if (!prevTaskList[index].showIcon) {
        return prevTaskList.map((item, i) =>
          i === index ? { ...item, showIcon: true } : item
        );
      }
      return prevTaskList;
    });
  };

  const handleMouseLeave = (index) => {
    setTaskList((prevTaskList) => {
      if (prevTaskList[index].showIcon) {
        return prevTaskList.map((item, i) =>
          i === index ? { ...item, showIcon: false } : item
        );
      }
      return prevTaskList;
    });
  };

  const handlePrintTasks = () => {
    console.log(taskList);
  };

  return (
    <>
      <input
        id="inputField"
        type="text"
        value={task}
        placeholder="Add your task"
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <ul className="list__container">
        <hr className="custom-hr" />
        {taskList.map((item, index) => (
          <li
            className="task"
            key={item.id}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {item.label}{" "}
            {item.showIcon && (
              <i className="icono">
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => handleErase(index)}
                />
              </i>
            )}
          </li>
        ))}
      </ul>
      <p className="items__counter">{taskList.length} task left</p>
      <button className="btn btn-warning" onClick={handlePrintTasks}>
        Print Tasks
      </button>
    </>
  );
};

export default Input;
