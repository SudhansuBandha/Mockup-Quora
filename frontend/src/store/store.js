import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import {questionsDeleteReducer, questionsEditReducer, questionsListReducer, questionsListUserReducer, questionsPostReducer, selectedQuestionReduer} from '../reducers/questionReducer'
import { userDeleteReducer, userDetailsReducer, userLoginReducer, userProfileReducer, userRegisterReducer, userUpdateReducer, verify_email_Reducer } from '../reducers/userReducer'
import { answerDeleteReducer, answerEditReducer, answerPostReducer, answerShowReducer, } from '../reducers/answerReducer'
import {searchDispatchReducer, searchRequestReducer} from '../reducers/searchReducer'
import { answerCommentPostReducer, answerDeleteCommentReducer } from '../reducers/commentReducer'
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'




const user = Cookie.getJSON('userLoggedin') || {}

const profile = JSON.parse(sessionStorage.getItem('userProfile')) || {}
const questionsUser = Cookie.getJSON('questionsUser') || {}
const edit = Cookie.getJSON('edit') || {}
const answersUser = Cookie.getJSON('answersUser') || {}
const searchResult = Cookie.getJSON('searchResult') || {}
const question_data = JSON.parse(localStorage.getItem('questionData')) || {}


const initialState = {
    userLoggedin: user,
    userProfile: profile,
    questionsUserList: questionsUser,
    questionsEdit: edit, 
    answersUserList:answersUser,
    searchDispatch:searchResult,
    selectedQuestion:question_data
}


const reducer = combineReducers({
    questionsList:questionsListReducer,
    questionsUserList: questionsListUserReducer,
    questionsEdit: questionsEditReducer,
    questionDelete: questionsDeleteReducer,
    userLoggedin: userLoginReducer,
    userRegistered: userRegisterReducer,
    userProfile: userProfileReducer,
    userUpdate:userUpdateReducer,
    verifyEmail: verify_email_Reducer,
    questionPost:questionsPostReducer,
    answerPost:answerPostReducer,
    selectedQuestion:selectedQuestionReduer,
    individualAnswer:answerShowReducer,
    answerEdit:answerEditReducer,
    answerDelete:answerDeleteReducer,
    deletedProfile:userDeleteReducer,
    searchData:searchRequestReducer,
    searchDispatch:searchDispatchReducer,
    commentPost:answerCommentPostReducer,
    commentDelete:answerDeleteCommentReducer,
    profileDetails:userDetailsReducer,
    
})



const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)))
 
export default store

