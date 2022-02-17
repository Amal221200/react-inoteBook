import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [alert, setAlert] = useState(null)

  const showAlert = (message, type, code="") => {
    setAlert({
      message: message,
      type: type,
      code: code
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000)
  }

  return (
    <NoteState>
      <BrowserRouter>
        <Navbar />
        <Alert message={"Hello there"} alert={alert} />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home showAlert={showAlert} />} />
            <Route path='/login' element={<Login showAlert={showAlert} />} />
            <Route path='/signup' element={<Signup showAlert={showAlert} />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;
