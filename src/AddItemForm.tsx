import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}
export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<string | null>();

    console.log("AddItemForm called");

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null){
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    const addItem = () => {
        const trimmedTitle = title.trim();
        if (trimmedTitle) {
            props.addItem(trimmedTitle);
        } else {
            setError("Title is required");
        }
        setTitle("")
    }
    const onBlurOff = () => {
        setError("")
    }

    return (
        <div>
            <TextField
                variant={"outlined"}
                label={"Title"}
                error={!!error}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onPressHandler}
                helperText={error}
                onBlur={onBlurOff}
                />
            <IconButton
                onClick={addItem}
            >
                <AddBox/>
            </IconButton>
        </div>
    )
})