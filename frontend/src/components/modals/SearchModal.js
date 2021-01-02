import React from 'react'
import ReactDom from 'react-dom'
import {NavLink, Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from 'react-redux'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import { searchDispatch, searchText } from '../../actions/searchActions'
import Cookie from 'js-cookie'
import { selectedQuestion } from '../../actions/questionActions'
import { profile } from '../../actions/userActions'
import ReactRoundedImage from "react-rounded-image"

function SearchModal({ open, onClose, props, text, id }) {
    
    const dispatch = useDispatch()
    const user = useSelector(state=>state.userLoggedin)
    const {userInfo1} = user
    
    const searchResult= useSelector(state=>state.searchData)
    /*if(searchResult.loading===false){
    if(searchResult.data.length>0 ) Cookie.set('searchResult', JSON.stringify(searchResult))
    }*/
    const values = useSelector(state=>state.searchData)
    const {loading, data, error} = values

    var FS = <FontAwesomeIcon icon = {faSearch} size="lg"/>

    const Close=()=>{
        onClose()
        if(text==="")
        dispatch(searchText("",""))
    }
    const search =()=>{
      dispatch(searchDispatch(text))
      onClose()
    }    
    const QuestionDispatch=(id)=>{
      dispatch(selectedQuestion(id))
      onClose()
  }
  const Profile = (id) =>{
    
      dispatch(profile(id))
      onClose()
    }
    if(!open) return null
    return (
        ReactDom.createPortal(
    <>
      <div className='overlay-search-modal' onClick={Close}/>
      <div className='search-modal'>
      <Link to={'/search/'+text}>
      <div className="search-modal-content" onClick={search}>
        <div className='search-modal-textarea'>
          <div className="search-modal-text">
            <p> <span className="search-headline">Search:</span> {text}</p>
          </div>
          </div>
          <div className="search-modal-btn" >
            {FS}	
          </div>  
      </div>
      </Link>
     {
        loading?<div className="search-modal-content">
        <div className="search-modal-textarea"><LoaderDots size="small"/>
        </div>
        </div>:
        data?
        data.map(single=>
        <div className="search-modal-content" key={single.id}>
        <div className="search-modal-textarea">
          {
            (single.type==="question")
            ?<Link to={'/'+single.id}
            className="search-links"
            onClick={(e)=>QuestionDispatch(single.id)}
            >
            <div className="search-modal-text"><strong>{single.question.substring(0,text.length)}</strong>
            {single.question.substring(text.length)}
            </div>
            </Link>
            :
            <Link to={'/profile/'+single.username}
            className="search-links"
            onClick={(e)=>{Profile(single.id)}}
            >
            <div className="search-modal-text">
            <ReactRoundedImage
            image={single.image}
            imageWidth="24"
            imageHeight="24"
            roundedSize="0"
            />
              <p className="search-modal-profile-text">Profile :</p>
              <p><strong>{single.username.substring(0,text.length)}</strong>{single.username.substring(text.length)}</p>
            </div>
            </Link>
          }
        </div>
        </div>
        )
        :
        <div></div>
      }
        
      </div>
      
    </>,
    document.getElementById('portal')
    )  
    )
}

export default SearchModal
