import {FilteresValueType, TodoListType} from "../App";
import {v1} from "uuid";
import {type} from "os";

type RemoveTodolistAT = {
    type: "REMOVE_TODOLIST"
    todoListID: string
}

type AddTodolistAT = {
    type: "ADD_TODOLIST"
    title: string
}

type ChangeTodoListTitleAT = {
    type: "CHANGE_TODOLIST_TITLE"
    todolistId: string
    title: string
}

type ChangeTodoListFilterAT = {
    type: "CHANGE_TODOLIST_FILTER"
    todolistId: string
    filter: FilteresValueType
}

export type ActionsType = RemoveTodolistAT | AddTodolistAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer = (todoLists: TodoListType[], action: ActionsType): TodoListType[] => {
    switch (action.type) {
        case "REMOVE_TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID);
        case "ADD_TODOLIST":
            const newTodolistID = v1();
            const newTodolist: TodoListType = {
                id: newTodolistID, title: action.title, filter: "all"
            }
            return [...todoLists, newTodolist];
        case "CHANGE_TODOLIST_TITLE":
            const todolist = todoLists.find(tl => tl.id === action.todolistId);
            if (todolist) {
                todolist.title = action.title;
                return [...todoLists];
            }
            else {
                return todoLists;
            }
        case "CHANGE_TODOLIST_FILTER":
            return todoLists.map(tl => tl.id === action.todolistId ? {...tl, filter: action.filter} : tl);

        default:
            return todoLists
    }
}


export const removeTodoListAC = (todoListID: string): RemoveTodolistAT => {
    return {
        type: "REMOVE_TODOLIST",
        todoListID
    }
}

export const addTodolistAC = (title: string): AddTodolistAT => {
    return {
        type: "ADD_TODOLIST",
        title
    }
}

export const changeTodolistAC = (todolistId: string, title: string): ChangeTodoListTitleAT => {
    return {
        type: "CHANGE_TODOLIST_TITLE",
        todolistId,
        title
    }
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilteresValueType): ChangeTodoListFilterAT => {
    return {
        type: "CHANGE_TODOLIST_FILTER",
        todolistId,
        filter
    }
}