import React, {useReducer, useState} from "react";
import "./App.css";
import {TasksType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodolistAC,
    changeTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reduсer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reduсer";

export type FilteresValueType = "all" | "completed" | "active";


export type TodoListType = {
    id: string,
    title: string,
    filter: FilteresValueType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function App() {

    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer, [
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "TS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Beer", isDone: true},
            {id: v1(), title: "Water", isDone: false},
        ],
    })

    let removeTask = (id: string, todoListID: string) => {
        const action = removeTaskAC(id, todoListID);
        dispatchToTasks(action);
    }

    const addTask = (title: string, todoListID: string) => {
        const action = addTaskAC(title, todoListID);
        dispatchToTasks(action);
    }

    const changeTaskStatus = (taskID: string, newIsdone: boolean, todoListID: string) => {
        const action = changeTaskStatusAC(taskID, newIsdone, todoListID);
        dispatchToTasks(action);
    }

    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        const action = changeTaskTitleAC(taskID, title, todoListID);
        dispatchToTasks(action);
    }

    let changeFilter = (value: FilteresValueType, todoListID: string) => {
        const action = changeTodolistFilterAC(value, todoListID);
        dispatchToTodoLists(action);

    }


    const getTasksForTodoList = (todolist: TodoListType) => {
        switch (todolist.filter) {
            case "active":
                return tasks[todolist.id].filter(t => t.isDone === false)
            case "completed":
                return tasks[todolist.id].filter(t => t.isDone === true)
            default:
                return tasks[todolist.id]
        }
    }

    const changeTodolistTitle = (id: string, title: string) => {
        const action = changeTodolistAC(id, title);
        dispatchToTodoLists(action);
    }

    const removeTodoList = (todoListID: string) => {
        const action = removeTodolistAC(todoListID);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }

    const todolistComponents = todoLists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper>
                    <TodoList

                        id={tl.id}
                        title={tl.title}
                        tasks={getTasksForTodoList(tl)}
                        removeTask={removeTask}
                        removeTodoList={removeTodoList}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        todoListFilter={tl.filter}
                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })


    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolist
                    </Typography>
                    <Button color="inherit"
                            variant={"outlined"}
                    >
                        Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed
            >
                <Grid container style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container={true} spacing={5}>
                    {
                        todolistComponents
                    }
                </Grid>
            </Container>

        </div>
    );
}

export default App;

