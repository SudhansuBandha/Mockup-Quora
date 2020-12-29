import '../constants/answerConstants'
import axios from 'axios'
import {
    ANSWER_DELETE_FAIL, ANSWER_DELETE_REQUEST, ANSWER_DELETE_SUCCESS,   
    ANSWER_EDIT_FAIL, ANSWER_EDIT_REQUEST, ANSWER_EDIT_SUCCESS, 
    ANSWER_FETCH_USER_FAIL, ANSWER_FETCH_USER_REQUEST, ANSWER_FETCH_USER_SUCCESS, 
    ANSWER_POST_FAIL, ANSWER_POST_NULL, ANSWER_POST_REQUEST, ANSWER_POST_SUCCESS, 
    ANSWER_SHOW_FAIL, ANSWER_SHOW_REQUEST, ANSWER_SHOW_SUCCESS,  ANSWER_EDIT_NULL 
} from '../constants/answerConstants';

const postAnswer = (answer, question) => async(dispatch, getState) =>{
    const { userLoggedin: { userInfo1 } } = getState();
    const url = "http://localhost:5000/api/answers/post/"+question
    if(question===null) dispatch({type:ANSWER_POST_NULL})
    else{
    try {
        dispatch({type:ANSWER_POST_REQUEST});
        const {data} = await axios.post(url,{answer},
        {
            headers: {
                Authorization: userInfo1.token
            }
        })
        
        dispatch({type:ANSWER_POST_SUCCESS, payload:data})
        dispatch({type:ANSWER_POST_NULL})
    } catch (error) {
        dispatch({type:ANSWER_POST_FAIL, payload:error.message})
    }
}}

const individualAnswer = (answer_id) => async(dispatch) =>{
    
    try {
        dispatch({type:ANSWER_SHOW_REQUEST});
        let url = "http://localhost:5000/api/answers/fetch/"+answer_id
        const answer_details = await axios.get(url)
    
        url = "http://localhost:5000/api/profile/"+answer_details.data.user
        const user_profile = await axios.get(url)
    
        url = 'http://localhost:5000/api/questions/'+answer_details.data.question
        const question = await axios.get(url)
    
        const data={
                _id:answer_details.data._id,
                user:user_profile.data.username,
                answer:answer_details.data.answer,
                question:question.data[0].question,
                upvotes:answer_details.data.upvotes,
                downvotes:answer_details.data.downvotes,
                date:answer_details.data.date
            }    
        dispatch({type:ANSWER_SHOW_SUCCESS, payload:data})
            } 
        catch (error) {
        dispatch({type:ANSWER_SHOW_FAIL, payload:error.message})
    }
}

const listAnswersUser = (id) => async (dispatch, getState) => {
    
    
    try {
        dispatch({type:ANSWER_FETCH_USER_REQUEST});
        let url = 'http://localhost:5000/api/answers/user_fetch/'+id
    
        const answers = await axios.get(url)
        dispatch({type:ANSWER_FETCH_USER_SUCCESS, payload:answers.data})

    } catch (error) {
        dispatch({type:ANSWER_FETCH_USER_FAIL, payload:error.message})
    }
}


const editAnswer =(answer,answer_id)=>async (dispatch, getState)=>{
    const url = 'http://localhost:5000/api/answers/edit/'+answer_id
    const { userLoggedin: { userInfo1 } } = getState()
    if(answer===null)dispatch({type:ANSWER_EDIT_NULL})
    else{
    try {
        dispatch({type:ANSWER_EDIT_REQUEST});
        const {data} = await axios.post(url,{answer},
        {
            headers: {
                Authorization: userInfo1.token
            }
        })
        
        dispatch({type:ANSWER_EDIT_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:ANSWER_EDIT_FAIL, payload:error.message})
    }   
}
}
const deleteAnswer =(answer_id)=>async (dispatch, getState)=>{
       
    const url = 'http://localhost:5000/api/answers/delete/'+answer_id
    const { userLoggedin: { userInfo1 } } = getState()
    try {
        dispatch({type:ANSWER_DELETE_REQUEST});
        const {data} = await axios.delete(url,
        {
            headers: {
                Authorization: userInfo1.token
            }
        })
        
        dispatch({type:ANSWER_DELETE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:ANSWER_DELETE_FAIL, payload:error.message})
    }   
}


export  {
    postAnswer, 
    individualAnswer, 
    listAnswersUser, 
    editAnswer, 
    deleteAnswer,
        
}