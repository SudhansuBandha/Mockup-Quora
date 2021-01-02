import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import FollowContent from '../../follow/FollowContent'


function Follwers(props) {
    const [followers, setFollowers] = useState([])
    const [loading, setLoading] = useState(true)

    const userProfile = useSelector(state => state.userProfile)
    const { Profile } = userProfile

    const fetchProfileFollowers =() =>{
        const variables={
            userTo:props.profile_id,
            type:"user"
        }
        Axios.post('/api/following/followers',variables)
        .then((result)=>{
            setFollowers(result.data)
            setLoading(false)
            console.log(result.data)
        })
    }
    
    const renderFollowers = followers.map((element,index)=>{
        return <div key={index}>
        {
            <FollowContent
            element={element}
            history={props.history}
            condition="followers"
            />
        }
        </div> 
    })

    useEffect(() => {
        fetchProfileFollowers()
    })

    
    return (
        loading ? <div><LoaderDots size="medium"/></div>:
    <div className="profile-details-section">
        
    <div className="profile-details-section-header">
      <div className="profile-details-section-header-content"><h6>{followers.length} Followers</h6></div>
    </div>
    {renderFollowers}
    </div>
    )
}

export default Follwers
