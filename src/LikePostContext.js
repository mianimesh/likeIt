import React,{useState,createContext,useEffect} from 'react' ;
import {db} from './firebase' ; 
import firebase from 'firebase' ; 

export const LikePostContext = createContext() ; 

export const LikePostProvider = (props)=>{
    const user = firebase.auth().currentUser ; 
    const [likePosts,setLikePosts] = useState(
        []);
        useEffect(()=>{
            let isCancelled = false ; 
            if(user!=null && !isCancelled){
                db.collection('users').doc(user.uid).collection('likedPosts').onSnapshot(snapshot=>{
                    setLikePosts(snapshot.docs.map(doc=>doc.data()))
                })
            }
            return ()=>{
                isCancelled = true ; 
            }
        },[user])
    return (
        <LikePostContext.Provider value={[likePosts,setLikePosts]}>
            {props.children}
        </LikePostContext.Provider>
    );
}