export interface TodoItem {
	id: number
	text: string
	completed: boolean
}

export interface TodoState {
	todos: TodoItem[]
	status: "idle" | "loading" | "failed"
	loading: boolean
}
