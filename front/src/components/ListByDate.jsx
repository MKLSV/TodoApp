import { TodoItem } from "./TodoItem";

export function ListByDate({ todos, onRemoveTodo, onUpdateTodo }) {
    // Группируем задачи по `dueDate`
    const groupedTodos = todos.reduce((acc, todo) => {
        const dueDate = todo.dueDate ? new Date(todo.dueDate).toISOString().split("T")[0] : "Без даты";
        if (!acc[dueDate]) {
            acc[dueDate] = [];
        }
        acc[dueDate].push(todo);
        return acc;
    }, {});

    // Сортируем группы по дате
    const sortedGroups = Object.keys(groupedTodos)
        .map((date) => ({
            date,
            todos: groupedTodos[date],
        }))
        .sort((a, b) => {
            if (a.date === "Без даты") return 1; // Задачи без даты всегда внизу
            if (b.date === "Без даты") return -1; // Задачи с датой выше
            return new Date(a.date) - new Date(b.date); // Сортировка по дате
        });

    // Функция для форматирования даты в "d MMMM"
    const formatDate = (dateString) => {
        const months = [
            "января",
            "февраля",
            "марта",
            "апреля",
            "мая",
            "июня",
            "июля",
            "августа",
            "сентября",
            "октября",
            "ноября",
            "декабря",
        ];

        const date = new Date(dateString);
        if (isNaN(date)) return "Некорректная дата";

        const day = date.getDate();
        const month = months[date.getMonth()];
        return `${day} ${month}`;
    };

    return (
        <div className="todo-list">
            {sortedGroups.map(({ date, todos }) => (
                <div key={date} className="type-container">
                    <span className="title">
                        {date === "Без даты" ? "Без даты" : formatDate(date)}
                    </span>
                    {todos.map((todo) => (
                        <div className={todo.isCompleted ? 'todo done' : 'todo'} key={todo._id}>
                            <TodoItem todo={todo} onRemoveTodo={onRemoveTodo} onUpdateTodo={onUpdateTodo} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
