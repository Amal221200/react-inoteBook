import AddNote from './AddNote'
import Notes from './Notes'

const Home = () => {


    return (
        <div className='container my-3' >
            <AddNote />
            <div className="container my-3">
                <Notes />
            </div>
        </div>
    )
}

export default Home