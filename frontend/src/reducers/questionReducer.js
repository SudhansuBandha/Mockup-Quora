import { QUESTION_FETCH_USER_REQUEST, QUESTION_FETCH_USER_SUCCESS, QUESTION_FETCH_USER_FAIL,QUESTION_FETCH_USER_UNLOAD,
     QUESTION_POST_REQUEST, QUESTION_POST_SUCCESS, QUESTION_POST_FAIL, QUESTION_POST_NULL, 
     QUESTION_EDIT_REQUEST, QUESTION_EDIT_SUCCESS, QUESTION_EDIT_FAIL, 
     QUESTION_DELETE_REQUEST, QUESTION_DELETE_SUCCESS, QUESTION_DELETE_FAIL, 
     QUESTION_FULL_REQUEST, QUESTION_FULL_SUCCESS, QUESTION_FULL_FAIL, QUESTION_PAGE_REQUEST, QUESTION_PAGE_SUCCESS, QUESTION_PAGE_FAIL} from '../constants/questionConstants'

function questionsListReducer(state={questions:[]}, action){
    switch(action.type){
        case QUESTION_FULL_REQUEST:
            return {loading:true}
        case QUESTION_FULL_SUCCESS:
            return {loading:false, questions:action.payload}
        case QUESTION_FULL_FAIL:
            return {loading: false, error:action.payload}
        default:
            return state;        

    }
}

function questionsListUserReducer(state=[{}], action){
    switch(action.type){
        case QUESTION_FETCH_USER_REQUEST:
            return {loading:true}
        case QUESTION_FETCH_USER_SUCCESS:
            return {loading:false, questions:action.payload}
        case QUESTION_FETCH_USER_FAIL:
            return {loading: false, error:action.payload}
        case QUESTION_FETCH_USER_UNLOAD:
            return{}    
        default:
            return state;        

    }
}

function questionsPostReducer(state={}, action){
    switch(action.type){
        case QUESTION_POST_REQUEST:
            return {loading:true}
        case QUESTION_POST_SUCCESS:
            return {loading:false, question:action.payload}
        case QUESTION_POST_FAIL:
            return {loading: false, error:action.payload}
        case QUESTION_POST_NULL:
            return {loading:false, question:action.payload}    
        default:
            return state;        

    }
}

function questionsEditReducer(state={}, action){
    switch(action.type){
       
        case QUESTION_EDIT_REQUEST:
            return {loading:true}
        case QUESTION_EDIT_SUCCESS:
            return {loading:false, question:action.payload}
        case QUESTION_EDIT_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
    }
}

function questionsDeleteReducer(state={}, action){
    switch(action.type){
        case QUESTION_DELETE_REQUEST:
            return {loading:true}
        case QUESTION_DELETE_SUCCESS:
            return {loading:false, message:action.payload}
        case QUESTION_DELETE_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
    }
}

function selectedQuestionReduer(state={}, action){
    switch(action.type){
        case QUESTION_PAGE_REQUEST:
            return {loading_question_page:true}
        case QUESTION_PAGE_SUCCESS:
            return {loading_question_page:false, question_data:action.payload}
        case QUESTION_PAGE_FAIL:
            return {loading_question_page: false, error:action.payload}    
        default:
            return state;        
    }
}
export {questionsListUserReducer, 
    questionsPostReducer,
     questionsEditReducer, 
     questionsDeleteReducer,
      questionsListReducer,
    selectedQuestionReduer}