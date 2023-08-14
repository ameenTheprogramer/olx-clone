import React, { useContext } from 'react';
import { Auth } from 'firebase/compat/auth';
import { firebaseConfig } from '../../firebase/config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import {useNavigate} from 'react-router-dom'

import Logo from '../../olx-logo.png';
import './Signup.css';
import { useState } from 'react';
import {FirebaseContext} from '../../store/FirebaseContext'

import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";

const Firebase = firebase.initializeApp(firebaseConfig);




export default function Signup() {
  var db = Firebase.firestore()
  const navigate = useNavigate()
  const [userName,setUserName] = useState('')
  const [phoneNumber,setPhoneNumber] = useState('')
  const [emailId,setEmailId] = useState('')
  const [password,setPassword] = useState('')
  const auth = getAuth();

  const {firebase} = useContext(FirebaseContext)

  const submit =(e)=>{
    var user = null;
    e.preventDefault()
    createUserWithEmailAndPassword(auth,emailId,password)
    .then((userCredential) => {
      user = auth.currentUser;
       updateProfile(user, {
        displayName: userName,
        phoneNumber: phoneNumber
      })
      
    }).then(()=>{
      
      db.collection('users').add({
        id: user.uid,
        username: userName,
        phone: phoneNumber
      }).then(()=>{
        navigate('/')
    })
    })

    // })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    })
  }



  return (

    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={(e)=>submit(e)} >
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}

            id="fname"
            name="name"
            // defaultValue="John"
          />
          <br />
          <label htmlFor="ename">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={emailId}
            onChange={(e)=>setEmailId(e.target.value)}
            id="ename"
            name="email"
            // defaultValue="example@gmail.com"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phoneNumber}
            onChange={(e)=>setPhoneNumber(e.target.value)}
            id="lname"
            name="phone"
            // defaultValue="Doe"
          />
          <br />
          <label htmlFor="pname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            id="pname"
            name="password"
            // defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a onClick={()=>{ 
              navigate('/login')

        }} >Login</a>
      </div>
    </div>
  );
}
