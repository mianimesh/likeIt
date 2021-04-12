import React,{useState,createContext} from 'react' ;

export const DislikePostContext = createContext() ; 

export const DislikePostProvider = (props)=>{
    const [dislikePosts,setDislikePosts] = useState([]) ;
    return (
        <DislikePostContext.Provider value={[dislikePosts,setDislikePosts]}>
            {props.children}
        </DislikePostContext.Provider>
    );
}