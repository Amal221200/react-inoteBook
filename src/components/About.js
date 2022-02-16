import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'

const About = () => {
    const { state } = useContext(NoteContext)
    return (
        <div>About {state.name}</div>
    )
}

export default About