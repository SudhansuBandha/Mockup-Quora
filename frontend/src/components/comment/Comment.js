import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { postComment, removeComment } from '../../actions/commentActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import SingleComment from './SingleComment'


function Comment(props) {
    var trash_small = <FontAwesomeIcon icon ={faTrashAlt} size="sm"/>
    //console.log(props.comments)
    const dispatch = useDispatch()

    const [commentText, setCommentText] = useState('')

    const userLoggedin = useSelector(state=>state.userLoggedin)

    const {userInfo1} = userLoggedin

    const registerComment=(answer_id)=>{
        dispatch(postComment(commentText, answer_id))
        
      }

    const deleteComment= (comment_id)=>{
        
        dispatch(removeComment(comment_id))
     }

     
    return (
        
        
            
            <div>
            { (userInfo1) &&
              <div className="comment-section">
            
              <div><img src="/images/default.jpg" alt="" className="single-card-img"/></div>
              <form className="comment-box">
              <input type="text" name="" 
              className="comment-txt" 
              placeholder="Add a comment"
              onChange={(e)=>setCommentText(e.target.value)}/>
              </form>
              <div className="cs"
              onClick={(e)=>{registerComment(props.answer_id)}}>
                Add Comment
              </div>
            </div>}
            
            {
              (props.comments.length>0) &&
              props.comments.map((comment)=>(
                ((!comment.responseToId) &&
                <React.Fragment key={comment._id}>
                <SingleComment comment={comment} deleteComment={deleteComment}  CommentLists={props.comments}/>
               </React.Fragment>
                )
              ))
              
              }
           
            </div>
    )
}

export default Comment
