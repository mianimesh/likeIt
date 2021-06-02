import React,{useContext} from 'react' ;
import { DislikePostContext } from './DislikePostContext'
import PrintPost from './PrintPost' ;
import {Grid} from '@material-ui/core' ; 
import firebase from 'firebase' ;

const ViewDisliked= ()=>{
    const [dislikePosts,setDislikePosts] = useContext(DislikePostContext) ;
    const user = firebase.auth().currentUser ; 
    return(
        <Grid>
        {dislikePosts.map(dislikePost=>(
            <PrintPost id={dislikePost.id} title={dislikePost.title} body={dislikePost.body}/>
        ))
        }
    </Grid>
    );
}
export default ViewDisliked ; 