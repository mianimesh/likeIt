import React,{useState,useContext} from 'react' ;
import {PostContext} from './PostContext' ;
import {FormControl,Button,TextField} from '@material-ui/core' ;
import Snackbar from '@material-ui/core/Snackbar' ;
import {Link} from 'react-router-dom' ;

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
        setPosts(prevPosts => [{title:title,body:body,id:posts.length+1},...prevPosts]);
        setTitle("") ;
        setBody("") ;
    }
    const handleClick = ()=>{
        setSubmitted(true) ;
    }
    return (
        <div>
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
        </div>
    )
}
export default AddPost