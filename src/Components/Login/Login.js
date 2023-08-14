import React from 'react';
import { useState , useContext } from 'react';
import { FirebaseContext } from '../../store/FirebaseContext';

import Logo from '../../olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [emailId,setEmailId] = useState('')
  const [password,setPassword] = useState('')
  const auth = getAuth();

  const {firebase} = useContext(FirebaseContext)


  const navigate = useNavigate()
  const submitLogin=(e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth,emailId,password).then(()=>{
      // alert('Logged in')
      navigate('/')

    }).catch((error)=>{
      alert(error.message)
    })
  }
  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            value={emailId}
            onChange={(e)=>setEmailId(e.target.value)}
            name="email"
            // defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
            // defaultValue="Doe"
          />
          <br />
          <br />
          <button onClick={submitLogin}>Login</button>
        </form>
        <a onClick={()=>{
          navigate('/signup')
        }} >Signup</a>
      </div>
    </div>
  );
}

export default Login;
