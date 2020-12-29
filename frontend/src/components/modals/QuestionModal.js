import React, {useState} from 'react'
import ReactDom from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from 'react-redux'
import { registerQuestion } from '../../actions/questionActions';
import { LoaderDots } from '@thumbtack/thumbprint-react'


export default function QuestionModal({ open, onClose }){
   
  
  
  
  const dispatch = useDispatch()
    const [textAreaValue, setTextAreaValue]=useState('')    
    
    
    
    const postedQuesiton = useSelector(state => state.questionPost)
    let {  loading, question } = postedQuesiton
    
    
    /*------------*/
    const Close=()=>{
            
      onClose()
        
      question=null
    
      dispatch(registerQuestion(question))
    }
    
    const askQuestion=()=>{
      question=null
      dispatch(registerQuestion(question))
    }
    const postQuestion = (e) =>{
        const question=textAreaValue        
        dispatch(registerQuestion(question))
    }

    
    

    if(!open) return null

    var FT = <FontAwesomeIcon icon={faTimes}/>
    return ReactDom.createPortal(
    <>
      <div className='overlay-modal' onClick={Close}/>
      <div className='style-modal'>
      
        <div className="top bg-color">
          <div className="modal-title">Add Question</div>
          <div className="close" onClick={Close}>{FT}</div>
        </div>

        <div className="middle">
        {
          loading ? <div><LoaderDots size="small"/></div>:
          question ? <div className="middle-content">
          
          Posted Successfully
          
          </div>:
        
        <div>
        <div className="middle-content">
        <textarea type="text" 
        className="middle-content-input" 
        placeholder="Enter Your Question"
        onChange={(e)=>setTextAreaValue(e.target.value)}
        rows={5}
        />
        </div>
          </div>
        }
        </div>
        <div className="bottom bg-color">
          <div className=" bottom-cancel" onClick={Close}>Cancel</div>
          { loading ? null:
            (question)?<div 
            className="bottom-add-question link-blue"
            onClick={askQuestion}
            >Another Question</div>:
            <div 
            className="bottom-add-question link-blue"
            onClick={postQuestion}
            >Add Question</div>
            
          }
          
        </div>
      </div>
    </>,
    document.getElementById('portal')
    )  
    }