import React ,{useContext} from 'react' ;
import {LikePostContext} from './LikePostContext' ;
import PrintPost from './PrintPost' ;
import {Grid} from '@material-ui/core' ; 

const ViewLiked = (props)=>{
    const [likePosts,setLikePosts] = useContext(LikePostContext) ;
    return (
        <Grid>
            {likePosts.map(likePost=>(
                <PrintPost id={likePost.id} title={likePost.title} body={likePost.body}/>
            ))
            }
        </Grid>
    );
}
export default ViewLiked ;