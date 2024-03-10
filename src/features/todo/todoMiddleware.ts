import { Middleware } from "@reduxjs/toolkit"
import { TodoItem } from "../../types/Todo"

const todoCompletionLogger: Middleware = storeApi => next => action => {
	if (action.type === "todo/toggleTodo") {
		const todoId = action.payload
		const result = next(action)
		setTimeout(() => {
			const todo = storeApi.getState().todo.todos.find((todo: TodoItem) => todo.id === todoId)
			if (todo) {
				const timestamp = new Date().toISOString()
				if (todo.completed === true) {
					console.log(`${todo.text} completed at [${timestamp}]`)
				}
			}
		}, 0)
		return result
	} else {
		return next(action)
	}
}

export default todoCompletionLogger
