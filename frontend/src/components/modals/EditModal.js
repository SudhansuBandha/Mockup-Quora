import React, {useState} from 'react'
import ReactDom from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from 'react-redux'
import { editQuestion } from '../../actions/questionActions';
import { LoaderDots } from '@thumbtack/thumbprint-react'


export default function EditModal({ open, onClose, props, textvalue, id }){
   
    const dispatch = useDispatch()
    /* For Editor */
    
    const {loading, question } = useSelector(state=>state.questionsEdit)
    const {userInfo1} = useSelector(state=>state.userLoggedin)
    const [textAreaValue, setTextAreaValue] = useState('')
    
    

    
    /*------------*/
    const Close=()=>{
      
      onClose()
      if(question)
      props.history.push('/profile/'+userInfo1.username)
    }
    
    const postQuestion = (e) =>{
        e.preventDefault()
        const question=textAreaValue
        dispatch(editQuestion(question, id))
    }
    
    if(!open) return null
    
    var FT = <FontAwesomeIcon icon={faTimes}/>

    return ReactDom.createPortal(
    <>
      <div className='overlay-modal' onClick={Close}/>
      <div className='style-modal'>
      
        <div className="top bg-color">
          <div className="modal-title">Edit Question</div>
          <div className="close" onClick={Close}>{FT}</div>
        </div>

        <div className="middle">
        {
          loading ? <div><LoaderDots size="small"/></div>:
          question ? <div className="middle-content">
          
          Edited Successfully
          
          </div>:
        
        <div>
        <div className="middle-content">
        <textarea type="text" 
        className="middle-content-input" 
        defaultValue={textvalue}
        onChange={((e)=>setTextAreaValue(e.target.value))}
        rows={5}
        />
        </div>
          </div>
        }
        </div>
        <div className="bottom bg-color">
          <div className=" bottom-cancel" onClick={Close}>Cancel</div>
          { loading ? null:
            (question)?null:
            <div 
            className="bottom-add-question link-blue"
            onClick={postQuestion}
            >Edit </div>
            
          }
          
        </div>
      </div>
    </>,
    document.getElementById('portal')
    )  
}