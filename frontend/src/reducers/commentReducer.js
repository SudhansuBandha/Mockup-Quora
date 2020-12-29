import { ANSWER_COMMENT_DELETE_FAIL, ANSWER_COMMENT_DELETE_REQUEST, ANSWER_COMMENT_DELETE_SUCCESS,
    ANSWER_COMMENT_POST_FAIL, ANSWER_COMMENT_POST_NULL, ANSWER_COMMENT_POST_REQUEST, ANSWER_COMMENT_POST_SUCCESS}
    from '../constants/commentConstants'

function answerCommentPostReducer(state={}, action){
    switch(action.type){
        case ANSWER_COMMENT_POST_REQUEST:
            return {loading:true}
        case ANSWER_COMMENT_POST_SUCCESS:
            return {loading:false, posted_comment:action.payload}
        case ANSWER_COMMENT_POST_FAIL:
            return {loading: false, error:action.payload}
            case ANSWER_COMMENT_POST_NULL:
                return {}         
        default:
            return state;        
        }
}


function answerDeleteCommentReducer(state={}, action){
    switch(action.type){
        case ANSWER_COMMENT_DELETE_REQUEST:
            return {loading:true}
        case ANSWER_COMMENT_DELETE_SUCCESS:
            return {loading:false, message:action.payload}
        case ANSWER_COMMENT_DELETE_FAIL:
            return {loading: false, error:action.payload}    
        default:
            return state;        
        }
}

export{
    answerCommentPostReducer,
    
    answerDeleteCommentReducer,
}