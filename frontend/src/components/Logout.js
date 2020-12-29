import  {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { logout } from '../actions/userActions'

function Logout(props) {
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(logout())
        setTimeout(()=>props.history.push('/'),100)
    })
     return null

}

export default Logout
