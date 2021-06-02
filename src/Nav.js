import React,{useContext} from 'react' ;
import {PostContext} from './PostContext' ;
import {Grid,Button,Typography,AppBar,Toolbar,IconButton,Menu,MenuItem} from "@material-ui/core" ;
import {Link} from 'react-router-dom' ;
import firebase from 'firebase' ; 
import {Box} from '@material-ui/core' ; 
import MoreIcon from '@material-ui/icons/MoreVert'
import {makeStyles} from '@material-ui/core/styles' ; 
import { Fragment,useState } from 'react';


const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]:{
      display:'flex',
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]:{
      display:'none',
    }
  }
}))

const Nav = ({user,handleLogout}) =>{
    const [posts,setPosts] = useContext(PostContext) ;
    const user1 = firebase.auth().currentUser ; 
    const classes = useStyles() ; 
    const [mobileMenuAnchorEl,setMobileMenuAnchorEl] = useState(null) ; 
    const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);
    const openMobileMenu = (event)=>{
      setMobileMenuAnchorEl(event.currentTarget)
    }
    const closeMobileMenu = ()=>{
      setMobileMenuAnchorEl(null) ; 
    }
    const mobileMenu =    
        user?
        ( 
        <Menu anchorEl = {mobileMenuAnchorEl} id='mobile-menu' keepMounted open={isMobileMenuOpen}>
        <MenuItem component={Link} onClick={closeMobileMenu} to='/'>Posts</MenuItem>
        <MenuItem component={Link} onClick={closeMobileMenu} to='/createpost'>Create Post</MenuItem>
        <MenuItem component={Link} onClick={closeMobileMenu} to='/searchposts'>Search Post</MenuItem>
        <MenuItem component={Link} onClick={closeMobileMenu} to='/viewliked'>View Liked Posts</MenuItem>
        <MenuItem component={Link} onClick={closeMobileMenu} to='/viewDisliked'>View Disliked Posts</MenuItem>
      </Menu>
      ):(
        <Menu anchorEl = {mobileMenuAnchorEl} id='mobile-menu' keepMounted open={isMobileMenuOpen}>
        <MenuItem component={Link} onClick={closeMobileMenu} to='/'>Posts</MenuItem>
        <MenuItem component={Link} onClick={closeMobileMenu} to='/searchposts'>Search Post</MenuItem>
      </Menu>
      )
  

    return (
      <Grid>
        {
          user1?(
            <Fragment>
            <AppBar style={{boxShadow:"0px 0px 0px 0px"}}>
            <Toolbar>
            <Typography variant="h4" align="left" style={{flexGrow:1}}><b>LikeIT</b></Typography>
            <Box className={classes.sectionDesktop}>
            <Button color="inherit" component={Link} to="/posts">Posts : {posts.length}</Button>
            <Button color="inherit" component={Link} to="/createpost">Create Post</Button>
            <Button color="inherit" component={Link} to="/searchposts">Search Posts</Button>
            <Button color="inherit" component={Link} to="/viewliked">View Liked Posts</Button>
            <Button color="inherit" component={Link} to="/viewDisliked">View Disliked Posts</Button>
            </Box>
            {user?(
              <Button onClick={handleLogout} color="inherit" to=" /"><b>Log Out</b></Button>
            ) : (
              <Button color="inherit" component={Link} to="/login"><b>Login/SignUp</b></Button>
            )}
            <IconButton className={classes.sectionMobile} onClick={openMobileMenu}>
              <MoreIcon/>
            </IconButton>
            </Toolbar>
            </AppBar>
            {mobileMenu}
            </Fragment>
          ) : (
            <Fragment>
            <AppBar style={{boxShadow:"0px 0px 0px 0px"}}>
              <Toolbar>
                <Typography variant="h4" align="left" style={{flexGrow:1}}><b>LikeIT</b></Typography>
                <Box className={classes.sectionDesktop}>
                <Button color="inherit" component={Link} to="/posts"><b>Posts : </b>{posts.length}</Button>
                <Button color="inherit" component={Link} to="/searchposts"><b>Search Posts</b></Button>
                </Box>
                {user?(
              <Button onClick={handleLogout} color="inherit" to=" /"><b>Log Out</b></Button>
            ) : (
              <Button color="inherit" component={Link} to="/login"><b>Login/SignUp</b></Button>
            )}
            <IconButton onClick={openMobileMenu}>
              <MoreIcon/>
            </IconButton>
              </Toolbar>
            </AppBar>
            </Fragment>
          )
        }
      </Grid>
        
    );
}
export default Nav ; 