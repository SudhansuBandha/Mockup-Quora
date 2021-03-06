import React, {useState} from 'react'
import ReactDom from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {useDispatch, useSelector} from 'react-redux'
import { LoaderDots } from '@thumbtack/thumbprint-react'
import { update } from '../../actions/userActions'


export default function EditEmailModal({ open, onClose, props, textvalue }){
   
    const dispatch = useDispatch()
    /* For Editor */
    
    const {loading, UpdatedProfile} = useSelector(state=>state.userUpdate)
    const [textAreaValue, setTextAreaValue] = useState('')
    
    

    
    /*------------*/
    const Close=()=>{
      
      onClose()
      console.log(UpdatedProfile)
      if(UpdatedProfile)
      props.history.push('/')
      dispatch(update(""))
    }
    
    const postEmail = (e) =>{
        e.preventDefault()
        const props={
          email:textAreaValue,
          type:"email"
        }
        dispatch(update(props))
    }
    
    if(!open) return null
    
    var FT = <FontAwesomeIcon icon={faTimes}/>

    return ReactDom.createPortal(
    <>
      <div className='overlay-modal' onClick={Close}/>
      <div className='style-modal'>
      
        <div className="top bg-color">
          <div className="modal-title">Edit Email-ID</div>
          <div className="close" onClick={Close}>{FT}</div>
        </div>

        <div className="middle">
        {
          loading ? <div><LoaderDots size="small"/></div>:
          UpdatedProfile ? <div className="middle-content">
          
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
            (UpdatedProfile)?null:
            <div 
            className="bottom-add-question link-blue"
            onClick={postEmail}
            >Edit </div>
            
          }
          
        </div>
      </div>
    </>,
    document.getElementById('portal')
    )  
}