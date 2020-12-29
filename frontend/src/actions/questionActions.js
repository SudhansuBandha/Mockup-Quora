import { QUESTION_FETCH_USER_REQUEST, QUESTION_FETCH_USER_SUCCESS, QUESTION_FETCH_USER_FAIL, 
    QUESTION_POST_REQUEST, QUESTION_POST_SUCCESS, QUESTION_POST_FAIL, QUESTION_POST_NULL, 
    QUESTION_EDIT_REQUEST, QUESTION_EDIT_SUCCESS, QUESTION_EDIT_FAIL, 
    QUESTION_DELETE_REQUEST, QUESTION_DELETE_SUCCESS, QUESTION_DELETE_FAIL, 
    QUESTION_FULL_REQUEST, QUESTION_FULL_SUCCESS, QUESTION_FULL_FAIL, QUESTION_PAGE_REQUEST, QUESTION_PAGE_SUCCESS, QUESTION_PAGE_FAIL} from '../constants/questionConstants'
import axios from 'axios'

const listQuestions = () => async (dispatch) => {
    
    try {
        dispatch({type:QUESTION_FULL_REQUEST});
        const {data} = await axios.get('http://localhost:5000/api/questions')
        
        dispatch({type:QUESTION_FULL_SUCCESS, payload:data})

    } catch (error) {
        dispatch({type:QUESTION_FULL_FAIL, payload:error.message})
    }
}


const listQuestionsUser = (id) => async (dispatch, getState) => {
    
    const url = 'http://localhost:5000/api/questions/fetch/'+id
    try {
        dispatch({type:QUESTION_FETCH_USER_REQUEST});
        const {data} = await axios.get(url)
    
        dispatch({type:QUESTION_FETCH_USER_SUCCESS, payload:data})

    } catch (error) {
        dispatch({type:QUESTION_FETCH_USER_FAIL, payload:error.message})
    }
}


const registerQuestion= (question) => async (dispatch, getState) =>{
    
    const { userLoggedin: { userInfo1 } } = getState();
    
    if(question===null) dispatch({type:QUESTION_POST_NULL})
    else{
    try {
        dispatch({type:QUESTION_POST_REQUEST});
        const {data} = await axios.post("http://localhost:5000/api/questions",{question},
        {
            headers: {
                Authorization: userInfo1.token
            }
        })
        
        dispatch({type:QUESTION_POST_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:QUESTION_POST_FAIL, payload:error.message})
    }
}}

const editQuestion =(question,question_id)=>async (dispatch, getState)=>{
    const url = 'http://localhost:5000/api/questions/edit/'+question_id
    const { userLoggedin: { userInfo1 } } = getState()
    try {
        dispatch({type:QUESTION_EDIT_REQUEST});
        const {data} = await axios.post(url,{question},
        {
            headers: {
                Authorization: userInfo1.token
            }
        })
        
        dispatch({type:QUESTION_EDIT_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:QUESTION_EDIT_FAIL, payload:error.message})
    }   
}

const deleteQuestion =(question_id)=>async (dispatch, getState)=>{
    
    
    const url = 'http://localhost:5000/api/questions/delete/'+question_id
    const { userLoggedin: { userInfo1 } } = getState()
    try {
        dispatch({type:QUESTION_DELETE_REQUEST});
        const {data} = await axios.delete(url,
        {
            headers: {
                Authorization: userInfo1.token
            }
        })
        
        dispatch({type:QUESTION_DELETE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:QUESTION_DELETE_FAIL, payload:error.message})
    }   
}

const selectedQuestion = (id) =>async(dispatch)=>{
    try {
        let url = "http://localhost:5000/api/answers/question/"+id
        dispatch({type:QUESTION_PAGE_REQUEST});
        const {data} = await axios.get(url)
        
        dispatch({type:QUESTION_PAGE_SUCCESS, payload:data})
    } catch (error) {
        dispatch({type:QUESTION_PAGE_FAIL, payload:error.message})
    } 
}

export {listQuestionsUser, registerQuestion, editQuestion, deleteQuestion, listQuestions, selectedQuestion}
