import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  update } from '../../actions/userActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt  } from '@fortawesome/free-solid-svg-icons'
import EditEmailModal from '../modals/EditEmail'
import EditDescriptionModal from '../modals/EditDescription'
import EditPasswordModal from '../modals/EditPassword'
import EditUsernameModal from '../modals/EditUsername'
import ReactRoundedImage from "react-rounded-image";

function EditProfile (props){
    var pencil = <FontAwesomeIcon icon ={faPencilAlt}/>

    const [editEmailOpen, setEditEmailOpen] = useState(false)
    const [editPasswordOpen, setEditPasswordOpen] = useState(false)
    const [editDescriptionOpen, setEditDescriptionOpen] = useState(false)
    const [editUOpen, setEditUOpen] = useState(false)
    const [textValue, setTextValue] = useState('')

    const userLoggedin = useSelector(state=>state.userLoggedin)
    const { userInfo1 } = userLoggedin
    const userProfile = useSelector(state => state.userProfile)
    const { Profile } = userProfile
    
    
    const [image, setImage] = useState('')
    const [imageRender, setImageRender] = useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [uname, setUname]= useState('')
    
    const fileSelectedHandeler =(e) =>{
        setImageRender(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])
    }

       
    const dispatch = useDispatch()

    useEffect(()=>{
        
       
        return ()=>{}
    },[])


   
    return<div className="edit-page-main"> 
        <div className="edit-page">
                <div className="edit-page-section">
                <div className="edit-page-header">
                    <h2 className="edit-page-title">EDIT DETAILS</h2>
                </div>

                <div className="edit-details-section">
                <div>
                
                </div>
                <div className="edit-content">
                <h4>Username:</h4>
                <p className="label-details-username">{Profile.username}</p>
                <div className="edit-icon-username"
                onClick={()=>{
                    setEditUOpen(true)
                    setTextValue(Profile.username)
                }}>
                {pencil}
                </div>
                <EditUsernameModal
                open={editUOpen} 
                onClose={()=> {setEditUOpen(false)
                }} 
                props={props}
                textvalue={textValue}
                />
                </div>
                
                <div className="edit-content">
                <h4>Email:</h4>
                <p className="label-details">{Profile.email}</p>
                <div className="edit-icon-email"
                onClick={()=>{
                    setEditEmailOpen(true)
                    setTextValue(Profile.email)
                    
                }}>
                {pencil}
                </div>
                <EditEmailModal 
                open={editEmailOpen} 
                onClose={()=> {setEditEmailOpen(false)
                }} 
                props={props}
                textvalue={textValue}
                />
                </div>
                
                <div className="edit-content">
                <h4>Change Password</h4>
                <div className="edit-icon-password"
                onClick={()=>{
                    setEditPasswordOpen(true)
                    setTextValue('')
                }}>
                {pencil}
                </div>
                <EditPasswordModal 
                open={editPasswordOpen} 
                onClose={()=> setEditPasswordOpen(false)} 
                props={props}
                textvalue={textValue}
                />
                </div>

                <div className="edit-content">
                <h4>Description:</h4>
                <p className="description-details">
                {Profile.description}
                </p>
                <div className="edit-icon-description"
                onClick={()=>{
                    setEditDescriptionOpen(true)
                    setTextValue(Profile.description)
                }}>
                {pencil}
                </div>
                <EditDescriptionModal 
                open={editDescriptionOpen} 
                onClose={()=> setEditDescriptionOpen(false)} 
                props={props}
                textvalue={textValue}
                />
                </div>

                
                
               </div>
    </div>
    </div>
    </div>
}

export default EditProfile