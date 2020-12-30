import React from 'react'
import {LikeOutlined, LikeFilled } from '@ant-design/icons'
import ReactTooltip from 'react-tooltip'
import Axios from 'axios'
import { useSelector } from 'react-redux'
function Like(props) {

    const userLoggedin = useSelector(state => state.userLoggedin)
    const {  userInfo1 } = userLoggedin
    const onLike = () => {
       
        
        console.log(props)
        const answerId=props.id
        if (props.likeAction === "") {
            console.log("reached for liking")
            Axios.post('/api/like/upLike',{answerId:props.id},{
                headers:{
                    Authorization:userInfo1.token
                }
            })
                .then(response => {
                    if (response.data.success) {

                        props.setLikeCount(props.likeCount + 1)
                        props.setLikeAction('liked')

                        //If dislike button is already clicked

                        if (props.dislikeAction !== "") {
                            props.setDislikeAction("")
                            
                        }


                    }
                })


        } else {

            Axios.post('/api/like/unLike', {answerId:props.id}, {
                headers: {
                    Authorization: userInfo1.token
                }
            })
                .then(response => {
                    if (response.data.success) {

                        props.setLikeCount(props.likeCount - 1)
                        props.setLikeAction("")

                    }
                })

        }

    }
    
    //console.log(props)
    return (
                <div 
                    data-tip data-for="upvoteTip"
                    className="upvotes">
                    {
                        (props.likeAction.length!==0)?
                        <LikeFilled style={{fontSize:"20px", marginTop:"6px"}}
                         onClick={onLike}/>
                        :
                        <LikeOutlined style={{fontSize:"20px", marginTop:"6px"}}
                        onClick={onLike}
                        />
                    }
                    
                    <div className="upvote-number">
                        {props.likeCount}
                    </div>
                      
                    <ReactTooltip id="upvoteTip" place="top" effect="solid">
                          Like
                    </ReactTooltip>    
                </div>
    )
}

export default Like
