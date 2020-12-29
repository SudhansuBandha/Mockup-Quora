import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faWifi,  faShare, faTrashAlt, faTh  } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
import EditModal from '../modals/EditModal'
import DeleteQuestion from '../modals/DeleteQuestion'
import TextEditor from '../editor/Editor'
import {  profile_details } from '../../actions/userActions';
import { selectedQuestion } from '../../actions/questionActions'
import FollowButton from '../follow/FollowButton'
import Axios from 'axios'
import './HomeScreenQuestions.css'

const HomeScreenQuestion = (props) => {

    console.log(props)

    var pencil = <FontAwesomeIcon icon ={faPencilAlt}/>
    var wifi = <FontAwesomeIcon icon ={faWifi}/>
    var share = <FontAwesomeIcon icon ={faShare}/>
    var trash = <FontAwesomeIcon icon ={faTrashAlt}/>
    var editIcon = <FontAwesomeIcon icon={faTh}/>

    const dispatch = useDispatch()
    const [editOpen, setEditOpen] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)
    const [questionId, setQuestionId] = useState('')
    const [editId, setEditId] = useState('')
    const [deleteId, setDeleteId] = useState('')
    const [textvalue, setTextValue] = useState('')
    const [answers, setAnswers] = useState('')
    const [loading, setLoading] = useState(false)
    const [date, setDate] = useState('')

    const userLoggedin = useSelector(state=>state.userLoggedin)
    const pd = useSelector(state=>state.userProfile)
    const {loading1, userInfo1} = userLoggedin
    const {Profile} = pd

    const QuestionDispatch=(id)=>{
     
      dispatch(selectedQuestion(id))
    }
    
    useEffect(() => {
      console.log(userLoggedin)
      
      Axios.get('http://localhost:5000/api/answers/question/'+props.question._id)
      .then((response)=>{
        console.log(props.question._id)
        setAnswers(response.data.length)
        setLoading(true)
      })
      Axios.get('http://localhost:5000/api/activity/date/'+props.question.date).
        then((date)=>{
          setDate(date.data)
          })
        .catch((err)=>{console.log(err)})
    }, [])
    
     return (
        <div className="homescreen-question-card">
            <div className="homescreen-question-userinfo">
                <Link to={'/profile/'+props.question.username}
                target="_blank"
                className="username-link"
                >{props.question.username}</Link> has asked this on {date}
            </div>
            <Link to ={"/"+props.question._id}
            target="_blank">
              <h6 className="card-title"><strong>{props.question.question}</strong></h6>
            </Link>    
              <div className="card-question-details">
                  
                  
                    <Link to ={"/"+props.question._id}
                    target="_blank" >
                    <div className="white-question">
                    <p><strong>{answers} Answers</strong></p>
                    </div>
                    </Link>
                  
                  
              </div>
    
              <div className="card-question-bottom">
                  <div className="card-question-bottom-left">
                      <div 
                      className="question-pencil"
                      onClick={()=>{
                        setQuestionId(props.question._id)
                        dispatch(profile_details())
                        }}
                      
                        >{pencil} Answer</div>
                        
                        {
                          (userInfo1)?
                          <FollowButton
                          type="question"
                          id={props.question._id}
                          />
                          
                          :null
                          
                        }
                        
                      </div>
                  
                  <div className="homescreen-question-bottom-right">
                  {
                    (userInfo1 && userInfo1.id===props.question.user_id)?
                    <div className="question-edit">
                    <div data-tip data-for="editTip" className="share" 
                    onClick={()=>{
                        setEditOpen(true)
                        setEditId(props.question._id)
                        setTextValue(props.question.question)
                    }}>
                       {editIcon}
                    </div>
                    
                    <ReactTooltip id="editTip" place="top" effect="solid">
                       Edit
                    </ReactTooltip>   
                   </div>
                
                    :<div></div>
                  }
                  
                  {
                    (userInfo1 && userInfo1.id===props.question.user_id)
                    ? <div className="question-delete">
                    <div data-tip data-for="deleteTip" 
                    onClick={()=>{
                      setDeleteOpen(true)
                      setDeleteId(props.question._id)
                    }}>
                        {trash} 
                    </div>
                    
                    <ReactTooltip id="deleteTip" place="top" effect="solid">
                        Delete
                    </ReactTooltip>
                </div>
         
                    :<div></div>

                  }
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
                (questionId===props.question._id)?              
                <div>
                <TextEditor 
                id={questionId}
                props={props}
                type="question"
                onClose={()=>{
                  setQuestionId("")
                }}/>
                </div>:<div></div>
              }
              {
                (deleteId===props.question._id)
              
                ?
                <DeleteQuestion 
                open={deleteOpen} 
                onClose={()=> {
                  setDeleteOpen(false)
                  
                }} 
                props={props}
                id={deleteId}
                />
                
                :<div></div>
              }
              {
                (editId===props.question._id)
              
                ?
                <EditModal 
                open={editOpen} 
                onClose={()=> setEditOpen(false)} 
                props={props}
                id={editId}
                textvalue={textvalue}
                />
                
                :<div></div>
              }
            </div>
          
              
    )
            
         }

export default HomeScreenQuestion