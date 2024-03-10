import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import todoReducer from "../features/todo/todoSlice"
import todoCompletionLogger from "../features/todo/todoMiddleware"

export const store = configureStore({
	reducer: {
		todo: todoReducer
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(todoCompletionLogger)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
