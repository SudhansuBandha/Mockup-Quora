import React, {useEffect, useState} from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { profile } from '../actions/userActions'
import ReactRoundedImage from "react-rounded-image";

import Cookie from "js-cookie"
import Axios from 'axios'

function AccountCreated(props){
    const dispatch = useDispatch()
    
    const userLoggedin = useSelector(state => state.userLoggedin)
    const {  userInfo1 } = userLoggedin
    const userCreated = useSelector(state=> state.userRegistered)
    const { userInfo2 } = userCreated
    const [textAreaValue, setTextAreaValue] = useState('')
    const [image, setImage] = useState('')
    const [imageRender, setImageRender] = useState('')

    const send=(e)=>{
    
        console.log("send")
        let image_check=false
        let description_check=false        
        let image_file= new FormData()
        image_file.append("file", image)
        //variables.image_file.append("File", image)
        //console.log(variables)
        Axios.post('/api/profile/image',image_file,{
            headers:{
                Authorization:userInfo1.token
            }
        }).then((res)=>{
            console.log(res.statusText)
            //dispatch(profile(userInfo1.id))
            image_check=true           
        })
        .catch((err)=>{console.log(err)})
        
        let description= textAreaValue

        Axios.post('/api/profile',{description},{
            headers:{
                Authorization:userInfo1.token
            }
        }).then(()=>{
            console.log("Updated")
            description_check=true
        }).catch((err)=>{console.log(err)})
      //console.log(variables)
      
      if(image_check===true && description_check===true){}
      dispatch(profile(userInfo1.id))
      props.history.push("/")
    }
    const fileSelectedHandeler =(e) =>{
        setImageRender(URL.createObjectURL(e.target.files[0]))
        setImage(e.target.files[0])
    }
    useEffect(() => {
        Cookie.set('userLoggedin', JSON.stringify(userLoggedin))   
    }, [userInfo1])

    if(userInfo1)
    {
    return <div className="account">
            <div className="details-box">
                <div className="inside-details">
                    
                    <p className="inside-color">Hi {userInfo1.username.split(" ")[0]}, your account has been created.Complete your profile</p>
                    <div className="inside-second">
                        <div className="add-image">
                        <div>
                        {
                            ( image!="") ?<div>
                            {console.log(image)}
                            <ReactRoundedImage
                            image={imageRender}
                            imageWidth="120"
                            imageHeight="120"
                            roundedSize="0"
                            />
                            </div>
                            :<ReactRoundedImage
                            image="/images/User.jpg"
                            imageWidth="120"
                            imageHeight="120"
                            roundedSize="0"
                            />
                            
                    }
                    

                        </div>
                        
                        <div style={{marginTop:"10px"}}>
                        <input type='file'  onChange={fileSelectedHandeler}/>
                        </div>
                        </div>
                        <div className="add-profile-description" style={{marginTop:"10px",fontSize:"16px"}}>
                        <label>Add Profile Description:</label>
                        <textarea type="text" 
                        className="middle-content-input" 
                        placeholder="Enter Details for you profile"
                        onChange={(e)=>setTextAreaValue(e.target.value)}
                        rows={5}
                        />
                        </div>
                        <div className="save-details">
                        <Button type="" variant="success" className="sp" onClick={send}>Save Profile Details</Button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    }
    else{
        return <div className="account">
        <div className="details-box">
            <div className="inside-details">
                
                

            </div>
        </div>
        </div>
    }

}

export default AccountCreated