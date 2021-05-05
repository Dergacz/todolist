import React from "react";
import "./App.css";
import {TasksType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {addTodolistAC, changeTodolistAC, changeTodolistFilterAC, removeTodolistAC} from "./state/todolists-reduсer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reduсer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilteresValueType = "all" | "completed" | "active";


export type TodoListType = {
    id: string,
    title: string,
    filter: FilteresValueType
}

export type TasksStateType = {
    [key: string]: Array<TasksType>
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, TodoListType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

    const dispatch = useDispatch()

    let removeTask = (id: string, todoListID: string) => {
        const action = removeTaskAC(id, todoListID);
        dispatch(action);
    }

    const addTask = (title: string, todoListID: string) => {
        const action = addTaskAC(title, todoListID);
        dispatch(action);
    }

    const changeTaskStatus = (taskID: string, newIsdone: boolean, todoListID: string) => {
        const action = changeTaskStatusAC(taskID, newIsdone, todoListID);
        dispatch(action);
    }

    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        const action = changeTaskTitleAC(taskID, title, todoListID);
        dispatch(action);
    }

    let changeFilter = (value: FilteresValueType, todoListID: string) => {
        const action = changeTodolistFilterAC(value, todoListID);
        dispatch(action);

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
        dispatch(action);
    }

    const removeTodoList = (todoListID: string) => {
        const action = removeTodolistAC(todoListID);
        dispatch(action);
    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }

    const todolistComponents = todolists.map(tl => {
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

export default AppWithRedux;

