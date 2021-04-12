import React,{useState,createContext} from 'react' ;

export const LikePostContext = createContext() ; 

export const LikePostProvider = (props)=>{
    const [likePosts,setLikePosts] = useState([]) ;
    return (
        <LikePostContext.Provider value={[likePosts,setLikePosts]}>
            {props.children}
        </LikePostContext.Provider>
    );
}