import React from 'react';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import CreatePage from './Pages/Create'
import { useEffect , useContext } from 'react';
import 'firebase/compat/auth';
import Post from './store/PostContext';

import Home from './Pages/Home';
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import ViewPost from './Pages/ViewPost';

function App() {
  const auth = getAuth()
  const {firebase} = useContext(FirebaseContext)
  const {setUser}= useContext(AuthContext)
  useEffect(()=>{
    onAuthStateChanged(auth , (user)=>{
      setUser(user)
      // console.log(user);
      
    })
  })
  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
              
            <Route path='/signup' element={<Signup/>}/>

            <Route path='/login' element={<Login/>}/>

            <Route path='/create' element={<CreatePage/>}/>

            <Route path='/view' element={<ViewPost/>}/>
            
      
            
          
          </Routes>
        </Router>
      </Post>
    </div>
  );
}

export default App;
