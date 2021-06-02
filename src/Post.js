import React,{useState,useContext,useEffect} from 'react' ;
import {Grid,Button,Box,Typography, createMuiTheme, MuiThemeProvider} from "@material-ui/core" ;
import {pink } from '@material-ui/core/colors';
import {Link} from 'react-router-dom' ;
import {PostContext} from './PostContext' ;
import {LikePostContext} from './LikePostContext' ;
import {DislikePostContext} from './DislikePostContext' ;
import firebase from 'firebase' ; 

const Post = (props) => {

    const db = firebase.firestore() ; 
    const [likeFlag,setLikeFlag] = useState(0) ;
    const [dislikeFlag,setDislikeFlag] = useState(0) ;
    const [color1,setColor1] = useState('primary') ; // like color
    const [color2,setColor2] = useState('primary') ; // dislike color
    const [posts,setPosts] = useContext(PostContext) ;
    const [likePosts,setLikePosts] = useContext(LikePostContext) ;
    const [dislikePosts,setDislikePosts] = useContext(DislikePostContext) ;
    const user = firebase.auth().currentUser ; 

    useEffect(()=>{
        var docRef = db.collection('posts').doc(props.id) ;
        docRef.get().then((doc)=>{
            if(doc.exists)
                setLikeFlag(doc.data().liked) ; 
        }).catch((e)=>console.log(e)) ;  
        docRef.get().then((doc)=>{
            if(doc.exists)
                setDislikeFlag(doc.data().dislike) ; 
        }).catch((e)=>console.log(e)) ; 
    },[])
    
    function deleteItem(id){
        const newList = posts.filter((post)=>post.id!=id);
        setPosts(newList) ;
        db.collection('posts').doc(id).delete() ; 
        db.collection('users').doc(user.uid).collection('likedPosts').doc(id).delete() ; 
        db.collection('users').doc(user.uid).collection('dislikedPosts').doc(id).delete() ; 
        
    }
    const likeClicked = (props) =>{
        const db = firebase.firestore() ; 
        setLikeFlag(likeFlag^1) ;
        setDislikeFlag(0) ;  
        if(user!=null)
        {
            db.collection('users').doc(user.uid).collection('dislikedPosts').doc(props.id).delete() ; 
        }
        db.collection('posts').doc(props.id).set({title:props.title,body:props.body,id:props.id,liked:likeFlag^1,disliked:0})
        
        if(!likeFlag && likePosts.filter(item=> item.id == props.id).length == 0)
        {
            setLikePosts(prevPosts => [...prevPosts,{title:props.title,body:props.body,id:props.id}]);
            db.collection('users').doc(user.uid).collection('likedPosts').doc(props.id).set({title:props.title,body:props.body,id:props.id}) ; 
        }
        else
        {
            const newList = likePosts.filter((likePost)=>likePost.id!=props.id) ;
            setLikePosts(newList) ;
            db.collection('users').doc(user.uid).collection('likedPosts').doc(props.id).delete() ; 
        }
        setColor2('primary') ;

        if(!likeFlag)
            setColor1('secondary');
        else
            setColor1('primary') ;
    }
    const dislikeClicked = (props)=>{
        const db = firebase.firestore() ; 
        setDislikeFlag(dislikeFlag^1) ;
        setLikeFlag(0) ; 
        if(user!=null)
        {
            db.collection('users').doc(user.uid).collection('likedPosts').doc(props.id).delete() ;
        }
         
        db.collection('posts').doc(props.id).set({title:props.title,body:props.body,id:props.id,liked:0,dislike:dislikeFlag^1})
        if(!dislikeFlag && dislikePosts.filter(item=> item.id == props.id).length == 0 )
        {

            setDislikePosts(prevPosts => [{title:props.title,body:props.body,id:props.id},...prevPosts]);
            db.collection('users').doc(user.uid).collection('dislikedPosts').doc(props.id).set({title:props.title,body:props.body,id:props.id}) ; 
        }
        else
        {
            const newList = dislikePosts.filter((dislikePost)=>dislikePost.id!=props.id) ;
            setLikePosts(newList) ;
            db.collection('users').doc(user.uid).collection('dislikedPosts').doc(props.id).delete() ;
        }
        setColor1('primary');
        if(!dislikeFlag)
            setColor2('secondary');
        else
            setColor2('primary') ;

    }
    return (
        <Grid>
            {user?(
            <Grid container justify="center" alignItems="center" justify="center">
            <Box border={2} borderColor="primary.main" className="box-post" width={12/20} bgcolor="success.main"> 
            <Box bgcolor="#1f4b59" border={2} borderColor="primary.main"><h3>{props.title}</h3></Box>
            <Box bgcolor="#055ba6"  border={2} borderColor="primary.main">{props.body}</Box>
            <Box border={2} borderColor="primary.main">
            <Button variant="contained" color={likeFlag?'secondary':'primary'} onClick={()=>likeClicked(props)}>Like</Button>
            <Button variant="contained" color={dislikeFlag?'secondary':'primary'} onClick={()=>dislikeClicked(props)}>Dislike</Button>
            <Button variant="contained" color="primary" component={Link} to={`/edit/${props.id}`}>Update</Button>
            <Button variant="contained" color="primary" onClick={()=>deleteItem(props.id)}>Delete</Button>
            </Box>
            </Box>
            </Grid>
        ) : ( 
            <Grid container justify="center" alignItems="center" justify="center">
            <Box border={2} borderColor="primary.main" className="box-post" width={12/20} bgcolor="success.main"> 
            <Box bgcolor="#1f4b59" border={2} borderColor="primary.main"><h3>{props.title}</h3></Box>
            <Box bgcolor="#055ba6"  border={2} borderColor="primary.main">{props.body}</Box>
            <Box border={2} borderColor="primary.main">
            </Box>
            </Box>
            </Grid>
        )
            }
        </Grid>
     
    )
}
export default Post ; 