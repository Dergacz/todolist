import React, {ChangeEvent, useCallback} from "react";
import {FilteresValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

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
    changeFilter: (value: FilteresValueType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    todoListFilter: FilteresValueType
    changeTaskStatus: (taskID: string, newIsdone: boolean, todoListID: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodolistTitle: (id: string, title: string) => void
}

export const TodoList = React.memo((props: PropsType) => {
    console.log("Todolist called");

    const changeFilterAll = useCallback(() => {
        props.changeFilter("all", props.id);
    }, [props.changeFilter, props.id]);
    const changeFilterActive = useCallback(() => {
        props.changeFilter("active", props.id);
    }, [props.changeFilter, props.id]);
    const changeFilterCompleted = useCallback(() => {
        props.changeFilter("completed", props.id);
    }, [props.changeFilter, props.id]);

    const removeTodoList = () => {
        props.removeTodoList(props.id)
    }

    const changeTodolistTitle = useCallback((title: string) => {
        if (title.trim() !== ""){
            props.changeTodolistTitle(props.id, title);
        }
        else {
            props.changeTodolistTitle(props.id, props.title);
        }
    }, [props.changeTodolistTitle, props.id]);

    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id]);

    const getTasksForTodoList = () => {
        switch (props.todoListFilter) {
            case "active":
                return props.tasks.filter(t => t.isDone === false);
            case "completed":
                return props.tasks.filter(t => t.isDone === true);
            default:
                return props.tasks;
        }
    };

    return (
        <div>
            <h3><EditableSpan
                title={props.title}
                changeTitle={changeTodolistTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            {/*<ul style={{padding: "0", listStyle: "none"}}>*/}
            {/*    {getTasksForTodoList().map(t => {*/}
            {/*        const removeTask = () => {*/}
            {/*            props.removeTask(t.id, props.id)*/}
            {/*        }*/}
            {/*        const changeTask = (e: ChangeEvent<HTMLInputElement>) => {*/}
            {/*            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)*/}
            {/*        }*/}
            {/*        const changeTitle = (title: string) => {*/}
            {/*            props.changeTaskTitle(t.id, title, props.id)*/}
            {/*        }*/}
            {/*        return <li key={t.id}>*/}
            {/*            <Checkbox*/}
            {/*                checked={t.isDone}*/}
            {/*                onChange={changeTask}*/}
            {/*                color = {"primary"}*/}
            {/*            />*/}
            {/*            <EditableSpan*/}
            {/*                title={t.title}*/}
            {/*                changeTitle={changeTitle}*/}
            {/*            />*/}
            {/*            <IconButton onClick={removeTask}>*/}
            {/*                <Delete/>*/}
            {/*            </IconButton>*/}
            {/*        </li>*/}
            {/*    })}*/}
            {/*</ul>*/}
            <div>
                {
                    getTasksForTodoList.map(t => {
                        <Task
                            key={t.id}
                            task={t}
                            removeTask={props.removeTask(t.task)}
                            changeTaskStatus={props.changeTaskStatus}
                            changeTaskTitle={t.title}
                            />
                    })
                }
            </div>
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
});

