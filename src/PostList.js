import React,{useState,useContext} from 'react' ;
import Post from './Post';
import {PostContext} from './PostContext' ;
import {Box,Typography} from "@material-ui/core" ;

const PostList = () => {
    const [posts,setPosts] = useContext(PostContext) ;
    return(
        <Box>
        {
            posts.map(post=>(
               <Post id = {post.id} title = {post.title} body = {post.body}/>
            ))
        }
        </Box>
    );
}

export default PostList ;