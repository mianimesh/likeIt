import React,{useState,useContext,useEffect} from 'react' ;
import {PostContext} from './PostContext' ;
import {TextField,Button} from "@material-ui/core";
import {Link,useHistory} from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar' ;

const UpdatePost = (props)=>{
    const [posts,setPosts] = useContext(PostContext) ;
    const [title,setTitle] = useState('');
    const [body,setBody] = useState('') ;
    const [submitted,setSubmitted] = useState(false) ;

    const [selectedPost,setSelectedPost] = useState({
        id:0,
        title:'',
        body:''
    })
        const currentPostId = parseInt(props.match.params.id) ;
        useEffect(()=>{
            const postId = currentPostId ;
            const selectedPost = posts.find(post=>post.id===postId) ;
            setSelectedPost(selectedPost) ;
        },[currentPostId,posts])

        const updatetitle = (e)=>{
            setTitle(e.target.value);
        }
        const updateBody = (e)=>{
            setBody(e.target.value) ;
        }
        const onSubmit = (e)=>{
            e.preventDefault() ; 
            setSubmitted(true) ;
            posts.map(post=> {
                if(post.id===currentPostId)
                {
                    post.title = title ;
                    post.body = body ; 
                }
            }
                );

        }
    return (
        <div>
        <form align="center" onSubmit = {onSubmit}>
        <h2>Update</h2>
        <TextField name="title" onChange={updatetitle} label="Post Title" variant="filled"/>
        <br/>
        <TextField name="body" label="Post Body" variant="filled" onChange={updateBody}/>
        <br/>
        <br/>
        <Button  type="submit" variant="contained" color="primary" >Update</Button>
        <Button variant="contained" color="primary" component={Link} to="/" >Back</Button>
        <Snackbar autoHideDuration={2000} open={submitted} onClose = {()=>setSubmitted(false)} message="Succesfully Updated!"/>
        </form>
        </div>
    );
}
export default UpdatePost ; 