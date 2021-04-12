import React,{useState,createContext} from 'react' ;

import postsdata from './postsdata.json' ;

export const PostContext = createContext() ; 

export const PostProvider = (props)=>{
    const [posts,setPosts] = useState(postsdata) ;
    return (
        <PostContext.Provider value={[posts,setPosts]}>
            {props.children}
        </PostContext.Provider>
    );
}