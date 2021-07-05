import React, {useEffect, useState} from "react"
import axios from "axios";
import {taskAPI, todolistAPI} from "../api/todolist-api";


export default {
    title: "API"
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    const refresh = () => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <button onClick={refresh}>refresh</button>
        </div>
    </div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const title = "XXXX";
    const createTodolist = () => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <button onClick={createTodolist}>Create Todolist</button>
        </div>
    </div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("")
    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={"todolistId"}
                value={todolistId}
                onChange={e => setTodolistId(e.currentTarget.value)}
            />
            <button onClick={deleteTodolist}>delete todolist</button>
        </div>
    </div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const updateTitle = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={"todolistId"}
                value={todolistId}
                onChange={e => setTodolistId(e.currentTarget.value)}
            />
            <input
                placeholder={"new title"}
                value={title}
                onChange={e => setTitle(e.currentTarget.value)}
            />
            <button onClick={updateTitle}>update title</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");

    const refresh = () => {
        taskAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={"todolistId"}
                value={todolistId}
                onChange={e => setTodolistId(e.currentTarget.value)}
            />
            <button onClick={refresh}>refresh</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const addTask = () => {
        taskAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div> {JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"}
                   value={todolistId}
                   onChange={e => setTodolistId(e.currentTarget.value)}
            />
            <input
                placeholder={"title"}
                value={title}
                onChange={e => setTitle(e.currentTarget.value)}
            />
            <button onClick={addTask}>add task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");

    const deleteTask = () => {
        taskAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={"todolistId"}
                value={todolistId}
                onChange={e => setTodolistId(e.currentTarget.value)}
            />
            <input
                placeholder={"taskId"}
                value={taskId}
                onChange={e => setTaskId(e.currentTarget.value)}
            />
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const updateTask = () => {
        taskAPI.updateTask(todolistId, taskId, title)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={"todolistId"}
                value={todolistId}
                onChange={e => setTodolistId(e.currentTarget.value)}
            />
            <input
                placeholder={"taskId"}
                value={taskId}
                onChange={e => setTaskId(e.currentTarget.value)}
            />
            <input
                placeholder={"title"}
                value={title}
                onChange={e => setTitle(e.currentTarget.value)}
            />
            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}