import axios from 'axios'
import { SEARCH_DISPATCH_FAIL, SEARCH_DISPATCH_REQUEST, SEARCH_DISPATCH_SUCCESS, SEARCH_FAIL, SEARCH_NULL, SEARCH_REQUEST, SEARCH_SUCCESS } from '../constants/searchConstants'

const searchText = (text, check)=> async (dispatch)=>{
    const url = 'search/'+text
    if(text==='')
    dispatch({type:SEARCH_NULL})
    else{
    try {
        dispatch({type:SEARCH_REQUEST})
        const { data } = await axios.get(url)
        if(check===false && data.length>4) 
        {   
            let values= data.splice(0,4)
            dispatch({ type: SEARCH_SUCCESS, payload: values })
        }
    
        dispatch({ type: SEARCH_SUCCESS, payload: data })
        
            
    } catch (error) {
        dispatch({type: SEARCH_FAIL, payload: error.message})
        
    }
}}

const searchDispatch = (text)=> async (dispatch)=>{
    const url = 'search/'+text
    /*if(text==='')
    dispatch({type:SEARCH_NULL})
    else{*/
    try {
        dispatch({type:SEARCH_DISPATCH_REQUEST})
        const { data } = await axios.get(url)
       
        
        dispatch({ type: SEARCH_DISPATCH_SUCCESS, payload: data })
        
            
    } catch (error) {
        dispatch({type: SEARCH_DISPATCH_FAIL, payload: error.message})
        
    }
}

export  {searchText, searchDispatch}