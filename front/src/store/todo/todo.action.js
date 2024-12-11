import { todoService } from '../../services/todo.service'
import { store } from '../store'
import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO } from './todo.reducer'


export async function loadTodos() {
    try {
        const todos = await todoService.query()
        store.dispatch({ type: SET_TODOS, todos })
    }
    catch (err) {
        console.log('Had issues loading todos', err)
        throw err
    }
}

export async function saveTodo(todo) {
    try {
        const type = (todo._id) ? UPDATE_TODO : ADD_TODO
        const savedTodo = await todoService.save(todo)
        store.dispatch({ type, todo: savedTodo })
        return savedTodo
    }
    catch (err) {
        console.error('Cannot save todo:', err)
        throw err
    }
}

export async function removeTodo(todoId) {
    try {
        await todoService.remove(todoId)
        store.dispatch({ type: REMOVE_TODO, todoId })
    }
    catch (err) {
        console.log('Had issues Removing todo', err)
        throw err
    }
}