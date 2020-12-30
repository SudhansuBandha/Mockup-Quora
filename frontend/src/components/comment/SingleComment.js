import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import ReplyComment from './ReplyComment'
import Axios from 'axios'


function SingleComment(props) {
    const userLoggedin=useSelector(state=>state.userLoggedin)
    const {userInfo1} = userLoggedin
    console.log(props)
    var trash_small = <FontAwesomeIcon icon ={faTrashAlt} size="sm"/>
    const [date, setDate] = useState('')  
    
    useEffect(()=>{
      Axios.get('activity/date/'+props.comment.date).
        then((date)=>{
          setDate(date.data)
          })
        .catch((err)=>{console.log(err)})
    })

    return (
        <div>
        
            <div className="individual-comment" key={props.comment._id}>
            <div className="comment-user">
            <div>
            <img src="/images/default.jpg" alt="" className="single-card-img"/>
            </div>
            <div className="comment-user-details">
            <p className="" style={{paddingRight:"5px"}}><strong>{props.comment.user.username}</strong></p>
            <p className="white card-separator" style={{paddingRight:"5px"}}>.</p>
            <p className="white">{date}</p>  
            </div>
            </div>
            <div className="particular-comment">
              {
                props.comment.content
              }
            </div>
            
            <div className="comment-buttons">
            <div style={{width:"500px"}}>
            {/*<ReplyComment CommentLists={props.CommentLists} parentCommentId={props.comment._id} answerId={props.comment.answerId}  />*/}
            </div>
            {
                (userInfo1.id===props.comment.user._id) &&
                <div> <div className="comment-delete"
                data-tip data-for="deleteCommentTip"
                onClick={(e)=>{props.deleteComment(props.comment._id)}}>
                  {trash_small}
                </div>
                <ReactTooltip id="deleteCommentTip" place="top" effect="solid">
               Delete Comment
             </ReactTooltip>   
                </div>
            }
            </div>
           
            </div>
            
        </div>
    )
}

export default SingleComment
