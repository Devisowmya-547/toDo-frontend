import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import Signing from './components/login/Signing';
import Home from './components/home/Home';

function App() {
  return (
      <Router>
        <Routes>
          <Route path='/' element = {<Signing />}/>
          <Route path='/home' element =  {<Home />} />
        </Routes>
      </Router>
  );
}

export default App;