import React, {ChangeEvent, useCallback, useState} from "react";
import {Checkbox, IconButton, TextField} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TasksType} from "./TodoList";
import {EditableSpan} from "./EditableSpan";

type TaskPropsType = {
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newValue: string, todolistId: string) => void
    task: TasksType
}
export const Task = React.memo(({
                                    task,
                                    changeTaskStatus,
                                    removeTask,
                                    changeTaskTitle,
                                    todolistId
                                }: TaskPropsType) => {
    console.log("Task called");

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        changeTaskStatus(task.id, e.currentTarget.checked, todolistId)
    }

    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(task.id, newValue, todolistId);
    }, [changeTaskTitle, task.id, todolistId]);

    const onClickHandler = useCallback(() => removeTask(task.id, todolistId), [removeTask, task.id, todolistId]);

    const opacityStyle = task.isDone === true ? {opacity: "0.5"} : {opacity: "1"}


    return (
        <li
            key={task.id}
            style={opacityStyle}
        >
            <Checkbox
                checked={task.isDone}
                onChange={onChangeHandler}
                color={"primary"}
            />
            <EditableSpan
                title={task.title}
                changeTitle={onTitleChangeHandler}
            />
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </li>
    )


});