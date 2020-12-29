import React from 'react'
import ReactDom from 'react-dom'
import {useDispatch, useSelector} from 'react-redux'
import { deleteAnswer } from '../../actions/answerActions'

function DeleteAnswer({ open, onClose, props, id }) {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.userLoggedin)
    const {userInfo1} = user
    

    const Close=()=>{
        onClose()
    }
    const onDelete = () =>{
      dispatch(deleteAnswer(id))
      props.history.push('/profile/'+userInfo1.username)
    }
    
    if(!open) return null
    return (
        ReactDom.createPortal(
    <>
      <div className='overlay-modal' onClick={Close}/>
      <div className='delete-modal'>
      
        <div className="top bg-color">
          <div className="delete-modal-title">Delete Answer</div>
            
        </div>

        <div className="delete-middle">
        <h4>Do you want to delete your answer??</h4>
        <div className="delete-bottom">
        <div className="bottom-cancel-button" onClick={Close}>Cancel</div>
        <div className="bottom-delete-button" onClick={onDelete}>Delete</div>
        </div>
        <div>
        </div>
        
        </div>
        
      </div>
    </>,
    document.getElementById('portal')
    )  
    )
}

export default DeleteAnswer
