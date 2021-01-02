import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faWifi,  faShare, faCaretDown, faCaretUp, faTrashAlt, faTh, faComment  } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import './SelectedQuestion.css'
import { postAnswer } from '../../actions/answerActions'
import TextEditor from '../editor/Editor'
import Comment from '../comment/Comment'
import DeleteAnswer from '../modals/DeleteAnswer'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import { profile_details } from '../../actions/userActions'
import FollowButton from '../follow/FollowButton'
import Axios from 'axios'
import IndividualAnswer from '../Profile/Answers/IndividualAnswer'
import { set } from 'js-cookie'
import SelectedQuestionAnswer from './SelectedQuestionAnswer'

function SelectedQuestion(props) {
    var pencil = <FontAwesomeIcon icon ={faPencilAlt}/>
    var wifi = <FontAwesomeIcon icon ={faWifi}/>
    var share = <FontAwesomeIcon icon ={faShare}/>
    var trash = <FontAwesomeIcon icon ={faTrashAlt}/>
    var editIcon = <FontAwesomeIcon icon={faTh}/>
    var upvote = <FontAwesomeIcon icon={faCaretUp} size="2x" />
    var down = <FontAwesomeIcon icon ={faCaretDown} size="2x"/>
    var comment = <FontAwesomeIcon icon ={faComment}/>

    const dispatch = useDispatch()

    const [commentId, setCommentId]=useState('')
    const [answerId, setAnswerId] = useState('')
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [question, setQuestion] = useState('')
    const [commentNumbers, setCommentNumbers]=useState('')
    const [comments, setComments]=useState([])
    const [loading_show_comment, setLoading]=useState(true)
    const [answers, setAnswers] = useState([])
    const [loader, setLoader] = useState(true)

    const posted_answer= useSelector(state=>state.answerPost)
    
    const comment_post=useSelector(state=>state.commentPost)
    const comment_delete=useSelector(state=>state.commentDelete)
    //const questionState = useSelector(state=>state.selectedQuestion)
    const {answer} = posted_answer
    //const {loading_question_page,question_data} = questionState
    const userLoggedin = useSelector(state=>state.userLoggedin)
    const {userInfo1} = userLoggedin
    const {posted_comment}=comment_post
    
    const {message} = comment_delete


    
      

    /*const showComment =async (answer_id)=>{
        setCommentId(answer_id)
        
        const url ="/api/comment/"+answer_id
        const data = await Axios.get(url)
        setComments(data.data)
        if(posted_comment || message)
        setCommentNumbers(data.data.length)
        setLoading(false)
             
      }
      const length =async ()=>{
      
        const url ="/api/comment/"+props.answer.id
        Axios.get(url)
        .then((result)=>{
          
          setCommentNumbers(result.data.length)
        })
        .catch((err)=>{console.log(err)})
             
      }
      */
      useEffect(()=>{
        if(posted_comment){
          //setLoading(true)
          //showComment(commentId)
          
        }
        
    },[comment_post])
    
    useEffect(() => {
        if(message){
          //setLoading(true)
          //showComment(commentId)
          
        }
      }, [comment_delete])
      useEffect(()=>{
      
        //length()
        //console.log(props.match.params.id)
        Axios.get('/api/questions/'+props.match.params.id)
        .then((result)=>{
          //console.log(result.data)
          setQuestion(result.data)
        }).catch((err)=>{console.log(err)})
        Axios.get('/api/answers/question/'+props.match.params.id)
        .then(({ data })=>{
          //console.log(data)
          setAnswers(data)
          setLoader(false)
      })
      })

    useEffect(()=>{
        if(answer)
        {
            dispatch(postAnswer(null,null))
            props.history.push("/")

        }
    },[posted_answer])

    
    if(answers.length>0){        
    return (<div>{
      (loader)?
       <div className="profile-main">
        <div style={{width:"800px", minHeight:"500px", backgroundColor:"white", paddingTop:"30px"}}>
        <LoaderDots size="medium"/>
      </div></div>
      :
      
         <div className="profile-main">
         <div className="individual-question" style={{margin:"0"}}>
            <div className="individual-card">
                <div className="individual-title">
                <h4><strong>{question.question} </strong></h4>
                </div>
                {(userInfo1)&&<div><div className="individual-question-bottom">
              <div className="card-question-bottom-left">
                
                     <div className="question-pencil"
                    onClick={
                        ()=>{
                            dispatch(profile_details())
                        }}>{pencil} Answer</div> 
                
                 
                   
                   <FollowButton
                   type="question"
                   id={question._id}
                   />
                 
                  

              </div>
              <div className="selected-question-bottom-right">
                
               
                <div className="question-share">
                <div data-tip data-for="shareTip" className="share">
                    {share}
                </div>
                <ReactTooltip id="shareTip" place="top" effect="solid">
                    Share
                </ReactTooltip>
              </div>
              </div></div>
          </div>
        }
          
        </div>
            <div className="answers-section">
                <div className="answers-section-header">
                    <div className="answers-section-header-content">
                      <h6>{answers.length} Answer(s)</h6>
                    </div>
                </div>
                {
                  
                  answers.map(answer=>{
                    const obj={
                      answer:answer.answer,
                      id:answer._id,
                      question:answer.question.question,
                      question_id:answer.question._id,
                      downvotes:[],
                      upvotes:[],
                      user:answer.user.username,
                      user_id:answer.user._id,
                      date:"",
                      description:answer.user.description,
                      profilepic:answer.user.profilepic
                    }
                    return  <div key={answer._id}  style={{
                      minHeight:"180px",
                      paddingBottom:"20px",
                      marginBottom:"10px"
                    }}>
                     {
                     <SelectedQuestionAnswer 
                     answer={obj}
                     history={props.history}
                     condition={false}
                     
                     />
                     }
                     </div>  
                 })             
                   
                }
               
                
   
                </div>
         </div>      
        </div>
    }
        </div>        
    )
  }else{
    return null
  }              
}

export default SelectedQuestion
