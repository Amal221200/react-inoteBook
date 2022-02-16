import { useState } from 'react'
import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const host = 'http://localhost:5000'

    const fetchNotes = async () => {
        const res = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json",
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYzRkYmQ4ODFhMDljMzNiNmMyMzY1In0sImlhdCI6MTY0NDk3MzUwMX0.SERDKB48jwmnj4WSbZkYN7rQOB8GyJQoo8_51JRY1Bo"
            }
        })
        const data = await res.json()
        setNotes(data)
    }

    const ini_notes = []
    const [notes, setNotes] = useState(ini_notes)

    const addNote = async (title, description, tag) => {
        const res = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYzRkYmQ4ODFhMDljMzNiNmMyMzY1In0sImlhdCI6MTY0NDk3MzUwMX0.SERDKB48jwmnj4WSbZkYN7rQOB8GyJQoo8_51JRY1Bo"
            },
            body: JSON.stringify({ title, description, tag })
        })

        const data = await res.json()
        // const note = {
        //     "_id": "620c4ff1a7140c20209033bc5",
        //     "user": "620c4dbd881a09c33b6c2365",
        //     "title": title,
        //     "description": description,
        //     "tag": tag,
        //     "date": "2022-02-16T01:10:50.377Z",
        //     "__v": 0
        // }
        setNotes([...notes, data])
    }

    const deleteNote = async (id) => {
        const res = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYzRkYmQ4ODFhMDljMzNiNmMyMzY1In0sImlhdCI6MTY0NDk3MzUwMX0.SERDKB48jwmnj4WSbZkYN7rQOB8GyJQoo8_51JRY1Bo"
            }
        })

        const data = await res.json()
        const upNotes = notes.filter(note => note._id !== data._id)
        setNotes(upNotes)
    }

    const updateNote = async (id, title, description, tag) => {
        // const note = notes.filter(note => note._id === id)
        // note[0].title = title
        // note[0].description = description
        // note[0].tag = tag

        const res = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json",
                "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIwYzRkYmQ4ODFhMDljMzNiNmMyMzY1In0sImlhdCI6MTY0NDk3MzUwMX0.SERDKB48jwmnj4WSbZkYN7rQOB8GyJQoo8_51JRY1Bo"
            },
            body: JSON.stringify({ title, description, tag })
        })

        const data = await res.json()

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title
                element.description = description
                element.tag = tag
            }
        }
        // setNotes(note)
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote, fetchNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState