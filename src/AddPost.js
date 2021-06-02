import React,{useState,useContext} from 'react' ;
import {PostContext} from './PostContext' ;
import {Grid,FormControl,Button,TextField} from '@material-ui/core' ;
import Snackbar from '@material-ui/core/Snackbar' ;
import {Link} from 'react-router-dom' ;
import firebase from 'firebase'
import {v4 as uuid} from 'uuid' ; 

const AddPost = ()=>{
    const [title,setTitle] = useState('') ;
    const [body,setBody] = useState('') ;
    const [posts,setPosts] = useContext(PostContext) ;
    const [submitted,setSubmitted] = useState(false) ;

    const updateTitle = (e)=>{
        setTitle(e.target.value) ; 
        e.target.value="" ;
    }
    const updateBody = (e)=>{
        setBody(e.target.value) ;
    }
    
    const AddPost = (e) =>{
        e.preventDefault() ; 
        const db = firebase.firestore() ; 
        const uid = uuid() ; 
        db.collection('posts').doc(uid).set({title:title,body:body,id:uid,liked:0,disliked:0}) ; 
        setPosts(prevPosts => [{title:title,body:body,id:uid},...prevPosts]);
        setTitle("") ;
        setBody("") ;
    }
    const handleClick = ()=>{
        setSubmitted(true) ;
    }
    return (
        <Grid>
        <form  align="center" onSubmit={AddPost}>
            <h2><u>Add Post</u></h2>
            <TextField label="Post Title" name="title" variant="filled" value = {title} onChange = {updateTitle}/>
            <br/>
            <TextField label="Post Body" name = "body" variant="filled" value={body} onChange={updateBody}/>
            <br/>
            <br/>
            <Button onClick={handleClick} variant="contained" color="secondary" type="submit">Submit</Button>
            <Button variant="contained" color="primary" component={Link} to="/" >Back</Button>
            <Snackbar autoHideDuration={2000} open={submitted} onClose = {()=>setSubmitted(false)} message="Succesfully Submitted!"/>
        
        </form>
        </Grid>
    )
}
export default AddPost