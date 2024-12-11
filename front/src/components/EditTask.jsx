import React, { useState } from "react";


export default function EditTask({ task, setIsEditing, onUpdateTodo }) {
    const [owner, setOwner] = useState(task.owner); // Новый параметр "чья задача"
    const [type, setType] = useState(task.type);
    const [text, setText] = useState(task.text);
    const [dueDate, setDueDate] = useState(null);
    const [repeat, setRepeat] = useState(task.repeat);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Создание задачи
        const newTask = {
            ...task,
            owner,
            type,
            text,
            dueDate: dueDate ? new Date(dueDate).getTime() : null,
            repeat: dueDate ? repeat : false, // Повтор доступен только при наличии dueDate
        };

        await onUpdateTodo(newTask)

        setOwner("Для всех");
        setType("задача");
        setText("");
        setDueDate(null);
        setRepeat(false);
        setIsEditing(false)
    };

    return (
        <div className="task-modal" onClick={() => setIsEditing(false)}>
            <form className="add-task-form" onSubmit={handleSubmit}  onClick={(e) => e.stopPropagation()}>
                <h2 className="add-task-title">Добавить задачу</h2>

                <div className="form-group">
                    <label htmlFor="owner">Чья задача:</label>
                    <select
                        id="owner"
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                        className="form-input"
                    >
                        <option value="Для всех">Для всех</option>
                        <option value="Делайла">Делайла</option>
                        <option value="Матвей">Матвей</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="type">Тип задачи:</label>
                    <select
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="form-input"
                    >
                        <option value="задача">Задача</option>
                        <option value="постоянный расход">Постоянный расход</option>
                        <option value="покупки">Покупки</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="text">Сообщение:</label>
                    <input
                        type="text"
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dueDate">Дата выполнения (optional):</label>
                    <input
                        type="date"
                        id="dueDate"
                        value={dueDate ? dueDate.split("T")[0] : ""}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="form-input"
                    />
                </div>

                {dueDate && (
                    <div className="form-group">
                        <label htmlFor="repeat">
                            Повторять:
                            <input
                                type="checkbox"
                                id="repeat"
                                checked={repeat}
                                onChange={(e) => setRepeat(e.target.checked)}
                                className="form-checkbox"
                            />
                        </label>
                    </div>
                )}

                <button type="submit" className="submit-button">
                    Изменить задачу
                </button>
            </form>
        </div>
    );
};

