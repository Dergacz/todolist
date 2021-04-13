import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<string | null>();

    const onChageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItem();
        }
    }

    const addItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addItem(trimmedTitle);
        } else {
            setError("Davaj po novoj misza")
        }
        setTitle("")
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                label={"Title"}
                error={!!error}
                value={title}
                onChange={onChageHandler}
                onKeyPress={onPressHandler}
                helperText={error}
                />
            {/*<input value={title}*/}
            {/*       onChange={onChageHandler}*/}
            {/*       onKeyPress={onPressHandler}*/}
            {/*       className={error ? "error" : ""}/>*/}
            {/*<button onClick={addItem}>+</button>*/}
            <IconButton
                onClick={addItem}
            >
                <AddBox/>
            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    )
}