import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import Cookie from 'js-cookie'
import IndividualAnswer from './IndividualAnswer.js'
import axios from 'axios'


function ProfileAnswers(props) {
    
    
    
    const {edit} = useSelector(state=>state.questionsEdit)
    if(edit) Cookie.set('edit', JSON.stringify(edit))

    
    
    const userLoggedin = useSelector(state => state.userLoggedin)
    const {  userInfo1 } = userLoggedin
    const userProfile = useSelector(state => state.userProfile)
    const { Profile } = userProfile
    //const answersPost= useSelector(state=>state.answersUserList)
    const [editorOpen, setEditorOpen] = useState(false)
    const [Answers, setAnswers] = useState([])
    const [loading, setLoading]=useState(true)

    const loadEditor=(id, question)=>{
        
      setEditorOpen(true)
      }
    

    
    //const {loading, answers, error }=answersPost
    //if(answersPost) Cookie.set('answersUser', JSON.stringify(answersPost))
    
    

    useEffect(()=>{
      axios.get('http://localhost:5000/api/answers/user_fetch/'+Profile._id).then(({ data }) => {
        setLoading(false)  
        setAnswers(data)

        }).catch(error => console.log(error))
    },[])
  

    
   
  

    

    return ( loading ? <div><LoaderDots size="medium"/></div>:
            
         (   
        <div className="profile-details-section">
        
          <div className="profile-details-section-header">
            <div className="profile-details-section-header-content"><h6>{Answers.length} Answers</h6></div>
          </div> 
          {      
            Answers.map(answer=>{
             return  <div key={answer.id}>
              {
              <IndividualAnswer 
              answer={answer}
              history={props.history}
              condition={false}
              />
              }
              </div>  
          })             
            }
          
          
        </div>
    ))
}

export default ProfileAnswers
