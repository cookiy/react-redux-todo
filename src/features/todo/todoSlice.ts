import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { TodoState } from "../../types/Todo"

const initialState: TodoState = {
	todos: [],
	status: "idle",
	loading: false
}

export const addTodoAsync = createAsyncThunk("todos/addTodo", async (text: string, { rejectWithValue }) => {
	try {
		const todoItem = {
			id: Date.now(),
			text,
			completed: false
		}
		await new Promise(resolve => setTimeout(resolve, 1000))
		await addTodo(todoItem)
		return todoItem
	} catch (err: unknown) {
		if (err instanceof Error) {
			return rejectWithValue(err.message)
		} else {
			return rejectWithValue("An unknown error occurred")
		}
	}
})

export const removeTodoAsync = createAsyncThunk("todos/removeTodo", async (todoId: number, { rejectWithValue }) => {
	try {
		await new Promise(resolve => setTimeout(resolve, 1000))
		await removeTodo(todoId)
		return todoId
	} catch (err: unknown) {
		if (err instanceof Error) {
			return rejectWithValue(err.message)
		} else {
			return rejectWithValue("An unknown error occurred")
		}
	}
})

export const todoSlice = createSlice({
	name: "todo",
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<{ id: number; text: string; completed: boolean }>) => {
			state.todos.push({ ...action.payload, completed: false })
		},
		toggleTodo: (state, action: PayloadAction<number>) => {
			const todoId = action.payload
			const todo = state.todos.find(todo => todo.id === todoId)
			if (todo) {
				todo.completed = !todo.completed
				state.todos = [
					...state.todos.filter(todo => !todo.completed), // 先加入未完成的todos
					...state.todos.filter(todo => todo.completed) // 然后加入已完成的todos
				]
			}
		},
		removeTodo: (state, action: PayloadAction<number>) => {
			state.todos = state.todos.filter(todo => todo.id !== action.payload)
		}
	},
	extraReducers: builder => {
		builder
			.addCase(removeTodoAsync.pending, state => {
				state.loading = true
			})
			.addCase(removeTodoAsync.fulfilled, (state, action) => {
				state.todos = state.todos.filter(todo => todo.id !== action.payload)
				state.loading = false
			})
			.addCase(removeTodoAsync.rejected, state => {
				state.loading = false
			})
			.addCase(addTodoAsync.pending, state => {
				state.loading = true
			})
			.addCase(
				addTodoAsync.fulfilled,
				(state, action: PayloadAction<{ id: number; text: string; completed: boolean }>) => {
					state.todos.push({ ...action.payload, completed: false })
					state.loading = false
				}
			)
			.addCase(addTodoAsync.rejected, state => {
				state.loading = false
			})
	}
})

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions

export const selectTodos = (state: RootState) => state.todo.todos
export const selectTodoStatus = (state: RootState) => state.todo.status

export default todoSlice.reducer
