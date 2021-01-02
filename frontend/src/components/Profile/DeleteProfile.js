import React from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import { deleteProfile } from '../../actions/userActions'


function DeleteProfile(props){

    const dispatch=useDispatch()

    const userLoggedin = useSelector(state => state.userLoggedin)
    const {  userInfo1 } = userLoggedin
    
    const deletedProfile = useSelector(state=>state.deletedProfile)
    const {loading, message } = deletedProfile
    
    const Delete =() =>{
        dispatch(deleteProfile(false))
    }

    
      return   loading?<div></div>:
            message?<div className="account">
            <div className="details-box">
                <div className="inside-details">
                    
                    <p className="inside-color"> Your Account got deleted</p>
                   
                </div>
            </div>
            </div>:
    
    <div className="account-delete">
            <div className="details-box">
                <div className="inside-details">
                    
                    <p className="inside-color"> Hi, {userInfo1.username.split(" ")[0]}</p>
                    <div className="inside-second">
                    <p className="second-para">Are you sure that you want to delete your account??</p>
                    <div className="inside-second-buttons">
                    <Link to={"/profile/"+userInfo1.username}>
                    <Button type="" variant="success" className="sp">No, Back To Profile Page</Button>
                    </Link>
                    <div style={{marginLeft:"20px"}}>
                    <Button type="" variant="danger" className="sp" onClick={Delete}>Yes, Delete My Account</Button>
                    </div>
                    </div>
                </div>
            </div>
            </div></div>
    
}

export default DeleteProfile