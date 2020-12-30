import React, { useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { listQuestions } from '../actions/questionActions'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faWifi,  faShare, faTrashAlt, faTh  } from '@fortawesome/free-solid-svg-icons'
import ReactTooltip from 'react-tooltip'
//import EditModal from './modals/EditModal'
//import { editQuestion } from '../actions/questionActions'
//import DeleteQuestion from './modals/DeleteQuestion'
import TextEditor from '../editor/Editor'
//import { deleteProfile } from '../actions/userActions'
import { render } from 'react-dom'
import Axios from 'axios'
import IndividualAnswer from '../Profile/Answers/IndividualAnswer'
import IndividualQuestion from '../Profile/Questions/IndividualQuestion'

import './HomeScreen.css'
import HomeScreenAnswers from './HomeScreenAnswers'
import HomeScreenQuestion from './HomeScreenQuestions'

function HomeScreen(props){
  

  const [activites, setActivites]=useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  useEffect(() => {
          
    fetchActivites()
    //Axios.get('/').then((res)=>{console.log(res.data)})    
  })

  const fetchActivites = () =>{
    Axios.post('/api/activity/')
    .then((res)=>{
        //console.log(res.data)
        setActivites(res.data)
        setLoading(false)
        

    })
    .catch((err)=>{console.log(err)})
}
const loadMoreItems = () => {
  
  console.log('CurrentPage', page)
  setPage(page+1)
  
  

}

    
const renderActivites =activites.map((activity, index)=>{
  if(activity.type==="answer"){
  //console.log(activity)
  const answer={
      id:activity._id,
      answer:activity.answer,
      question:activity.question.question,
      question_id:activity.question._id,
      user:activity.user.username,
      downvotes:[],
      upvotes:[],
      user_id:activity.user._id,
      date:activity.date,
      description:activity.user.description,
      profilepic:activity.user.profilepic
  }
  //console.log(answer)
return <div key={index} className="posts">
          {
              <HomeScreenAnswers

              answer={answer}
              history={props.history}
              condition={true}
              />
          }
</div> 
}

if(activity.type==="question"){
  
  const question={
      _id:activity._id,
      question:activity.question,
      type:activity.type,
      followers:[],
      following:[],
      user_id:activity.user._id,
      username:activity.user.username,
      date:activity.date
  }
  return <div key={index} className="posts">
          {
              <HomeScreenQuestion 
                  question={question}
                  history={props.history}
              /> 
          }
</div> 
}

}) 
    return <main>
    <div className="homepage">
    {
      loading ? <div style={{paddingTop:"40px"}}><LoaderDots size="medium"/></div>: 
      <div> 
        
          {renderActivites}
         
      </div>

    }
     </div>
    </main>
}
export default HomeScreen