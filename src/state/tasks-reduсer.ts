import {TasksStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reduсer";

export type RemoveTaskAT = {
    type: "REMOVE_TASK"
    tasksId: string
    todoListId: string
}

export type AddTasktAT = {
    type: "ADD_TASK"
    title: string
    todolistId: string
}

export type ChangeTaskStatusAT = {
    type: "CHANGE_TASK_STATUS"
    taskId: string
    isDone: boolean
    todolistId: string
}

export type ChangeTaskTitleAT = {
    type: "CHANGE_TASK_TITLE"
    taskId: string
    title: string
    todolistId: string
}


export type ActionsType = RemoveTaskAT
| AddTasktAT
| ChangeTaskStatusAT
| ChangeTaskTitleAT
| AddTodolistAT
| RemoveTodolistAT

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            const stateCopy = {...state};
            const tasks = state[action.todoListId];
            const filteredTasks = tasks.filter(t => t.id !== action.tasksId);
            stateCopy[action.todoListId] = filteredTasks;
            return stateCopy;
        }

        case "ADD_TASK": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case "CHANGE_TASK_STATUS": {
            const updatedTask = state[action.todolistId].map(task => {
                if (task.id === action.taskId) {
                    return {...task, isDone: action.isDone};
                }
                return task;
            })
            return {...state, [action.todolistId]: updatedTask};
        }
        case "CHANGE_TASK_TITLE": {
            const updatedTask = state[action.todolistId].map(task => {
                if (task.id === action.taskId) {
                    return {...task, title: action.title};
                }
                return task;
            })
            return {...state, [action.todolistId]: updatedTask};
        }
        case "ADD_TODOLIST": {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case "REMOVE_TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.todoListID];
            return stateCopy;
        }

        default:
            return state
    }
}


export const removeTaskAC = (tasksId: string, todoListId: string): RemoveTaskAT => {
    return {
        type: "REMOVE_TASK",
        tasksId,
        todoListId
    }
}

export const addTaskAC = (title: string, todolistId: string): AddTasktAT => {
    return {
        type: "ADD_TASK",
        title,
        todolistId
    }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusAT => {
    return {
        type: "CHANGE_TASK_STATUS",
        taskId,
        isDone,
        todolistId
    }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleAT => {
    return {
        type: "CHANGE_TASK_TITLE",
        taskId,
        title,
        todolistId
    }
}
