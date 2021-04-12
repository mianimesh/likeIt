import React,{useState,useContext} from 'react' ;
import {Grid,Button,Box,Typography, createMuiTheme, MuiThemeProvider} from "@material-ui/core" ;
import {pink } from '@material-ui/core/colors';
import {Link} from 'react-router-dom' ;
import {PostContext} from './PostContext' ;
import {LikePostContext} from './LikePostContext' ;
import {DislikePostContext} from './DislikePostContext' ;

const Post = (props) => {

    const [likeFlag,setLikeFlag] = useState(false) ;
    const [dislikeFlag,setDislikeFlag] = useState(false) ;
    const [color1,setColor1] = useState('primary') ; // like color
    const [color2,setColor2] = useState('primary') ; // dislike color
    const [posts,setPosts] = useContext(PostContext) ;
    const [likePosts,setLikePosts] = useContext(LikePostContext) ;
    const [dislikePosts,setDislikePosts] = useContext(DislikePostContext) ;

    function deleteItem(id){
        const newList = posts.filter((post)=>post.id!=id);
        setPosts(newList) ;
    }
    const likeClicked = (props) =>{
        setLikeFlag(!likeFlag) ;
        if(!likeFlag && likePosts.filter(item=> item.id == props.id).length == 0)
        {
            setLikePosts(prevPosts => [...prevPosts,{title:props.title,body:props.body,id:props.id}]);
        }
        else
        {
            const newList = likePosts.filter((likePost)=>likePost.id!=props.id) ;
            setLikePosts(newList) ;
        }
        setDislikeFlag(false) ;
        setColor2('primary') ;
        if(!likeFlag )
            setColor1('secondary');
        else
            setColor1('primary') ;
    }
    const dislikeClicked = (props)=>{
        setDislikeFlag(!dislikeFlag) ;
        if(!dislikeFlag)
        {

            setDislikePosts(prevPosts => [{title:props.title,body:props.body,id:props.id},...prevPosts]);
        }
        else
        {
            const newList = dislikePosts.filter((dislikePost)=>dislikePost.id!=props.id) ;
            setLikePosts(newList) ;
        }
        setLikeFlag(false) ;
        setColor1('primary');
        if(!dislikeFlag)
            setColor2('secondary');
        else
            setColor2('primary') ;

    }
    return (
        <Grid container justify="center" alignItems="center" justify="center">
        <Box border={2} borderColor="primary.main" className="box-post" width={12/20} bgcolor="success.main"> 
            <Box bgcolor="#1f4b59" border={2} borderColor="primary.main"><h3>{props.title}</h3></Box>
            <Box bgcolor="#055ba6"  border={2} borderColor="primary.main">{props.body}</Box>
            <Box border={2} borderColor="primary.main">
            <Button variant="contained" color={color1} onClick={()=>likeClicked(props)}>Like</Button>
            <Button variant="contained" color={color2} onClick={()=>dislikeClicked(props)}>Dislike</Button>
            <Button variant="contained" color="primary" component={Link} to={`/edit/${props.id}`}>Update</Button>
            <Button variant="contained" color="primary" onClick={()=>deleteItem(props.id)}>Delete</Button>
            </Box>
        </Box>
        </Grid>

        
    )
}
export default Post ; 