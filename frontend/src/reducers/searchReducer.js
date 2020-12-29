import { SEARCH_DISPATCH_FAIL, SEARCH_DISPATCH_REQUEST, SEARCH_DISPATCH_SUCCESS, SEARCH_FAIL, SEARCH_NULL, SEARCH_REQUEST, SEARCH_SUCCESS } from "../constants/searchConstants"

function searchRequestReducer (state ={}, action){
    switch(action.type){
        case SEARCH_REQUEST:
            return {loading:true}
        case SEARCH_SUCCESS:
            return {loading:false, data:action.payload}  
        case SEARCH_FAIL:
            return{loading:false, error:action.payload}
        case SEARCH_NULL:
            return{data:[]}        
        default:
            return state          
    }
}

function searchDispatchReducer (state ={}, action){
    switch(action.type){
        case SEARCH_DISPATCH_REQUEST:
            return {loading:true}
        case SEARCH_DISPATCH_SUCCESS:
            return {loading:false, data:action.payload}  
        case SEARCH_DISPATCH_FAIL:
            return{loading:false, error:action.payload}  
        default:
            return state          
    }
}

export  {searchRequestReducer, searchDispatchReducer}