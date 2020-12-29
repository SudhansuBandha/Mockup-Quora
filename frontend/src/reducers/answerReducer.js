import { 
      ANSWER_DELETE_FAIL, ANSWER_DELETE_REQUEST, ANSWER_DELETE_SUCCESS, 
    ANSWER_EDIT_FAIL, ANSWER_EDIT_NULL, ANSWER_EDIT_REQUEST, ANSWER_EDIT_SUCCESS,
     ANSWER_FETCH_USER_FAIL, ANSWER_FETCH_USER_REQUEST, ANSWER_FETCH_USER_SUCCESS, ANSWER_FETCH_USER_UNLOAD,
      ANSWER_POST_FAIL, ANSWER_POST_NULL, ANSWER_POST_REQUEST, ANSWER_POST_SUCCESS, 
      ANSWER_SHOW_FAIL, ANSWER_SHOW_REQUEST, ANSWER_SHOW_SUCCESS } from '../constants/answerConstants';

function answerPostReducer(state={}, action){
    switch(action.type){
        case ANSWER_POST_REQUEST:
            return {loading:true}
        case ANSWER_POST_SUCCESS:
            return {loading:false, answer:action.payload}
        case ANSWER_POST_FAIL:
            return {loading: false, error:action.payload}
            case ANSWER_POST_NULL:
                return {}         
        default:
            return state;        
        }
}

function answerShowReducer(state={}, action){
    switch(action.type){
        case ANSWER_SHOW_REQUEST:
            return {loading:true}
        case ANSWER_SHOW_SUCCESS:
            return {loading:false, details:action.payload}
        case ANSWER_SHOW_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
        }
}

function answersListUserReducer(state=[{}], action){
    switch(action.type){
        case ANSWER_FETCH_USER_REQUEST:
            return {loading:true}
        case ANSWER_FETCH_USER_SUCCESS:
            return {loading:false, answers:action.payload}
        case ANSWER_FETCH_USER_FAIL:
            return {loading: false, error:action.payload}
        case ANSWER_FETCH_USER_UNLOAD:
            return{}    
        default:
            return state;        

    }
}
function answerEditReducer(state={}, action){
    switch(action.type){
       
        case ANSWER_EDIT_REQUEST:
            return {loading:true}
        case ANSWER_EDIT_SUCCESS:
            return {editloading:false, editedanswer:action.payload}
        case ANSWER_EDIT_FAIL:
            return {loading: false, editerror:action.payload}
        case ANSWER_EDIT_NULL:
            return {}        
        default:
            return state;        
    }
}

function answerDeleteReducer(state={}, action){
    switch(action.type){
        case ANSWER_DELETE_REQUEST:
            return {loading:true}
        case ANSWER_DELETE_SUCCESS:
            return {loading:false, message:action.payload}
        case ANSWER_DELETE_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
    }
}



export {
    answerPostReducer, 
    answerShowReducer, 
    answersListUserReducer, 
    answerEditReducer, 
    answerDeleteReducer, 
    }

