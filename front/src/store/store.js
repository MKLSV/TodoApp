import { combineReducers, legacy_createStore as createStore } from 'redux'

import { todoReducer } from './todo/todo.reducer.js'


const rootReducer = combineReducers({
    todoModule: todoReducer,
})

export const store = createStore(rootReducer)