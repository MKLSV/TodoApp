import axios from "axios";

// const API_URL = "http://localhost:5000/tasks";


const API_URL = process.env.NODE_ENV === 'production'
    ? '/tasks'
    : '//localhost:5000/tasks'

export const todoService = {
    query,
    save,
    addTodo,
    remove,
}

async function query() {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Ошибка при получении задач:", error);
        throw error;
    }
}


async function updatedTodo(updatedTask) {
    const url = `${API_URL}/${updatedTask._id}`
    try {
        const response = await axios.put(url, updatedTask);
        return response.data;
    } catch (error) {
        console.error("Ошибка при обновлении задачи:", error);
        throw error;
    }
}

async function remove(id) {
    const url = `${API_URL}/${id}`
    try {
        await axios.delete(url);
        return { message: "Task deleted" };
    } catch (error) {
        console.error("Ошибка при удалении задачи:", error);
        throw error;
    }
}


async function addTodo(newTask) {
    try {
        const response = await axios.post(API_URL, newTask);
        return response.data; // Возвращаем добавленную задачу
    } catch (error) {
        console.error("Ошибка при добавлении задачи:", error);
        throw error;
    }
}

async function save(todo) {
    return (todo._id) ? updatedTodo(todo) : addTodo(todo)
}