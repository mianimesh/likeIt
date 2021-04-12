import React ,{useContext} from 'react' ;
import {LikePostContext} from './LikePostContext' ;
import PrintPost from './PrintPost' ;

const ViewLiked = (props)=>{
    const [likePosts,setLikePosts] = useContext(LikePostContext) ;
    return (
        <div>
            {likePosts.map(likePost=>(
                <PrintPost id={likePost.id} title={likePost.title} body={likePost.body}/>
            ))
            }
        </div>
    );
}
export default ViewLiked ;