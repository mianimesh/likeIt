import React,{useState,createContext, useEffect} from 'react' ;
import {db} from './firebase' ; 


const PostContext = createContext() ; 

export const PostProvider = (props)=>{
    const [posts,setPosts] = useState(
        []);
        useEffect(()=>{
            db.collection('posts').onSnapshot(snapshot=>{
                setPosts(snapshot.docs.map(doc=>doc.data()))
            })
        },[])
    return (
        <PostContext.Provider value={[posts,setPosts]}>
            {props.children}
        </PostContext.Provider>
    );
}
export {PostContext} ; 