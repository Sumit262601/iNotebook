import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import AddNotes from './components/AddNotes';
import NoteState from './context/notes/NoteState';
import YourNotes from './components/YourNotes';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }


  return (
    <>
      <NoteState>
        <Router>
          <Navbar brand="iNotebook" yournotes="Your Notes" home="Add Notes" about="About" />
          <Alert alert={alert} />
          <div className='container my-3'>
            <Routes>
              <Route excat path="/" element={<Home />} ></Route>
              <Route excat path="/yournotes" element={<YourNotes showAlert={showAlert} />} ></Route>
              <Route excat path="/addnotes" element={<AddNotes showAlert={showAlert} />} ></Route>
              <Route excat path="/about" element={<About />}></Route>
              <Route excat path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route excat path="/signup" element={<Signup showAlert={showAlert} />}></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;