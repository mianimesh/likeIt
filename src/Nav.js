import React,{useContext} from 'react' ;
import {PostContext} from './PostContext' ;
import {Button,Typography,AppBar,Toolbar} from "@material-ui/core" ;
import {Link} from 'react-router-dom' ;

const Nav = () =>{
    const [posts,setPosts] = useContext(PostContext) ;
    return (
        <AppBar>
        <Toolbar>
          <Typography variant="h4" align="left" style={{flexGrow:1}}>LikeIT</Typography>
          <Button color="inherit" component={Link} to="/posts">Posts : {posts.length}</Button>
          <Button color="inherit" component={Link} to="/createpost">Create Post</Button>
          <Button color="inherit" component={Link} to="/searchposts">Search Posts</Button>
          <Button color="inherit" component={Link} to="/viewliked">View Liked Posts</Button>
          <Button color="inherit" component={Link} to="/viewDisliked">View Disliked Posts</Button>
          </Toolbar>
        </AppBar>
    );
}
export default Nav ; 