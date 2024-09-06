import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import SignUp from './components/login/SignUp';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element = {<Login />}/>
          <Route path='/signup' element = {<SignUp />}/>
          <Route path='/home' element =  {<Home />} />
        </Routes>
      </Router>
  );
}

export default App;