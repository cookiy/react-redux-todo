import React from "react"
import { TodoList } from "./features/todo/List"
import "./App.css"

function App() {
	return (
		<div className="w-full min-h-screen bg-gray-800">
			<TodoList />
		</div>
	)
}

export default App
