import React, { useState } from 'react'
import Login from './Login'
import SignUp from './SignUp'
import signup from '../../assets/SignUpImg.svg'
import signin from '../../assets/Signin.svg'

const Signing = () => {
    const  [login, setLogin] = useState(true);
    const toggle = () => {
      setLogin(!login);
    }

  return (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40rem'
    }}>
    <div id='formHolder'>
      {login ? <Login /> : <div id="cover">
            <div>
            <img src={signin} alt="" />
            <center><p>Already have an account ?</p> </center>
            <center><button onClick={toggle} id='button' className='lgnbtn'>Login</button></center>
            </ div>
        </div>}
      {login ? <div id="cover">
          <div>
              <img src={signup} alt="" />
              <center><p>Don't have an account ?</p> </center>             
          <center><button onClick={toggle} id='button'>Sign up</button></center>
          </div>
          </div> :<SignUp />}
      </div>
    </ div>
  )
}

export default Signing
