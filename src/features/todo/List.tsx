import React, { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { addTodoAsync, removeTodoAsync, toggleTodo } from "./todoSlice"
import Loading from "./Load"

export function TodoList() {
	const [newTodo, setNewTodo] = useState("")
	const dispatch = useAppDispatch()
	const todos = useAppSelector(state => state.todo.todos)
	const loading = useAppSelector(state => state.todo.loading)

	const handleAddTodo = () => {
		if (newTodo.trim() !== "") {
			dispatch(addTodoAsync(newTodo))
			setNewTodo("")
		}
	}

	const handleRemoveTodo = (id: number) => {
		dispatch(removeTodoAsync(id))
	}

	return (
		<div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
			<div className="p-6 m-4 w-full lg:w-3/4">
				<div className="mb-4">
					<h1 className="text-white text-2xl mb-4">Demo</h1>
				</div>
				{loading && <Loading />}
				<div>
					{todos.map(todo => (
						<div key={todo.id} className="flex items-center bg-gray-100 p-2 rounded shadow mb-5">
							<div
								className="flex-grow flex items-center cursor-pointer"
								onClick={() => dispatch(toggleTodo(todo.id))}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className={`h-6 w-6 mr-3 ${todo.completed ? "text-red-500" : "text-green-500"}`}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M5 13l4 4L19 7"
									/>
								</svg>
								<p className={`w-full text-grey-darkest ${todo.completed ? "line-through" : ""}`}>
									{todo.text}
								</p>
							</div>
							<button
								className="flex-no-shrink p-2 ml-2 border-2 rounded cursor-pointer bg-slate-400"
								onClick={() => handleRemoveTodo(todo.id)}
							>
								Remove
							</button>
						</div>
					))}
				</div>
				<div className="flex mt-4">
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
						placeholder="Add a New Todo"
						value={newTodo}
						onChange={e => setNewTodo(e.target.value)}
					/>
					<button
						className="flex-no-shrink p-2 border-2 rounded text-teal border-teal bg-gray-100 hover:bg-teal"
						onClick={handleAddTodo}
					>
						Add
					</button>
				</div>
			</div>
		</div>
	)
}
