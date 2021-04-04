import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {filteresValueType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTask: (taskId: string, todoListID: string) => void
    removeTodoList: (taskId: string) => void
    changeFilter: (value: filteresValueType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    todoListFilter: filteresValueType
    changeTaskStatus: (taskID: string, newIsdone: boolean, todoListID: string) => void
}

export let TodoList = (props: PropsType) => {
    let [title, setTitle] = useState("");
    let [error, setError] = useState()
    const addTask = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addTask(trimmedTitle, props.id);
        } else {
            setError("Davaj po novoj misza")
        }
        setTitle("")
    }

    const onChageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }
    const changeFilterAll = () => {
        props.changeFilter("all", props.id);
    }
    const changeFilterActive = () => {
        props.changeFilter("active", props.id);
    }
    const changeFilterCompleted = () => {
        props.changeFilter("completed", props.id);
    }
    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }


    return (
        <div>

            <h3>{props.title}<button onClick={removeTodoList}>X</button></h3>
            <div>
                <input value={title}
                       onChange={onChageHandler}
                       onKeyPress={onPressHandler}
                       className={error ? "error" : ""}/>
                <button onClick={addTask}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const removeTask = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const changeTask = (e: ChangeEvent<HTMLInputElement>) => {
                        setError(null)
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    return <li key={t.id}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={changeTask}
                        />
                        <span>{t.title}</span>
                        <button onClick={removeTask}>x</button>
                    </li>
                })}
            </ul>
            <div>
                <button
                    className={props.todoListFilter === "all" ? "btn" : ""}
                    onClick={changeFilterAll}>All
                </button>
                <button
                    className={props.todoListFilter === "active" ? "btn" : ""}
                    onClick={changeFilterActive}>Active
                </button>
                <button
                    className={props.todoListFilter === "completed" ? "btn" : ""}
                    onClick={changeFilterCompleted}>Completed
                </button>
            </div>
        </div>
    )

}