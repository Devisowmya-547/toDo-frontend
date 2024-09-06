import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff} from "react-icons/io";
import { SiGmail } from "react-icons/si";
import './signin.css'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);  

  async function submit(e){
    e.preventDefault();
    try {
        await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, {
            email, password
        })
        .then(res =>{
            if(res.data.message === 'exist'){ 
                alert('Logged in successfully')    
                navigate('/home', {state : {email}})
            }
            else{
                alert(res.data.message)
            }
        })
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>
        <div id="login"><br /><br /><br />
        <center>
        <form method='POST' onSubmit={submit} id='form'>
            <div className="inputBox">
                <i><SiGmail /></i>
                <input id='input' type="email" required placeholder="EMail" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            <div className="inputBox">
                <i onClick={() => {setShowPass(!showPass)}} style={{cursor:'pointer'}}>
                   { showPass ? <IoMdEyeOff /> : <IoMdEye />}
                </i>
                <input id='input' type={showPass ? 'text' : 'password'} required placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </div> 
            <center><button type="submit" className="logbtn" id='button'><b>Login</b></button></center><br />
            <p id='refSignup'>Don't have an account? <a href='/signup'>Register</a></p>
        </ form>
        </center>
        </div>
    </>
  )
}

export default Login
