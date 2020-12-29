import {USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, 
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_REGISTER_UNLOAD, 
    USER_PROFILE_REQUEST, USER_PROFILE_SUCCESS, USER_PROFILE_FAIL, USER_PROFILE_UNLOAD,
    //USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, 
    VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAIL, USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_UNLOAD, USER_EDIT_EMAIL_REQUEST, USER_EDIT_EMAIL_SUCCESS, USER_EDIT_PASSWORD_SUCCESS, USER_EDIT_USERNAME_SUCCESS, USER_EDIT_DESCRIPTION_SUCCESS, USER_EDIT_EMAIL_FAIL, USER_EDIT_PASSWORD_REQUEST, USER_EDIT_DESCRIPTION_REQUEST, USER_EDIT_USERNAME_REQUEST, USER_EDIT_PASSWORD_FAIL, USER_EDIT_DESCRIPTION_FAIL, USER_EDIT_USERNAME_FAIL, USER_EDIT_PASSWORD_NULL, USER_EDIT_EMAIL_NULL, USER_EDIT_USERNAME_NULL, USER_EDIT_DESCRIPTION_NULL, USER_EDIT_NULL, FETCH_USER_DETAILS_REQUEST, FETCH_USER_DETAILS_SUCCESS, FETCH_USER_DETAILS_FAIL} from '../constants/userConstants'

function userLoginReducer (state ={}, action){
    switch(action.type){
        case USER_LOGIN_REQUEST:
            return {loading1:true}
        case USER_LOGIN_SUCCESS:
            return {loading1:false, userInfo1:action.payload}  
        case USER_LOGIN_FAIL:
            return{loading1:false, error1:action.payload}
        case USER_LOGOUT:
            return{}        
        default:
            return state          
    }
}

function userRegisterReducer (state={}, action){
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {loading2:true}
        case USER_REGISTER_SUCCESS:
            return {loading2:false, userInfo2:action.payload}  
        case USER_REGISTER_FAIL:
            return{loading2:false, error2:action.payload}
        case USER_REGISTER_UNLOAD:
            return {}        
        default:
            return state          
    }
}

function userProfileReducer (state={}, action){
    switch(action.type){
        case USER_PROFILE_REQUEST:
            return {loading:true}
        case USER_PROFILE_SUCCESS:
            return {loading:false, Profile:action.payload}  
        case USER_PROFILE_FAIL:
            return{loading:false, error:action.payload}
        case USER_PROFILE_UNLOAD:
            return {}        
        default:
            return state          
    }
}

function userUpdateReducer(state={}, action){
    switch(action.type){
        case USER_EDIT_EMAIL_REQUEST:
            return {loading:true}
        case USER_EDIT_PASSWORD_REQUEST:
            return {loading:true} 
        case USER_EDIT_DESCRIPTION_REQUEST:
            return {loading:true} 
        case USER_EDIT_USERNAME_REQUEST:
            return {loading:true}          
        case USER_EDIT_EMAIL_SUCCESS:
            return {loading:false, UpdatedProfile:action.payload}  
        case USER_EDIT_PASSWORD_SUCCESS:
            return {loading:false, UpdatedProfile:action.payload}          
        case USER_EDIT_USERNAME_SUCCESS:
            return {loading:false, UpdatedProfile:action.payload}
        case USER_EDIT_DESCRIPTION_SUCCESS:
            return {loading:false, UpdatedProfile:action.payload}
        case USER_EDIT_EMAIL_FAIL:
            return {loading:false, error:action.payload}
        case USER_EDIT_PASSWORD_FAIL:
            return {loading:false, error:action.payload}
        case USER_EDIT_DESCRIPTION_FAIL:
            return {loading:false, error:action.payload}
        case USER_EDIT_USERNAME_FAIL:
            return {loading:false, error:action.payload}
        case USER_EDIT_NULL:
            return {}                                                 
        default:
            return state          
    }
}

function verify_email_Reducer(state={}, action){
    switch(action.type){
        case VERIFY_EMAIL_REQUEST:
            return {loading:true}
        case VERIFY_EMAIL_SUCCESS:
            return {loading:false, verified:action.payload}  
        case VERIFY_EMAIL_FAIL:
            return{loading:false, error:action.payload}    
        default:
            return state          
    }
}


function userDeleteReducer(state={}, action){
    switch(action.type){
        case USER_DELETE_REQUEST:
            return {loading:true}
        case USER_DELETE_SUCCESS:
            return {loading:false, message:action.payload}  
        case USER_DELETE_FAIL:
            return{loading:false, error:action.payload}
        case USER_DELETE_UNLOAD:
            return {}    
        default:
            return state          
    }
}
function userDetailsReducer(state={},action){
    switch(action.type){
        case FETCH_USER_DETAILS_REQUEST:
            return {loading:true}
        case FETCH_USER_DETAILS_SUCCESS:
            return {loading:false, details:action.payload}  
        case FETCH_USER_DETAILS_FAIL:
            return{loading:false, error:action.payload}
        default:
            return state  
}
}
export {userLoginReducer, 
    userRegisterReducer, 
    userProfileReducer,
     userUpdateReducer, 
     verify_email_Reducer,
    userDeleteReducer,
    userDetailsReducer
}