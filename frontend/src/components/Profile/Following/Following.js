import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Axios from 'axios'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import FollowContent from '../../follow/FollowContent'

function Following(props) {
    
    const [following, setFollowing] = useState([])
    const [loading, setLoading] = useState(true)

    const userProfile = useSelector(state => state.userProfile)
    const { Profile } = userProfile

    const fetchProfileFollowing =() =>{
        const variables={
            userId:Profile._id,
            type:"user"
        }
        Axios.post('/api/following',variables)
        .then((result)=>{
            setFollowing(result.data)
            setLoading(false)
            //console.log(result.data)
        })
    }
    
    const renderFollowing = following.map((element,index)=>{
        return <div key={index}>
        {
            <FollowContent
            element={element}
            history={props.history}
            condition="following"
            />
        }
        </div> 
    })

    useEffect(() => {
        fetchProfileFollowing()
    })

    
    
    return (
        loading ? <div><LoaderDots size="medium"/></div>:
    <div className="profile-details-section">
        
    <div className="profile-details-section-header">
      <div className="profile-details-section-header-content"><h6>{following.length} Following</h6></div>
    </div>
    {renderFollowing}
    </div> 
    )
}

export default Following
