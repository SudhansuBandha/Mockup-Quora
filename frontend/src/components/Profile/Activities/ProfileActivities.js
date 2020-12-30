import { LoaderDots } from '@thumbtack/thumbprint-react'
import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import IndividualAnswer from '../Answers/IndividualAnswer'
import IndividualQuestion from '../Questions/IndividualQuestion'

function ProfileActivities(props) {
    
    const [activites, setActivites]=useState([])
    const [loading, setLoading] = useState(true)


    const userProfile = useSelector(state => state.userProfile)
    const { Profile } = userProfile
    
    

    useEffect(() => {
        
        fetchActivites()
        
    })

    const fetchActivites = () =>{
        Axios.post('activity/'+Profile._id)
        .then((res)=>{
            
            setActivites(res.data)
            setLoading(false)
            //Axios.get('/api/activity/date/'+res.data[0].date)

        })
        .catch((err)=>{console.log(err)})
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
      return <div key={index}>
                {
                    <IndividualAnswer

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
            user:activity.user._id,
            date:activity.date
        }
        return <div key={index}>
                {
                    <IndividualQuestion 
                        question={question}
                        history={props.history}
                    /> 
                }
      </div> 
    }

}) 
     
    
    
    return loading ? <div><LoaderDots size="medium"/></div>:
    <div className="profile-details-section">
        
    <div className="profile-details-section-header">
      <div className="profile-details-section-header-content"><h6> Recent Activites</h6></div>
    </div>
    {renderActivites}
    </div> 
}

export default ProfileActivities
