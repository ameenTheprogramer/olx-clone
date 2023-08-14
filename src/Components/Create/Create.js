import React, { Fragment, useContext, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage'

import { FirebaseContext, AuthContext } from '../../store/FirebaseContext';


import { firebaseConfig } from '../../firebase/config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import { useNavigate } from 'react-router-dom';
const Firebase = firebase.initializeApp(firebaseConfig);


const Create = () => {
  var db = Firebase.firestore()
  const storage = getStorage()
  const navigate = useNavigate()

  const { firebase } = useContext(FirebaseContext)
  const { user } = useContext(AuthContext)
  const date = new Date
  const [image, setImage] = useState(null)
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  // const upload=()=>{
  //     firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
  //     ref.getDownloadURL().then((url)=>{
  //       console.log();
  //     })
  //   })


  // }

  const [percent, setPercent] = useState(0);
  const upload = () => {
    if (!image) {
      alert("Please upload an image first!");
    }

    const storageRef = ref(storage, `/image/${image.name}`);

    // progress can be paused and resumed. It also exposes progress updates.
    // Receives the storage reference and the file to upload.
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );

        // update progress
        setPercent(percent);
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          db.collection('products').add({
            name,
            category,
            price,
            url,
            userId: user.uid,
            createdat: date.toDateString()
          }).then(() => {
            navigate('/')
            alert("! successfully completed !")
          })

        });
      }
    );
  };

  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={name}
            onChange={(e) => setName(e.target.value)}


            name="Name"
          // defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            value={category}
            onChange={(e) => setCategory(e.target.value)}

            name="category"
          // defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input className="input" type="number" id="fname" name="Price" value={price}
            onChange={(e) => setPrice(e.target.value)} />
          <br />
          <br />
          <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>
          <br />
          <input type="file"
            onChange={(e) => setImage(e.target.files[0])} />
          <br />
          <button onClick={upload} className="uploadBtn">upload and Submit</button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
