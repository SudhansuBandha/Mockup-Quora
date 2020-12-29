import React from 'react'
import {DislikeOutlined, DislikeFilled} from '@ant-design/icons'
import ReactTooltip from 'react-tooltip'
import Axios from 'axios'
import { useSelector } from 'react-redux'
function Dislike(props) {
    const userLoggedin = useSelector(state => state.userLoggedin)
    const {  userInfo1 } = userLoggedin
    const onDisLike = () => {

       const answerId=props.id

        if (props.dislikeAction === "") {

            
                Axios.post('http://localhost:5000/api/like/upDisLike', {answerId:props.id}, {
                    headers: {
                        Authorization: userInfo1.token
                    }
                })
                    .then(response => {
                        if (response.data.success) {
                            props.setDislikeAction('disliked')
    
                            //If dislike button is already clicked
                            if(props.likeAction !== "" ) {
                                props.setLikeAction("")
                                props.setLikeCount(props.likeCount - 1)
                            }
    
                        }
                    })
        } else {

            Axios.post('http://localhost:5000/api/like/unDisLike', {answerId:props.id}, {
                headers: {
                    Authorization: userInfo1.token
                }
            })
                .then(response => {
                    if (response.data.success) {
                        props.setDislikeAction("")

                    }
                })


        }
    }


    return (
        <div className="downvote">
        <div data-tip data-for="downvoteTip" 
        onClick={()=>{onDisLike()}}>
        {
            (props.dislikeAction.length!==0)?
            <DislikeFilled
            onClick={onDisLike}
            />
            :
            <DislikeOutlined
            onClick={onDisLike}/>
        }
        
        
            </div>
            
            <ReactTooltip id="downvoteTip" place="top" effect="solid">
                Dislike
            </ReactTooltip>
        </div>
        
    )
}

export default Dislike
