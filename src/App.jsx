import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Login from './components/login/Login';
import SignUp from './components/login/SignUp';
import Task from './components/task/Task';
import Note from './components/note/Note';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element = {<Login />}/>
          <Route path='/signup' element = {<SignUp />}/>
          <Route path='/task' element = {<Task />}/>
          <Route path='/note' element = {<Note />}/>
        </Routes>
      </Router>
  );
}

export default App;