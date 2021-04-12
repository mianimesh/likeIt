import React,{useContext} from 'react' ;
import { DislikePostContext } from './DislikePostContext'
import PrintPost from './PrintPost' ;

const ViewDisliked= ()=>{
    const [dislikePosts,setDislikePosts] = useContext(DislikePostContext) ;
    return(
        <div>
        {dislikePosts.map(dislikePost=>(
            <PrintPost id={dislikePost.id} title={dislikePost.title} body={dislikePost.body}/>
        ))
        }
    </div>
    );
}
export default ViewDisliked ; 