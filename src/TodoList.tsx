import React, {ChangeEvent} from "react";
import {filteresValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodolistTitle: (id: string, title: string) => void
}

export let TodoList = (props: PropsType) => {

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
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }

    const addTask = (title: string) => props.addTask(title, props.id)

    return (
        <div>
            <h3><EditableSpan
                title={props.title}
                changeTitle={changeTodolistTitle}/>
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(t => {
                    const removeTask = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const changeTask = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const changeTitle = (title: string) => {
                        props.changeTaskTitle(t.id, title, props.id)
                    }
                    return <li key={t.id}>
                        <input type="checkbox"
                               checked={t.isDone}
                               onChange={changeTask}
                        />
                        <EditableSpan
                            title={t.title}
                            changeTitle={changeTitle}
                        />
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

