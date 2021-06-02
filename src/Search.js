import React,{useState,useContext} from 'react' ;
import {PostContext} from './PostContext' ;
import Post from './Post' ;
import {Button,Box,TextField} from '@material-ui/core' ;
import {Link} from 'react-router-dom' ;

const Search = ()=>{
    const [searchTerm,setSearchTerm] = useState("") ;
    const [posts,setposts] = useContext(PostContext) ;

    const handleChange = (e)=>{
        setSearchTerm(e.target.value) ;
    }
    return (
        <Box textAlign='center'>
        <TextField  color="secondary"className="search" fullWidth={true} label="Search Post" variant="outlined" onChange = {handleChange} />
        <Box>
        {
            posts.filter((post)=>{
            if(searchTerm=="")
                return ;
            if(post.title.toLowerCase().includes(searchTerm.toLowerCase())){
                return post ;
            }
        }).map(post =>(
            <Post title = {post.title} id = {post.id} body = {post.body}/>
        ))
        }
        </Box>
        <Button style={{marginTop:30}} variant="contained" color="primary" component={Link} to="/" >Back</Button>
        </Box>
    );
}
export default Search ; 