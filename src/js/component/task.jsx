import React from "react";

const Task = (props) => {
    return (

        <div className="d-flex justify-content-between">
            <p>{props.task}</p>
            <button className="border-0 bg-transparent" onClick={() => props.deleteTask(props.id)}>❌</button>
        </div>

    );

};

export default Task