import { TodoItem } from "./TodoItem"

export function ListDone({ todos, onRemoveTodo, onUpdateTodo,  setShowConfetti }) {

    const doneTodos = todos.filter(todo => (
        todo.isCompleted === true
    ))

    const todoList = doneTodos.filter(todo => (
        todo.type === 'задача'
    ))
    const expensesList = doneTodos.filter(todo => (
        todo.type === 'постоянный расход'
    ))
    const shoppingList = doneTodos.filter(todo => (
        todo.type === 'покупки'
    ))

    return <div className="todo-list">

        {todoList.length ?
            <div className="type-container">
                <span className="title">Задачи</span>
                {todoList.map(todo => (
                    <div className={todo.isCompleted ? 'todo done' : 'todo'} key={todo._id}>
                        <TodoItem todo={todo} onRemoveTodo={onRemoveTodo} onUpdateTodo={onUpdateTodo}  setShowConfetti={setShowConfetti}/>
                    </div>
                ))}
            </div>
            : ''}

        {expensesList.length ?
            <div className="type-container">
                <span className="title">Регулярные платежи</span>
                {expensesList.map(todo => (
                    <div className={todo.isCompleted ? 'todo done' : 'todo'} key={todo._id}>
                        <TodoItem todo={todo} onRemoveTodo={onRemoveTodo} onUpdateTodo={onUpdateTodo}  setShowConfetti={setShowConfetti}/>
                    </div>
                ))}
            </div>
            : ''}
        {shoppingList.length ?
            <div className="type-container">
                <span className="title">Покупки</span>
                {shoppingList.map(todo => (
                    <div className={todo.isCompleted ? 'todo done' : 'todo'} key={todo._id}>
                        <TodoItem todo={todo} onRemoveTodo={onRemoveTodo} onUpdateTodo={onUpdateTodo}  setShowConfetti={setShowConfetti}/>
                    </div>
                ))}
            </div>
            : ''}
    </div>


}
