import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';  // Import Toaster for react-hot-toast
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import AddNotes from './components/AddNotes';
import YourNotes from './components/YourNotes';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import ProtectedRoute from './Auth/ProtectedRouter'; // Import the ProtectedRoute component
import NoteState from './context/notes/NoteState';  // NoteState for state management

function App() {
  const [alert, setAlert] = useState(null);

  // Function to show alert with message and type
  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <NoteState>
        <Router>
          {/* Navbar component */}
          <Navbar brand="iNotebook" yournotes="Your Notes" home="Add Notes" about="About" />

          {/* Alert component for displaying alerts */}
          <Alert alert={alert} />

          {/* Toaster component for toast notifications */}
          <Toaster position="top-center" reverseOrder={false} />

          {/* Main Routes */}
          <div className=''>
            <Routes>
              {/* Public Routes */}
              <Route exact path="/" element={<Home />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />

              {/* Protected Routes */}
              <Route
                exact
                path="/yournotes"
                element={
                  <ProtectedRoute>
                    <YourNotes showAlert={showAlert} />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/addnotes"
                element={
                  <ProtectedRoute>
                    <AddNotes showAlert={showAlert} />
                  </ProtectedRoute>
                }
              />
              <Route
                exact
                path="/about"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
