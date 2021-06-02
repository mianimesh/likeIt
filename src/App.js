import React,{useEffect, useState} from 'react' ;
import './App.css';
import PostList from './PostList' ;
import {PostProvider} from './PostContext'
import Nav from './Nav' ;
import AddPost from './AddPost' ;
import {Container} from '@material-ui/core' ; 
import {makeStyles} from "@material-ui/core/styles" ;
import {BrowserRouter,Route,Switch} from "react-router-dom" ;
import Search from './Search' ;
import UpdatePost from './UpdatePost' ;
import ViewLiked from './ViewLiked' ;
import Login from './Login' ; 
import ViewDisliked from './ViewDisliked' ;
import {LikePostProvider} from './LikePostContext' ;
import {DislikePostProvider } from './DislikePostContext';
import firebase from 'firebase' ; 

const useStyles = makeStyles((theme)=>({
  root:{
    width:"100vw",
    height:"100vh",
    backgroundColor:theme.palette.grey[300],
    paddingTop:theme.spacing(5),
  },
}));

function App() {
  const [user,setUser] = useState('') // signed-in user is an object else it is null
  const [email,setEmail] = useState('') ; 
  const [password,setPassword] = useState('') ; 

  const [emailError,setEmailError] = useState('') ; 
  const [passwordError,setPasswordError] = useState('') ; 
  const [hasAccount,setHasAccount] = useState(false) ; 
  const db = firebase.firestore() ;
  const user1 = firebase.auth().currentUser ;
  const classes = useStyles() ; 

  const clearInputs = () =>{
    setEmail('') ; 
    setPassword('') ; 
  }
  const clearErrors = ()=>{
    setEmailError('') ; 
    setPasswordError('') ; 
  }

  const handleLogin = ()=>{
    clearErrors() ; 
    db.collection('posts').get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        doc.ref.update({
          liked:0, 
          disliked:0
        })
      })
    })
    firebase.auth().signInWithEmailAndPassword(email,password).catch((e)=>{
      switch(e.code){
        case "auth/Invalid-email" : 
        case "auth/user-disabled" :
        case "auth/user-not-found" : 
        setEmailError(e.message) ; 
        break ;
        case "auth/wrong-password" : 
        setPasswordError(e.message) ; 
        break ; 
      }
    }) ; 
  }
  const handleSignup = ()=>{
    clearErrors() ; 
    firebase.auth().createUserWithEmailAndPassword(email,password).then(function(cred){

      db.collection('posts').get().then(function(querySnapshot){
        querySnapshot.forEach(function(doc){
          doc.ref.update({
            liked:0,
            disliked:0
          })
        })
      })
       //get user data from auth trigger
      const userUid = cred.user.uid ; // The UID of the user 
      const email = cred.user.email ; 
      
      console.log(cred.user) ; 
      //set account doc
      const account = {
        useruid:userUid,
      }
    }).catch((e)=>{
      switch (e.code){
        case "auth/email-already-in-use":
        case "auth/invalid-email" :
        case "auth/user-not-found" : 
          setEmailError(e.message) ;
          break ;
        case "auth/weak-password" : 
          setPasswordError(e.message) ; 
          break ; 
      }
    }) ; 
  };
  const handleLogout = () =>{
    firebase.auth().signOut() ; 
    db.collection('posts').doc()
  } ; 

  const authListener = () =>{
    firebase.auth().onAuthStateChanged(user =>{
      if(user)
      {
        clearInputs() ; 
        setUser(user) ; 
      }
      else
        setUser('') ; 
    })
  }
  useEffect(() =>{
    authListener() ; 
  },[])

  return (
    <PostProvider>
        <LikePostProvider>
        <DislikePostProvider>
    <BrowserRouter>
        <Container className={classes.root} disableGutters>
        <Nav user={user} handleLogout={handleLogout}/>
        <Switch>
          <Route exact path="/" component = {PostList}/>
          <Route path="/login"> <Login 
            email={email} 
            setEmail={setEmail} 
            password={password}
            setPassword = {setPassword}
            handleLogin = {handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount = {setHasAccount}
            emailError={emailError}
            passwordError={passwordError}/>
          </Route>
          <Route path="/posts">
            <PostList user={user}/>
          </Route>
          <Route path="/createpost" component={AddPost}/>
          <Route path="/searchposts" component={Search}/>
          <Route path="/edit/:id" component = {UpdatePost}/>
          <Route path="/viewliked" component = {ViewLiked}/>
          <Route path="/viewDisliked" component = {ViewDisliked}/>
        </Switch>
        </Container>
    </BrowserRouter>
    </DislikePostProvider>
    </LikePostProvider>
    </PostProvider>

  );
}

export default App;
