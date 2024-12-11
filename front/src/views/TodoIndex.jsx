import '../assets/main.scss'

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadTodos, removeTodo, saveTodo } from '../store/todo/todo.action.js'
import AddTask from '../components/AddTask.jsx';
import { ListByDate } from '../components/ListByDate.jsx';
import { ListByTypes } from '../components/ListByTypes.jsx';
import { IoAddOutline } from "react-icons/io5";
import { ListDone } from '../components/ListDone.jsx';
import AppHeader from '../components/AppHeader.jsx';
import ConfettiEffect from '../components/ConfettiEffect.jsx';

export default function TodoIndex() {

    const todos = useSelector((storeState) => storeState.todoModule.todos)

    const [user, setUser] = useState('Для всех')
    const [msg, setMsg] = useState('')
    const [onModal, setOnModal] = useState(false)
    const [sort, setSort] = useState('type')
    const [showConfetti, setShowConfetti] = useState(false);


    useEffect(() => {
        loadTodos()
    }, [])

    const filteredByUserTodos = todos.filter((todo) => {
        return todo.owner === user;
    });

    const filteredTodos = filteredByUserTodos.filter((todo) => {
        return todo.isCompleted === false
    })

    async function handleRemoveTodo(todoId) {
        try {
            await removeTodo(todoId)
            setMsg('Задача успешно удалена')
            setTimeout(() => setMsg(''), 3000)
        } catch (err) {
            console.error('Ошибка при удалении задачи:', err)
        }
    };
    async function handleUpdateTodo(todo) {
        try {
            await saveTodo(todo)
            setMsg('Задача успешно изменена')
            setTimeout(() => setMsg(''), 3000)
        } catch (err) {
            console.error('Ошибка при удалении задачи:', err)
        }
    };

    return <div className="app">
        <AppHeader user={user} sort={sort} setSort={setSort} setUser={setUser} />
        <div className="todo-app">
            <div className='add-btn' onClick={() => setOnModal(true)}>
                <IoAddOutline />
            </div>
            {showConfetti && <ConfettiEffect setShowConfetti={setShowConfetti} />}
            {onModal ? <AddTask setOnModal={setOnModal} /> : ''}
            {sort === 'data' ?
                <ListByDate todos={filteredTodos} onRemoveTodo={handleRemoveTodo} onUpdateTodo={handleUpdateTodo}  setShowConfetti={setShowConfetti}/>
                : sort === 'type' ?
                    <ListByTypes todos={filteredTodos} onRemoveTodo={handleRemoveTodo} onUpdateTodo={handleUpdateTodo} setShowConfetti={setShowConfetti} />
                    :
                    <ListDone todos={filteredByUserTodos} onRemoveTodo={handleRemoveTodo} setShowConfetti={setShowConfetti} />
            }

        </div>
        {msg ? <span className='message'>{msg}</span> : ''}


    </div>
}
