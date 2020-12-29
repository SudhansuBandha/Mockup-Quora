import React, {useState} from 'react'
import {NavLink, Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHome, faBell, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import { profile } from '../actions/userActions'
import { searchText } from '../actions/searchActions'
import QuestionModal from '../components/modals/QuestionModal'
import SearchModal from '../components/modals/SearchModal'


function NavBar(props){
    const userLoggedin = useSelector(state => state.userLoggedin)
    const [isOpen, setisOpen] = useState(false)
    const[isSearchOpen, setIsSearchOpen] = useState(false)
    const [text, setText] = useState("")

    const {  userInfo1 } = userLoggedin
    
    
    const dispatch = useDispatch()
    
    
    const Profile = () =>{
      
      dispatch(profile(userInfo1.id))
    }
       
    const search = (e)=>{
      
      dispatch(searchText(e.target.value,false))
      setText(e.target.value)
    }
    var FS = <FontAwesomeIcon icon = {faSearch} size="lg"/>
    var FH = <FontAwesomeIcon icon = {faHome} size="2x" />
    var FB = <FontAwesomeIcon icon ={faBell} size="2x"/>
    var FU = <FontAwesomeIcon icon ={faUserCircle} size="2x"/>


    return <header className="header">
      
        <div className="title">
           <Link to="/" className="bgst">Mockup Quora</Link>
        </div>
        
        <NavLink exact to ="/" className="red link" style={{marginLeft:"20px"}}
        >
        <div  className="home-tab-navbar">
          {FH}Home
        </div>
        </NavLink>
        {/*
        <NavLink exact to="/notifications"  className="red link"
        >
        <div className="notifications">
        
        {FB}Notifications
        
        </div>
        </NavLink>
        */} 
        <div className="search-box" style={{marginLeft:"40px"}}>
        <input 
        type="text" 
        name="" 
        className="search-txt" 
        placeholder="Type to search"
        onChange={(e)=>{search(e)}}
        onFocus={()=>setIsSearchOpen(true)}
        />
		    <div className="search-btn" >
		      {FS}	
        </div>
        <SearchModal
          open={isSearchOpen}
          onClose={()=>setIsSearchOpen(false)}
          text={text}
        />
        </div>
        {
          userInfo1 ?
          <div className="question" id="myBtn" style={{marginLeft:"20px"}}>
          <div className="link-blue"  onClick={()=>setisOpen(true)}>Add Question</div>
          <QuestionModal open={isOpen} onClose={()=> setisOpen(false)}/>
          </div>:
          <div style={{width:"97px"}}></div>
        }
        

        {userInfo1 ? (
          <NavLink  to={'/profile/'+userInfo1.username} className="red link" onClick={Profile}>
            <div className="profile_tab">
              {FU}Profile
            </div>
            </NavLink>
            
          ) : (
            null
          )}
          {userInfo1 ? (
            <NavLink exact to="/logout" className="red link extra-link">
            <div className="">
            Logout
            </div>
            </NavLink>
          ) : (
            <NavLink exact to="/signin" className="red link extra-link">
            <div className=" signin_tab">
            Sign In
            </div>
            </NavLink>
          )}
            
           
    </header>
    
    
}

export default NavBar
