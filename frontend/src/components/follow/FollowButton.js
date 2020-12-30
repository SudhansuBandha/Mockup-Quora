import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faWifi } from '@fortawesome/free-solid-svg-icons'
import './FollowButton.css'
import Axios from 'axios'
import { useSelector } from 'react-redux'

function FollowButton(props) {
    var wifi = <FontAwesomeIcon icon ={faWifi}/>
    //console.log(props)
    
    const [isFollowing, setIsFollowing] = useState(false)
    const [length, setLength] = useState('')
    

    const userLoggedin = useSelector(state => state.userLoggedin)
    const {  userInfo1 } = userLoggedin


    const handleChange=(e)=>{

        if(isFollowing){
        
        let url= "/api/following/unfollow_request"
        let variables={
            type:"",
            userTo:"",
            questionTo:"",
            answerTo:""
        }


        if(props.type==="question"){
            variables.type="question"
            variables.questionTo=props.id
            Axios.post(url,variables,{
                headers:{
                    Authorization:userInfo1.token
                }
            }).then((response)=>{
                if(response.data.success){
                    setIsFollowing(false)
                    setLength(length-1)
                }                
            }).catch((err)=>{console.log(err)})
        }

        

        if(props.type==="user"){
            variables.type="user"
            variables.userTo=props.id
            Axios.post(url,variables,{
                headers:{
                    Authorization:userInfo1.token
                }
            }).then((response)=>{
                if(response.data.success){
                    setIsFollowing(false)
                    setLength(length-1)
                }                
            }).catch((err)=>{console.log(err)})
        }
    }else{
        let url= "/api/following/request"
        

        if(props.type==="question"){
            const variables={
                type:"question",
                questionTo:props.id
            }

            Axios.post(url,variables,{
                headers:{
                    Authorization:userInfo1.token
                }
            }).then((response)=>{
                if(response.data.success){
                    setLength(length+1)
                    setIsFollowing(true)
                }
            })
        }

       

        if(props.type==="user"){
            const variables={
                type:"user",
                userTo:props.id
            }

            variables.type="user"
            variables.questionTo=props.id

            Axios.post(url,variables,{
                headers:{
                    Authorization:userInfo1.token
                }
            }).then((response)=>{
                if(response.data.success){
                    setLength(length+1)
                    setIsFollowing(true)
                }
            })
        }
    }
}


    useEffect(() => {

        let url="/api/following/followed/"
        const variables={
            userTo:"",
            questionTo:"",
            answerTo:"",
            userFrom:userInfo1.id,
            type:""
        }

        if(props.type==="question"){
            url=url+"question"
            variables.questionTo=props.id
            Axios.post(url,variables,{
                headers: {
                    Authorization: userInfo1.token
                }
            }).then((response)=>{
                if(response.data.followed){
                    setIsFollowing(true)
                    variables.type="question"
                    Axios.post("/api/following/followers",variables)
                    .then((result)=>{
                        setLength(result.data.length)
                    }).catch((err)=>{console.log(err)})
                }    
        }).catch((err)=>{console.log(err)})  
    }

       

        if(props.type==="user"){
            url=url+"user"
            variables.userTo=props.id
            Axios.post(url,variables,{
                headers: {
                    Authorization: userInfo1.token
                }
            }).then((response)=>{
                if(response.data.followed){
                    setIsFollowing(true)
                    variables.type="user"
                    Axios.post("/api/following/followers",variables)
                    .then((response)=>{
                        setLength(response.data.length)
                    }).catch((err)=>{console.log(err)})
                }    
        }).catch((err)=>{console.log(err)})  
        
    }

    })    
    
    return( 
        <div>
        <div className="follow-button">
        
        {
            (isFollowing)?
            <div className="follow-button-success" onClick={(e)=>{handleChange(e)}}>
            
            <p>{wifi}</p> 
            <p className="follow-button-text">Following</p>
            <p className="follow-button-separator">.</p>
            <p className="follow-button-number">{length}</p>
            </div>:
            <div className="follow-button-fail" onClick={(e)=>{handleChange(e)}}>
            
            <p>{wifi}</p> 
            <p className="follow-button-text-fail">Follow</p>
            </div>
        }
        
        </div>
        </div>
    )
}

export default FollowButton
