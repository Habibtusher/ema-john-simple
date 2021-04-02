
import firebase from "firebase/app";
import "firebase/auth";
import { useContext, useState } from 'react';
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import firebaseConfig from "./Firebase.Config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app();
}
function Login() {

  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: {pathname: "/" } };
  
  const [loggedInUser,setLoggedInUser] = useContext(UserContext);

  const [newUser, setNewUser] = useState(false);

  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false,
  });
  

  
  const provider = new firebase.auth.GoogleAuthProvider();
  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then((res) => {
        const { displayName, email, photoURL } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        }
        setUser(signedInUser);
        setLoggedInUser(signedInUser);
        history.replace(from);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.message);
      })
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(() => {
        const signedOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          photo: ''
        }
        setUser(signedOutUser);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }


  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo); 
          updateUserInfo(user.name);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.success = false;
          newUserInfo.error = error.message
          setUser(newUserInfo);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);  
          setLoggedInUser(newUserInfo);
          
          history.replace(from);
        })
        .catch((error) => {
          const newUserInfo = { ...user };
          newUserInfo.success = false;
          newUserInfo.error = error.message
          setUser(newUserInfo);
        });
    }
    e.preventDefault();

    // submit not reload
  }

// store user info

  const updateUserInfo = (name) => {
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name,

    })
    .then(function () {
      console.log('user name update successfully');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // input field valid or not

  const handleChange = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);     
    }
    if (event.target.name === 'password') {
      const isValidPassword = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isValidPassword && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }
  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>sign out</button>
          : <button onClick={handleSignIn}>sign in with google</button>
      }
      <br />
      {
        user.isSignedIn &&
        <div>
          <p>Welcome {user.name}</p>
          <p>Your email :{user.email}</p>
          <img src={user.photo} alt=""></img>
        </div>
      }
      <h1>Log In</h1>
      <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} />
      <label htmlFor="newUser">New User</label>
      {
        <form onSubmit={handleSubmit} >
          {newUser && <input name="name" type="text" onBlur={handleChange} placeholder="Your Name" />}
          <br />
          <input type="text" name="email" onBlur={handleChange} placeholder="Enter your email :" required />
          <br />
          <input type="password" name="password" onBlur={handleChange} placeholder="Enter your password" required />
          <br />
          <input type="submit" value="Submit"/>
        </form>

      }
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}>user {newUser ? 'created' : 'logged in'} successfully</p>
      }

    </div>
  );
}

export default Login;
