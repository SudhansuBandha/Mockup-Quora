import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faShare, faTrashAlt, faTh, faCaretUp, faCaretDown, faComment  } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import {useDispatch, useSelector} from 'react-redux'
import DeleteAnswer from '../modals/DeleteAnswer'
import TextEditor from '../editor/Editor'
import './HomeScreenAnswers.css'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import { set } from 'js-cookie'
import { selectedQuestion } from '../../actions/questionActions'
import Comment from '../comment/Comment'
import { profile, profile_details } from '../../actions/userActions'
import axios from 'axios'
import FollowButton from '../follow/FollowButton'
import Axios from 'axios'
import { LikeOutlined } from '@ant-design/icons'
import Like from '../Profile/Answers/Like'
import Dislike from '../Profile/Answers/Dislike'
import ReactRoundedImage from "react-rounded-image"

const HomeScreenAnswers = (props) => {
    console.log(props)
    var comment = <FontAwesomeIcon icon ={faComment}/>
    var share = <FontAwesomeIcon icon ={faShare}/>
    var trash = <FontAwesomeIcon icon ={faTrashAlt}/>
    var editIcon = <FontAwesomeIcon icon={faTh}/>
    var upvote = <FontAwesomeIcon icon={faCaretUp} size="2x" />
    var down = <FontAwesomeIcon icon ={faCaretDown} size="2x"/>
    
    
    const dispatch = useDispatch()
    
    
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [answerId, setAnswerId] = useState('')
    const [commentId, setCommentId]=useState('')
    const [commentNumbers, setCommentNumbers]=useState('')
    const [comments, setComments]=useState([])
    const [loading_show_comment, setLoading]=useState(true)
    const [date, setDate] = useState('')
    const [likeCount, setLikeCount] = useState('')
    const [likeAction, setLikeAction] = useState('')
    const [dislikeAction, setDislikeAction] = useState('')





    const userLoggedin = useSelector(state=>state.userLoggedin)
    const p_d = useSelector(state=>state.userProfile)
    //const comments_data = useSelector(state=>state.commentShow)
    const comment_post=useSelector(state=>state.commentPost)
    const comment_delete=useSelector(state=>state.commentDelete)
    const question=useSelector(state=>state.selectedQuestion)
    
    const {posted_comment}=comment_post
    //const {loading_show_comment, comments} = comments_data
    const {message} = comment_delete
    const {question_data} = question
    
    
    
    const {userInfo1} = userLoggedin
    const {Profile} = p_d

    
    
    
  
    
    const showComment =async (answer_id)=>{
      setCommentId(answer_id)
      setDeleteId('')
      setAnswerId('')
      const url ="/api/comment/"+answer_id
      const data = await axios.get(url)
      setComments(data.data)
      if(posted_comment || message)
      setCommentNumbers(data.data.length)
      setLoading(false)
           
    }
    
    const length =async ()=>{
      
      const url ="/api/comment/"+props.answer.id
      axios.get(url)
      .then((result)=>{
        
        setCommentNumbers(result.data.length)
      })
      .catch((err)=>{console.log(err)})
           
    }
   const QuestionDispatch=(id)=>{
     
    dispatch(selectedQuestion(id))
  }

    useEffect(()=>{
        if(posted_comment){
          setLoading(true)
          showComment(commentId)
          
        }
        
       
      
    },[comment_post])
    
  
    useEffect(() => {
      if(message){
        setLoading(true)
        showComment(commentId)
        
      }
    }, [comment_delete])

    useEffect(()=>{
      
      length()
      if(props.condition){
        Axios.get('/api/activity/date/'+props.answer.date).
        then((date)=>{
          setDate(date.data)
          })
        .catch((err)=>{console.log(err)})
      }else{
        setDate(props.answer.date)
      }

      Axios.get('/api/like/getLikes/'+props.answer.id)
      .then((result)=>{
        setLikeCount(result.data.likes.length)

        result.data.likes.map((like)=>{
          if (like.userId === props.answer.user_id) {
            setLikeAction('liked')
        }
        })
      })
      .catch((err)=>{console.log(err)})

      Axios.get('/api/like/getDislikes/'+props.answer.id)
      .then((result)=>{

        result.data.dislikes.map((dislike)=>{
          if (dislike.userId === props.answer.user_id) {
            setDislikeAction('disliked')
        }
        })
      })
      .catch((err)=>{console.log(err)})

      
    })
    
    

    return (
                                
            <div className="question-card" style={{width:"100%",paddingTop:"0"}}>
              <div className="flex-container">
            <div>
            <ReactRoundedImage
            image={props.answer.profilepic}
            imageWidth="45"
            imageHeight="45"
            roundedSize="0"
            />
            </div>    
            <div className="user-details">
                <div className="second-flex">
                <Link to={"/profile/"+props.answer.user}
                target="_black"
                >
                <p className="card-title"><strong>{
                  
                  props.answer.user
                }</strong></p>
                </Link>
                <p className="white card-separator">.</p>
                <p className="white">{date}</p>
                </div>
                <div className="details-description" style={{marginTop:"-15px"}}>
                <p className="white">{props.answer.description}</p>
                </div>
            </div>
            </div>
            <div style={{height:"30px"}}>
            { (props.condition)&&
            <Link to ={'/'+props.answer.question_id} 
            target="_blank">
              <h6 className="card-title"><strong>{props.answer.question}</strong></h6>
            </Link>
            }
            </div>   
              <div className="answer">
                  <p>{props.answer.answer}</p>
              </div>
               
              <div className="individual-answer-bottom">
              
                  <div className="individual-answer-bottom-left">
                  <Like
                  likeAction={likeAction}
                  setLikeAction={setLikeAction}
                  likeCount={likeCount}
                  setLikeCount={setLikeCount}
                  dislikeAction={dislikeAction}
                  setDislikeAction={setDislikeAction}
                  id={props.answer.id}
                />
                        
                      <div 
                      className="option-comment" 
                      data-tip data-for="commentTip"
                      onClick={(e)=>{
                        showComment(props.answer.id)
                        }}
                      >
                      {comment} 
                      <div style={{paddingLeft:"5px",marginTop:"-4px"}}>
                        {commentNumbers}
                      </div>
                      
                      </div>
                      
                      <ReactTooltip id="commentTip" place="top" effect="solid">
                          Comment
                      </ReactTooltip> 
                     
                     
                     </div>   

                  <div className="homescreen-answer-bottom-right">
                  {
                    (userInfo1 && userInfo1.id===props.answer.user_id)?
                    <div className="question-edit">
                    <div data-tip data-for="editTip" className="share" 
                    onClick={()=>{
                     setAnswerId(props.answer.id)
                     setCommentId('')
                     setDeleteId('')
                     dispatch(profile_details())
                     }}>
                       {editIcon}
                    </div>
                    
                    <ReactTooltip id="editTip" place="top" effect="solid">
                       Edit Answer
                    </ReactTooltip>   
                   </div>
               
                    :
                     <div></div>
                  }
                     
                  {
                    (userInfo1 && userInfo1.id===props.answer.user_id)?
                    <div className="question-delete">
                  <div data-tip data-for="deleteTip" 
                  onClick={()=>{
                    setDeleteOpen(true)
                    setCommentId('')
                    setAnswerId('')
                    setDeleteId(props.answer.id)
                    
                  }}>
                          {trash} 
                      </div>
                      
                      <ReactTooltip id="deleteTip" place="top" effect="solid">
                          Delete
                      </ReactTooltip>
                  </div>:
                  <div></div>
                  }  
                  <Dislike
                        dislikeAction={dislikeAction}
                        setDislikeAction={setDislikeAction}
                        likeAction={likeAction}
                        setLikeAction={setLikeAction}
                        likeCount={likeCount}
                        setLikeCount={setLikeCount}
                        id={props.answer.id}
                  />
                  <div className="question-share">
                      <div data-tip data-for="shareTip" className="share">
                          {share}
                      </div>
                      <ReactTooltip id="shareTip" place="top" effect="solid">
                          Share
                      </ReactTooltip>
                    </div>
                  </div>
                 
              </div>
              {
                (props.answer.id===answerId)?              
                <div>
                <TextEditor 
                id={answerId}
                props={props}
                type="editing"
                text={props.answer.answer}
                onClose={()=>{
                  setAnswerId("")
                }}
                />
                </div>:<div></div>
              }
              
              { 
                (commentId===props.answer.id) ?
                
                loading_show_comment?<div className="loaders-comment"><LoaderDots size="small"/></div>:
                
                <Comment
                props={props}
                comments={comments}
                answer_id={props.answer.id}
                />
                :<div></div>
              }
              {
                (deleteId===props.answer.id)
              
                ?
                <DeleteAnswer 
                open={deleteOpen} 
                onClose={()=> setDeleteOpen(false)} 
                props={props}
                id={deleteId}
                />
                
                :<div></div>
              }

            </div>)}

export default HomeScreenAnswers