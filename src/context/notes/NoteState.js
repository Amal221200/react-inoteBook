import NoteContext from "./NoteContext";

const NoteState = (props) => {

    const state = {
        'name': "Amal",
        'course': "React"
    }
    return (
        <NoteContext.Provider value={{ state }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState