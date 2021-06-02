import React,{useState,createContext,useEffect} from 'react' ;
import {db} from './firebase' ; 
import firebase from 'firebase' ; 

export const DislikePostContext = createContext() ; 

export const DislikePostProvider = (props)=>{
    const user = firebase.auth().currentUser ; 
    const [dislikePosts,setDislikePosts] = useState(
        []);
        useEffect(()=>{
            let isCancelled = false; 
            if(user!=null && !isCancelled)
            {
                db.collection('users').doc(user.uid).collection('dislikedPosts').onSnapshot(snapshot=>{
                    setDislikePosts(snapshot.docs.map(doc=>doc.data()))
                })
            }
            return ()=>{
                isCancelled = true; 
            }
        },[user])
    return (
        <DislikePostContext.Provider value={[dislikePosts,setDislikePosts]}>
            {props.children}
        </DislikePostContext.Provider>
    );
}