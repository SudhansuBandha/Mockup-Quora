import { ANSWER_COMMENT_DELETE_FAIL, ANSWER_COMMENT_DELETE_REQUEST, ANSWER_COMMENT_DELETE_SUCCESS,
    ANSWER_COMMENT_POST_FAIL, ANSWER_COMMENT_POST_NULL, ANSWER_COMMENT_POST_REQUEST, ANSWER_COMMENT_POST_SUCCESS}
    from '../constants/commentConstants'
import axios from 'axios'

const postComment =(comment,answer_id) =>async(dispatch,getState) =>{
        const url ="/api/comment/"+answer_id
        
        const { userLoggedin:{ userInfo1 } } = getState()
      
        try {
            dispatch({type:ANSWER_COMMENT_POST_REQUEST});
            const {data} = await axios.post(url,{comment},
            {
                headers: {
                    Authorization: userInfo1.token
                }
            })
            
            dispatch({type:ANSWER_COMMENT_POST_SUCCESS, payload:data})
        } catch (error) {
            dispatch({type:ANSWER_COMMENT_POST_FAIL, payload:error.message})
        }  
    
    }
    const removeComment =(comment_id) =>async(dispatch, getState) =>{
        const url ="/api/comment/"+comment_id
        console.log(url)
        
        const { userLoggedin:{ userInfo1 } } = getState()
    
        try {
            dispatch({type:ANSWER_COMMENT_DELETE_REQUEST});
            const {data} = await axios.delete(url,{
                headers: {
                    Authorization: userInfo1.token
                }
            })
            
            dispatch({type:ANSWER_COMMENT_DELETE_SUCCESS, payload:data})
        } catch (error) {
            dispatch({type:ANSWER_COMMENT_DELETE_FAIL, payload:error.message})
        }  
    }      

 export{
     postComment,
     removeComment
 }   