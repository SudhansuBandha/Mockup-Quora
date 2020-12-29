import React from 'react'
import ReactDom from 'react-dom'
import {useDispatch, useSelector} from 'react-redux'
import { deleteQuestion } from '../../actions/questionActions'

function DeleteQuestion({ open, onClose, props, id, type }) {
    const dispatch = useDispatch()
    const user = useSelector(state=>state.userLoggedin)
    const {userInfo1} = user
    

    const Close=()=>{
        onClose()
    }
    const onDelete = () =>{
      dispatch(deleteQuestion(id))
      props.history.push('/profile/'+userInfo1.username)
    }
    
    if(!open) return null
    return (
        ReactDom.createPortal(
    <>
      <div className='overlay-modal' onClick={Close}/>
      <div className='delete-modal'>
      
        <div className="top bg-color">
          <div className="delete-modal-title">Delete Question</div>
            
        </div>

        <div className="delete-middle">
        <h4>Do you want to delete your question??</h4>
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

export default DeleteQuestion
