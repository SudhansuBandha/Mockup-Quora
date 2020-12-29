import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listQuestions, selectedQuestion } from '../actions/questionActions'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faWifi,  faShare, faTrashAlt, faTh, faSearch  } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import EditModal from './modals/EditModal'
import { editQuestion } from '../actions/questionActions'
import DeleteQuestion from './modals/DeleteQuestion'
import TextEditor from './editor/Editor'
import { deleteProfile, profile } from '../actions/userActions'
import { searchDispatch } from '../actions/searchActions'
import Cookie from 'js-cookie'
import FollowButton from './follow/FollowButton'

function SearchResult(props) {
    const dispatch = useDispatch()
    
    const searchData = useSelector(state=>state.searchDispatch)
    const {data} = searchData

    const QuestionDispatch=(id)=>{
        dispatch(selectedQuestion(id))
    }
    const Profile = (id) =>{
      
        dispatch(profile(id))
      }
    if(searchData.loading===false){
        Cookie.set('searchResult', JSON.stringify(searchData))
    return (
        <div className="search-page">
            <div className="search-page-section">
                <div className="search-page-header">
                    <h2 className="search-page-title">SEARCH RESULT</h2>
                </div>
                <div className="search-results">
                     Resuts for <strong>{props.location.pathname.split('/')[2]}</strong> 
                </div>
                { 
                    data.map((post)=>{
                        
                    return(
                    <div className="search-page-content" key={post.id}>
                        {
                            
                                post.type==='question' ?
                                <div className="search-user-details">
                                <Link 
                                to={'/'+post.question}
                                className="search-links"
                                onClick={(e)=>QuestionDispatch(post.id)}
                                >
                                <strong>{post.question.substring(0,props.location.pathname.split('/')[2].length)}</strong>
                                {post.question.substring((props.location.pathname.split('/')[2].length))}
                                </Link>
                                </div>:
                                null
                        }
                        {
                            
                                post.type==='user' ?
                                <div> 
                                <div className="search-user-details">
                                    <div><img src={post.image}
                                    className="search-user-image"/></div>    
                                    <div>Profile:</div>
                                    
                                    <div className="search-profile-name">
                                    <Link to={'/profile/'+post.username}
                                    onClick={(e)=>{Profile(post.id)}}
                                    className="search-links">
                                    <strong>{post.username.substring(0,props.location.pathname.split('/')[2].length)}</strong>
                                    {post.username.substring(props.location.pathname.split('/')[2].length)}
                                    </Link>,  
                                    <span className="details-description-search">{post.description}</span>
                                    </div>
                                    </div>
                                    <div style={{marginLeft:"-22px",marginTop:"10px"}}>
                                    <FollowButton
                                    id={post.id}
                                    type="user"
                                    />
                                    </div>
                                    </div>
                                    :
                                null
                            
                        }
                    </div>
                )
            }
        )}
            
        </div>
        </div>
    )
        }else{
            return null
        }
}
export default SearchResult
