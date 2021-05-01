import React, {useState} from "react";
import "./App.css";
import {TasksType, TodoList} from "./TodoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type FilteresValueType = "all" | "completed" | "active";


export type TodoListType = {
    id: string,
    title: string,
    filter: FilteresValueType
}

export type TaskStateType = {
    [key: string]: Array<TasksType>
}

function App() {

    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
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
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== id);
        setTasks({...tasks});
    }

    const addTask = (title: string, todoListID: string) => {
        let newTask = {id: v1(), title: title, isDone: false};
        const updatedTask = [newTask, ...tasks[todoListID]]
        setTasks({...tasks, [todoListID]: updatedTask});
    }

    const changeTaskStatus = (taskID: string, newIsdone: boolean, todoListID: string) => {
        const updatedTask = tasks[todoListID].map(t => {
            if (t.id === taskID) {
                return {...t, isDone: newIsdone}
            }
            return t;
        })
        setTasks({...tasks, [todoListID]: updatedTask});
    }

    const changeTaskTitle = (taskID: string, title: string, todoListID: string) => {
        const updatedTask = tasks[todoListID].map(t => {
            if (t.id === taskID) {
                return {...t, title}
            }
            return t;
        })
        setTasks({...tasks, [todoListID]: updatedTask});
    }

    let changeFilter = (value: FilteresValueType, todoListID: string) => {
        const updatedTodoList = todoLists.map(tl => tl.id === todoListID ? {...tl, filter: value} : tl);
        setTodoLists(updatedTodoList);
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
        const todolist = todoLists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = title;
            setTodoLists([...todoLists])
        }
    }

    const removeTodoList = (todoListID: string) => {
        const updatedTodoList = todoLists.filter(tl => tl.id !== todoListID);
        setTodoLists(updatedTodoList);
        delete tasks[todoListID]
    }

    const addTodolist = (title: string) => {
        const newTodolistID = v1();
        const newTodolist: TodoListType = {
            id: newTodolistID, title, filter: "all"
        }
        setTodoLists([...todoLists, newTodolist]);
        setTasks({ [newTodolistID]: [], ...tasks});
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

