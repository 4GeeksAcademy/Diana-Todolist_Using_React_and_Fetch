import React, { useEffect, useState} from "react";
import '../../styles/index.css';
import Task from "./task.jsx";

const Home = () => {
	const [tasks, setTasks] = useState([])
	const [inputText, setInputText] = useState("");
	const Api = 'https://fake-todo-list-52f9a4ed80ce.herokuapp.com/todos/user/Viridian-a'

	useEffect(() => {
		fetch(Api).then(result => result.json()).then(data => {
			console.log(data)
			setTasks(data)
		}
		).catch(err => err)
	}, []);



	const updateAllTasks = () => {
		const newTask = { done: false, id: Date.now(), label: inputText };

		fetch(Api, {
			method: 'PUT',
			body: JSON.stringify([...tasks, newTask]),
			headers: {
				'Content-Type': 'application/json'
			}
		}).catch(err => err);

		setTasks([...tasks, newTask]);
		setInputText('');
	}

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			if (inputText.trim() !== '') {
				updateAllTasks()
			}
		}
	}


	const deleteTask = (index) => {
		fetch(Api, {
			method: 'PUT',
			body: JSON.stringify(tasks.filter((_, i) => i !== index)),
			headers: {
				'Content-Type': 'application/json'
			}
		}).catch(err => err);
		setTasks(tasks.filter((_, i) => i !== index));
	}

	const deleteAllTask = () => {
		fetch(Api, {
			method: 'PUT',
			body: JSON.stringify([]),
			headers: {
				'Content-Type': 'application/json'
			}
		}).catch(err => err);
		setTasks([]);
	}

	return (
		<div className="general__container">
			<h1 className="text-center mt-5">Todos</h1>
			<ul className="list__container">
				<li className="task">
					<input type="text" 
					id="inputField"
					 value={inputText} placeholder="What needs to be done?" onKeyDown={handleKeyDown} onChange={(e) => { setInputText(e.target.value) }} />
				</li>
				{/* Render every input that gets inserted */}
				{tasks.map((task, index) => {
					return (
						<li key={index} className="task">
							<Task task={task.label} deleteTask={deleteTask} id={index} />
						</li>
					);
				})}
				<li className="items__counter">{tasks.length} Items left</li>
				<button onClick={() => { deleteAllTask() }}>DELETE ALL</button>
			</ul>

		</div>
	);


};

export default Home;