import React, { useState } from "react";
import { saveTodo } from '../store/todo/todo.action.js'


export default function AddTask({ setOnModal }) {
    const [owner, setOwner] = useState("Для всех"); // Новый параметр "чья задача"
    const [type, setType] = useState("задача");
    const [text, setText] = useState("");
    const [dueDate, setDueDate] = useState(null);
    const [repeat, setRepeat] = useState(false);

    const today = new Date().toISOString().split("T")[0];

    const handleSubmit = async (e) => {
        e.stopPropagation()
        e.preventDefault();

        // Создание задачи
        const newTask = {
            owner,
            type,
            text,
            dueDate: dueDate ? new Date(dueDate).getTime() : null,
            repeat: dueDate ? repeat : false, // Повтор доступен только при наличии dueDate
            createdAt: Date.now(),
            isCompleted: false
        };

        try {
            await saveTodo(newTask)

            // Очистка формы
            setOwner("Для всех");
            setType("задача");
            setText("");
            setDueDate(null);
            setRepeat(false);
            setOnModal(false)
        } catch (error) {
            console.error("Ошибка при добавлении задачи:", error);
            alert("Не удалось добавить задачу");
        }
    };

    return (
        <div className="task-modal" onClick={() => setOnModal(false)}>
            <form className="add-task-form" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
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
                        min={today}
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
                    Добавить задачу
                </button>
            </form>
        </div>
    );
};

