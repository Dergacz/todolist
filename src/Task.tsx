import React, {ChangeEvent, useState} from "react";
import {Checkbox, IconButton, TextField} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {TasksType} from "./TodoList";
import {EditableSpan} from "./EditableSpan";

type TaskPropsType = {
    task: TasksType
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean) => void
    removeTask: (taskId: string) => void
    changeTaskTitle: (taskId: string, newValue: string) => void
}
export const Task = React.memo(({
                                    task,
                                    changeTaskStatus,
                                    removeTask,
                                    changeTaskTitle
                                }: TaskPropsType) => {
    console.log("Task called");

    const onClickHandler = () => removeTask(task.id);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus (task.id, newIsDoneValue);
    }

    const onTitleChangeHandler = (newValue: string) => {
        changeTaskTitle(task.id, newValue);
    }


    return (
        <li key={task.id}>
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