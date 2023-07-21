import React from "react";

const Task = (props) => {
    return (

        <div className="d-flex justify-content-between">
            <p id="input">{props.task}</p>
            <button className="border-0 bg-transparent" id="icono" onClick={() => props.deleteTask(props.id)}>❌</button>
        </div>

    );

};

export default Task