import React, { useState } from "react";
import ConfirmDeleteModal from "./DeleteModal";
import { saveTodo } from "../store/todo/todo.action";

import { FaRegEdit } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import EditTask from "./EditTask";
import TaskModal from "./TaskModal";

export function TodoItem({ todo, onRemoveTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false)
  const [onDelete, setOnDelete] = useState(false)
  const [onModal, setOnModal] = useState(false)

  function handleDelete() {
    onRemoveTodo(todo._id)
    setOnDelete(false)
  };
  function handleChecked() {
    saveTodo({ ...todo, isCompleted: !todo.isCompleted })
  };


  return (
    <div>
      {onModal ? <TaskModal handleChecked={handleChecked} setOnModal={setOnModal} todo={todo} /> : ''}
      {isEditing ? <EditTask task={todo} setIsEditing={setIsEditing} onUpdateTodo={onUpdateTodo} />
        : (
          <div className="todo-item" onClick={() => setOnModal(true)} >
            <div className="todo-container">
              <span >{todo.text}</span>
              <div className="btns">
                <FaRegEdit
                  onClick={(e) => {
                    e.stopPropagation(); // Предотвращает клик по .todo-item
                    setIsEditing(true);
                  }}
                />
                <TiDeleteOutline
                  onClick={(e) => {
                    e.stopPropagation(); // Предотвращает клик по .todo-item
                    setOnDelete(true);
                  }}
                />
              </div>
              {/* <div className="delite-contirm">
                <span>удалить</span>
              </div> */}
            </div>
          </div>
        )}

      {onDelete && (
        <ConfirmDeleteModal
          onConfirm={handleDelete}
          onCancel={() => setOnDelete(false)}
          text={todo.text}
        />
      )}
    </div>
  );
}

