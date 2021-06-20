import React from "react";
import {Meta, Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {v1} from "uuid";
import {Task, TaskPropsType} from "./Task";


export default {
    title: "Todolist/Task",
    component: Task
} as Meta;

const changeTaskStatusCallBack = action("Change status click");
const changeTaskTitleCallBack = action("Change title click");
const removeTaskCallBack = action("Remove task click");

const baseArg = {
    changeTaskStatus: changeTaskStatusCallBack,
    changeTaskTitle: changeTaskTitleCallBack,
    removeTask: removeTaskCallBack
}

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    task: {id: "1", title: "JS", isDone: true},
    todolistId: v1(),
    ...baseArg
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    task: {id: "1", title: "JS", isDone: false},
    todolistId: v1(),
    ...baseArg
}