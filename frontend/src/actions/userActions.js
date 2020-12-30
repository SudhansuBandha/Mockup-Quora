import {
    USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, 
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL,USER_REGISTER_UNLOAD,
     USER_LOGOUT, USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_UNLOAD,
     //USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL,
    VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAIL, 
    USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_UNLOAD, USER_EDIT_USERNAME_REQUEST, USER_EDIT_USERNAME_SUCCESS, USER_EDIT_USERNAME_FAIL, USER_EDIT_PASSWORD_REQUEST, USER_EDIT_EMAIL_REQUEST, USER_EDIT_EMAIL_SUCCESS, USER_EDIT_EMAIL_FAIL, USER_EDIT_PASSWORD_SUCCESS, USER_EDIT_PASSWORD_FAIL, USER_EDIT_DESCRIPTION_REQUEST, USER_EDIT_DESCRIPTION_SUCCESS, USER_EDIT_DESCRIPTION_FAIL, USER_EDIT_USERNAME_NULL, USER_EDIT_NULL, FETCH_USER_DETAILS_REQUEST, FETCH_USER_DETAILS_SUCCESS, FETCH_USER_DETAILS_FAIL} from '../constants/userConstants'
import axios from 'axios'
import Cookie from 'js-cookie'
import { QUESTION_FETCH_USER_UNLOAD } from '../constants/questionConstants'
import { ANSWER_FETCH_USER_UNLOAD } from '../constants/answerConstants'

const signin = (email, password)=> async (dispatch)=>{
    try {
        dispatch({type:USER_LOGIN_REQUEST, payload:{email, password}})
        
        const { data } = await axios.post('auth/login',{email, password})
    
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        
    } catch (error) {
        dispatch({type: USER_LOGIN_FAIL, payload: error.message})
        
    }
}

const register = (uname, email, password)=> async (dispatch)=>{
    
    try {
        dispatch({type:USER_REGISTER_REQUEST, payload:{uname,email, password}})
        const { data } = await axios.post('auth/register',{uname, email, password})
        
        dispatch({ type: USER_REGISTER_SUCCESS, payload: data })
        
            
    } catch (error) {
        dispatch({type: USER_REGISTER_FAIL, payload: error.message})
        
    }
}
const logout = () => (dispatch) => {
    
    Cookie.remove("userLoggedin");
    Cookie.remove("userProfile");
    Cookie.remove("questionsUser");
    Cookie.remove("edit");
    Cookie.remove("answersUser");
    
    dispatch({type: USER_LOGOUT })
    dispatch({type:USER_REGISTER_UNLOAD})
    dispatch({type:USER_PROFILE_UNLOAD})
    dispatch({type:QUESTION_FETCH_USER_UNLOAD})
    dispatch({type:ANSWER_FETCH_USER_UNLOAD})
}

const profile = (id) => async (dispatch, getState) =>{
    
    
    const url = 'profile/'+id
    
    try {
        
        dispatch({type:USER_PROFILE_REQUEST, })
        const { data } = await axios.get(url)
        
        dispatch({ type: USER_PROFILE_SUCCESS, payload: data })
        
            
    } catch (error) {
        dispatch({type: USER_PROFILE_FAIL, payload: error.message})
        
    }
}

const profile_details =()=> async (dispatch, getState)=>{
    
    const { userLoggedin: { userInfo1 } } = getState();
    
    try {
        dispatch({type:FETCH_USER_DETAILS_REQUEST})
        
        const { data } = await axios.get('profile/description/user',{
            headers: {
                Authorization: userInfo1.token,
              } 
        })
        
        dispatch({type:FETCH_USER_DETAILS_SUCCESS, payload:data})
        
        } catch (error) {
        dispatch({type: FETCH_USER_DETAILS_FAIL, payload: error.message})
        
    }
}



const update =(props)=> async (dispatch, getState)=>{
    
    const { userLoggedin: { userInfo1 } } = getState();
    
    if(props==="") dispatch({type:USER_EDIT_NULL})
    if(props.type==="username"){
        const username=props.username
    try {
        dispatch({type:USER_EDIT_USERNAME_REQUEST })
        const { data } = await axios.post('profile',{username},{
            headers: {
                Authorization: userInfo1.token,
              } 
        })
        console.log(data)
        dispatch({type:USER_EDIT_USERNAME_SUCCESS , payload:data})
    
        } catch (error) {
        dispatch({type: USER_EDIT_USERNAME_FAIL, payload: error.message})
        
    }
    }
    if(props.type==="email"){
       const  email = props.email
        try {
            dispatch({type:USER_EDIT_EMAIL_REQUEST, })
            const { data } = await axios.post('profile',{email},{
                headers: {
                    Authorization: userInfo1.token,
                  } 
            })
            dispatch({type:USER_EDIT_EMAIL_SUCCESS, payload:data})
  
            } catch (error) {
            dispatch({type: USER_EDIT_EMAIL_FAIL, payload: error.message})
            
        }
    }
    if(props.type==="password"){
        try {
            const password = props.password
            dispatch({type:USER_EDIT_PASSWORD_REQUEST})
            const { data } = await axios.post('profile',{password},{
                headers: {
                    Authorization: userInfo1.token,
                  } 
            })
            dispatch({type:USER_EDIT_PASSWORD_SUCCESS, payload:data})
    
            } catch (error) {
            dispatch({type: USER_EDIT_PASSWORD_FAIL, payload: error.message})
            
        }
    }
    if(props.type==="description"){
        const description=props.description
        try {
            dispatch({type:USER_EDIT_DESCRIPTION_REQUEST,})
            const { data } = await axios.post('profile',{description},{
                headers: {
                    Authorization: userInfo1.token,
                  } 
            })
            dispatch({type:USER_EDIT_DESCRIPTION_SUCCESS, payload:data})
        
            } catch (error) {
            dispatch({type: USER_EDIT_DESCRIPTION_FAIL, payload: error.message})
            
        }
    }
}

const verify_email = ( email )=> async (dispatch)=>{
    
    try {

        dispatch({type:VERIFY_EMAIL_REQUEST, payload:{email}})
        const { data } = await axios.post('auth/verify_email',{email} )
    
        dispatch({ type: VERIFY_EMAIL_SUCCESS, payload: data })
        
            
    } catch (error) {
        dispatch({type: VERIFY_EMAIL_FAIL, payload: error.message})
        
    }
}

const deleteProfile =(props)=> async (dispatch, getState)=>{
    
    const { userLoggedin: { userInfo1 } } = getState()
    const { deletedProfile: { message } } = getState()
    if(props)
    {   if(message){
        if(message.length!==0)
        dispatch({type:USER_DELETE_UNLOAD})
    }}
    else{
    try {
        dispatch({type:USER_DELETE_REQUEST})
        const { data } = await axios.delete('profile',{
            headers: {
                Authorization: userInfo1.token,
              } 
        })
        
        Cookie.remove("userLoggedin");
        Cookie.remove("userProfile");
        Cookie.remove("questionsUser");
        Cookie.remove("edit");
        Cookie.remove("answersUser");
        dispatch({ type: USER_LOGOUT })
        dispatch({type:USER_REGISTER_UNLOAD})
        dispatch({type:USER_PROFILE_UNLOAD})
        dispatch({type:QUESTION_FETCH_USER_UNLOAD})
        dispatch({type:ANSWER_FETCH_USER_UNLOAD})

        dispatch({type:USER_DELETE_SUCCESS, payload:data})
        
        } catch (error) {
        dispatch({type: USER_DELETE_FAIL, payload: error.message})
        }
    }
}

export {signin, register, logout, profile, update, verify_email, deleteProfile, profile_details}