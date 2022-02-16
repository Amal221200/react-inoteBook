import { useState } from 'react'
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const initialNotes = [
        {
            "_id": "620c4e817140c20209033bc0",
            "user": "620c4dbd881a09c33b6c2365",
            "title": "Hello there",
            "description": "This is my second note",
            "tag": "General",
            "date": "2022-02-16T01:08:17.243Z",
            "__v": 0
        },
        {
            "_id": "620c4eb87140c20209033bc2",
            "user": "620c4dbd881a09c33b6c2365",
            "title": "My Bad",
            "description": "This is my terrible mistake",
            "tag": "General",
            "date": "2022-02-16T01:09:12.789Z",
            "__v": 0
        },
        {
            "_id": "620c4f1a7140c20209033bc5",
            "user": "620c4dbd881a09c33b6c2365",
            "title": "Third note",
            "description": "This is my third note",
            "tag": "General",
            "date": "2022-02-16T01:10:50.377Z",
            "__v": 0
        },
        {
            "_id": "620c4f1a7140c20209033bc5",
            "user": "620c4dbd881a09c33b6c2365",
            "title": "Third note",
            "description": "This is my third note",
            "tag": "General",
            "date": "2022-02-16T01:10:50.377Z",
            "__v": 0
        },
        {
            "_id": "620c4f1a7140c20209033bc5",
            "user": "620c4dbd881a09c33b6c2365",
            "title": "Third note",
            "description": "This is my third note",
            "tag": "General",
            "date": "2022-02-16T01:10:50.377Z",
            "__v": 0
        },
        {
            "_id": "620c4f1a7140c20209033bc5",
            "user": "620c4dbd881a09c33b6c2365",
            "title": "Third note",
            "description": "This is my third note",
            "tag": "General",
            "date": "2022-02-16T01:10:50.377Z",
            "__v": 0
        },
        {
            "_id": "620c4f1a7140c20209033bc5",
            "user": "620c4dbd881a09c33b6c2365",
            "title": "Third note",
            "description": "This is my third note",
            "tag": "General",
            "date": "2022-02-16T01:10:50.377Z",
            "__v": 0
        },
        {
            "_id": "620c4f1a7140c20209033bc5",
            "user": "620c4dbd881a09c33b6c2365",
            "title": "Third note",
            "description": "This is my third note",
            "tag": "General",
            "date": "2022-02-16T01:10:50.377Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(initialNotes)

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState