import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import Cookie from 'js-cookie'
import IndividualQuestion from './IndividualQuestion.js'
import Axios from 'axios'


function ProfileQuestions(props) {
    
    
    
    const {edit} = useSelector(state=>state.questionsEdit)
    if(edit) Cookie.set('edit', JSON.stringify(edit))

    

  
    //const questionPost= useSelector(state=>state.questionsUserList)
    const [editorOpen, setEditorOpen] = useState(false)
    const [questions, setQuestions] =useState([])
    const [loading, setLoading]= useState(true)

    const loadEditor=(id, question)=>{
      console.log(question)  
      setEditorOpen(true)
      }
    

    const {question} = useSelector(state=>state.questionDelete)
    const {userInfo1} = useSelector(state=>state.userLoggedin)
    const userProfile = useSelector(state => state.userProfile)
    const { Profile } = userProfile
    //const {loading, questions, error }=questionPost
    //if(questionPost) Cookie.set('questionsUser', JSON.stringify(questionPost))

    
    
    useEffect(() => {

        Axios.get('/api/questions/fetch/'+props.profile_id)
        .then((data)=>{
          console.log(data.data)
          setQuestions(data.data)
          setLoading(false)
        })  

        if(question) props.history.push('/profile/'+userInfo1.id)    
        return () => {
            
        }
    }, [])

    

    return ( loading ? <div><LoaderDots size="medium"/></div>:
         (   
        <div className="profile-details-section">
        
          <div className="profile-details-section-header">
            <div className="profile-details-section-header-content"><h6>{questions.length} Questions</h6></div>
          </div> 

          
          {
            questions.map(question=>{
              return <div className="question-card" key={question._id}>
              <IndividualQuestion 
              question={question}
              history={props.history}
              profile_id={props.profile_id}
              /*loadEditor={loadEditor}
              editorOpen={editorOpen}*//>  
              </div>  
        })
          }
                
          
                       
          
        </div>
    ))
}

export default ProfileQuestions
