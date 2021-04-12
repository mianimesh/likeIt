import React from 'react' ;
import './App.css';
import PostList from './PostList' ;
import {PostProvider} from './PostContext'
import Nav from './Nav' ;
import AddPost from './AddPost' ;
import {Container, Button,Paper,Box,Typography,AppBar,Toolbar} from "@material-ui/core" ;
import {makeStyles} from "@material-ui/core/styles" ;
import {BrowserRouter,Route,Switch} from "react-router-dom" ;
import Search from './Search' ;
import UpdatePost from './UpdatePost' ;
import ViewLiked from './ViewLiked' ;
import ViewDisliked from './ViewDisliked' ;
import {LikePostProvider} from './LikePostContext' ;
import { DislikePostProvider } from './DislikePostContext';

const useStyles = makeStyles((theme)=>({
  root:{
    width:"100vw",
    height:"100vh",
    backgroundColor:theme.palette.grey[300],
    paddingTop:theme.spacing(5),
  },
}));

function App() {
  const classes = useStyles() ; 
  return (
    <PostProvider>
        <LikePostProvider>
        <DislikePostProvider>
    <BrowserRouter>
        <Nav/>
        <Switch>
          <Route exact path="/" component = {PostList}/>
          <Route path="/posts" component={PostList}/>
          <Route path="/createpost" component={AddPost}/>
          <Route path="/searchposts" component={Search}/>
          <Route path="/edit/:id" component = {UpdatePost}/>
          <Route path="/viewliked" component = {ViewLiked}/>
          <Route path="/viewDisliked" component = {ViewDisliked}/>
        </Switch>
    </BrowserRouter>
    </DislikePostProvider>
    </LikePostProvider>
    </PostProvider>

  );
}

export default App;
