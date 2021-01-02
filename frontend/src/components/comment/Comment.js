import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { postComment, removeComment } from '../../actions/commentActions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import ReactRoundedImage from "react-rounded-image"
import SingleComment from './SingleComment'
import Axios from 'axios'


function Comment(props) {
    var trash_small = <FontAwesomeIcon icon ={faTrashAlt} size="sm"/>
    //console.log(props.comments)
    const dispatch = useDispatch()
    const [profilepic, setProfilePic] = useState('')
    const [commentText, setCommentText] = useState('')

    const userLoggedin = useSelector(state=>state.userLoggedin)

    const {userInfo1} = userLoggedin

    const registerComment=(answer_id)=>{
        dispatch(postComment(commentText, answer_id))
        
      }

    const deleteComment= (comment_id)=>{
        
        dispatch(removeComment(comment_id))
     }

     useEffect(() => {
          
      Axios.get('/api/profile/image_url/'+userInfo1.id)
      .then((res)=>{
        console.log(res.data)
        setProfilePic(res.data)
      })  
        
      })
    return (
        
        
            
            <div>
            { (userInfo1) &&
              <div className="comment-section">
            
              <div><ReactRoundedImage
              image={profilepic}
              imageWidth="36"
              imageHeight="36"
              roundedSize="0"
              /></div>
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
