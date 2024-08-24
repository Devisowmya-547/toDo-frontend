
import { useState } from 'react'
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { SiGmail } from "react-icons/si";
import './signin.css'


function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [conPassword, setConPassword] = useState('');
  const [showConPass, setShowConPass] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if(password !== conPassword){alert("PAsswords doesn't match"); return}
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/user/register`, {
        email, password
      })
      .then(res => {
        alert(res.message);
        if(res.message === 'Account created successfully'){
          navigate("/")
        }
      })
      .catch(e => {
        alert('unexpected error at server')
        console.log(e)
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
        <div id="login" >
        <form method='POST' onSubmit={submit} id='form'>
            <div className="inputBox">
                <SiGmail />
                <input id='input' type="email" required placeholder="EMail" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
            </div>
            <div className="inputBox">
                <i onClick={() => {setShowPass(!showPass)}} style={{background: 'transparent', border: 'none', cursor:'pointer'}}>
                    { showPass ? <IoMdEyeOff /> : <IoMdEye />}
                </i>
                <input id='input' type={showPass ? 'text' : 'password'} required placeholder="Password" value={password} onChange={(e) => {setPassword(e.target.value)}} />
            </div> 
            <div className="inputBox">
                <i onClick={() => {setShowConPass(!showConPass)}} style={{background: 'transparent', border: 'none', cursor:'pointer'}}>
                    { showConPass ? <IoMdEyeOff /> : <IoMdEye />}
                </i>
                <input id='input' type={showConPass ? 'text' : 'password'} required placeholder="Confirm Password" value={conPassword} onChange={(e) => {setConPassword(e.target.value)}} />
            </div> 
            <center><button type="submit" className="logbtn" id='button'>Sign up</button></center>      
        </ form></div>
    </>
  )
}

export default SignUp
