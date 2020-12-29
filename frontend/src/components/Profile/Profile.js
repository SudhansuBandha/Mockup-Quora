import React, { useEffect, useState } from 'react'
import {NavLink} from 'react-router-dom'
import {Switch, Route} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Cookie from 'js-cookie'
import { Link } from 'react-router-dom' 
import { LoaderDots } from '@thumbtack/thumbprint-react'
import ProfileQuestions from './Questions/ProfileQuestions'
import ProfileAnswers from './Answers/ProfileAnswers'
import {  faTrashAlt  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ReactTooltip from 'react-tooltip'
import EditDescriptionModal from '../modals/EditDescription'
import FollowButton from '../follow/FollowButton'
import Axios from 'axios'
import ProfileActivities from './Activities/ProfileActivities'
import Following from './Following/Following'
import Followers from './Followers/Follwers'
import ReactRoundedImage from "react-rounded-image"

function Profile(props){
    
    var trash = <FontAwesomeIcon icon ={faTrashAlt}/>

    
    const [editDescriptionOpen, setEditDescriptionOpen] = useState(false)
    const [textValue, setTextValue] = useState('')
    const [followers, setFollowers] = useState('')

    const userProfile = useSelector(state => state.userProfile)
    const { loading,Profile,error } = userProfile
    if(userProfile) Cookie.set('userProfile', JSON.stringify(userProfile))
    
    const dispatch = useDispatch()
    
    
    /*const questions=(id)=>{
        dispatch(listQuestionsUser(id))
    } */   

    
    useEffect(() => {
        if(Profile){
        Axios.post("http://localhost:5000/api/following/followers",{userTo:Profile._id, type:"user"})
        .then((response)=>{
            setFollowers(response.data)
        })
    }
    })

    const userLoggedin = useSelector(state => state.userLoggedin)
    const {  userInfo1 } = userLoggedin
    
    
    return  loading ? <div className="profile-main"><div className="profile">
    <div className="profile-headline"><div className="loaders"><LoaderDots size="medium"/></div></div></div></div>: 
     (error) ? <div className="profile-main"><div className="profile">
     <div className="profile-headline"><div>Error</div></div></div></div> :
     (Profile)? <div className="profile-main">
     <div className="profile">
     <div className="profile-headline">
     <div>
     <ReactRoundedImage
     image={Profile.profilepic}
     imageWidth="120"
     imageHeight="120"
     roundedSize="0"
     />
    </div>
    <div className="headline-details">
        <div>
        <p className="profile-name">{Profile.username}</p>
        </div>
        
            <div className="details-description">
            {Profile.description}
            </div>
            
        
        {(userInfo1 && (userInfo1.id===Profile._id))? 
        <div className="headline-details-links">
        <Link to={'/edit/'+Profile.username+'/'+Profile._id} className="headline-link">
            Edit your profile
        </Link>
            <Link
            to = {'/profile/'+Profile.username+'/delete_profile'}
            data-tip data-for="profileDeleteTip" 
            className="delete-profile-link headline-link">
                {trash}
            </Link>
            <ReactTooltip id="profileDeleteTip" place="top" effect="solid">
                Delete Your Profile
            </ReactTooltip>
        </div>:
        <div></div>
    }
    </div>
    </div>
    
   
   
    <div className="profile-details" >
        <div className="followers-count" style={{marginBottom:"20px", height:"31px"}}>
            
            {
                (userInfo1&&userInfo1.id!==Profile._id) &&
                <FollowButton
                    type="user"
                    id={Profile._id}
                />
            }
            
           
        </div>
        <div className="profile-navbar">
        <NavLink exact to ={'/profile/'+Profile.username} className="profile-navlinks navlinks-color">Profile</NavLink>
        
        <NavLink exact to ={'/profile/'+Profile.username+'/answers'} 
        className=" profile-navlinks navlinks-color"
        
        >
        Answers</NavLink>
        
        <NavLink exact to ={'/profile/'+Profile.username+'/questions'} 
        className="profile-navlinks navlinks-color"
        onClick={(e)=>{/*questions(Profile._id)*/}}>
        Questions
        </NavLink>

        <NavLink exact to ="" className="profile-navlinks navlinks-color">Shares</NavLink>
        <NavLink exact to ={'/profile/'+Profile.username+'/followers'} className="profile-navlinks navlinks-color">Followers</NavLink>
        <NavLink exact to ={'/profile/'+Profile.username+'/following'} className="profile-navlinks navlinks-color">Following</NavLink>
        </div>
    </div>
    <div>
        <Switch>
            <Route path={'/profile/'+Profile.username+'/followers'} component={Followers}/>
            <Route path={'/profile/'+Profile.username+'/following'} component={Following}/>
            <Route path={'/profile/'+Profile.username+'/questions'} component={ProfileQuestions}/>
            <Route path={'/profile/'+Profile.username+'/answers'} component={ProfileAnswers}/>
            <Route path={'/profile/'+Profile.username} component={ProfileActivities}/>
        </Switch>
    </div>
    </div>
    </div>:
            <div className="profile-main">
    <div className="profile">
     <div className="profile-headline">
     <h4>Please Log In</h4>
     </div></div>
            </div>
   
   
    }
    /*else{
        return <div className="profile">
    <div className="profile-headline">
        <h1>Please Log in</h1>
    </div></div>
    }*/


export default Profile