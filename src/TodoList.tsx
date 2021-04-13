import React, {ChangeEvent} from "react";
import {filteresValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
                {/*<button onClick={removeTodoList}>X</button>*/}
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul style={{padding: "0", listStyle: "none"}}>
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
                        {/*<input type="checkbox"*/}
                        {/*       checked={t.isDone}*/}
                        {/*       onChange={changeTask}*/}
                        {/*/>*/}
                        <Checkbox
                            checked={t.isDone}
                            onChange={changeTask}
                            color = {"primary"}
                        />
                        <EditableSpan
                            title={t.title}
                            changeTitle={changeTitle}
                        />
                        {/*<button onClick={removeTask}>x</button>*/}
                        <IconButton onClick={removeTask}>
                            <Delete/>
                        </IconButton>
                    </li>
                })}
            </ul>
            <div>
                <Button
                    color={"primary"}
                    variant={props.todoListFilter === "all" ? "contained" : "outlined"}
                    onClick={changeFilterAll}>All
                </Button>
                <Button
                    color={"primary"}
                    variant={props.todoListFilter === "active" ? "contained" : "outlined"}
                    onClick={changeFilterActive}>Active
                </Button>
                <Button
                    color={"primary"}
                    variant={props.todoListFilter === "completed" ? "contained" : "outlined"}
                    onClick={changeFilterCompleted}>Completed
                </Button>
            </div>
        </div>
    )
}

