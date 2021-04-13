import React, {ChangeEvent, useState} from "react";
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>(props.title);
    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        setEditMode(false);
        props.changeTitle(title);
    }
    const onChageHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <TextField
                color={"primary"}
                variant={"standard"}
                value={title}
                onBlur={offEditMode}
                autoFocus
                onChange={onChageHandler}/>
            // ? <input
            //     value={title}
            //     onBlur={offEditMode}
            //     autoFocus
            //     onChange={onChageHandler}/>
            : <
                span
                onDoubleClick={onEditMode}> {props.title}
</span>
    )


}