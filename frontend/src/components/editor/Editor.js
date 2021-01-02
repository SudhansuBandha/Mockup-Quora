import React, { useEffect, useState } from 'react';
import { EditorState, ContentState } from 'draft-js';
import {useDispatch, useSelector} from 'react-redux'
import { Editor } from 'react-draft-wysiwyg';
import {editAnswer, postAnswer} from '../../actions/answerActions'
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './editor.css'
import ReactRoundedImage from "react-rounded-image"
import Axios from 'axios';



export default function TextEditor(props) {
        console.log(props)
        var disco=""
        if(props.type==="editing")disco=props.text
        const [editorstate, setEditorState] = useState(EditorState.createWithContent(ContentState.createFromText(disco)))
      
        let state = {
          editorState:editorstate 
        }
       const [profilepic, setProfilePic] = useState('')
        const postedAnswer = useSelector(state => state.answerPost)
       const editedAnswer = useSelector(state=>state.answerEdit)
       const user = useSelector(state=>state.userLoggedin)
       const pd=useSelector(state=>state.profileDetails)
       const {details} = pd
       const { answer } = postedAnswer
       const { editedanswer }= editedAnswer
       const {userInfo1} = user
        
        const dispatch = useDispatch()
        
        const onSubmit = ()=>{
          const text=state.editorState.getCurrentContent().getPlainText()
          const id = props.id
          if(props.type==="question")
          dispatch(postAnswer(text, id))
          if(props.type==="answer")
          dispatch(editAnswer(text,id))
        }
        const Close=()=>{
          props.onClose()
        }
        const onEditorStateChange = (editorState) => {
          setEditorState(editorState)
        };
        
        useEffect(() => {
          
        Axios.get('/api/profile/image_url/'+userInfo1.id)
        .then((res)=>{
          console.log(res.data)
          setProfilePic(res.data)
        })  
          
        })
        
        useEffect(()=>{
          if(answer)
          props.props.history.push('/')
        },[answer])
        
        useEffect(()=>{
          if(editedanswer){
          dispatch(editAnswer(null,null))
          props.props.history.push('/profile/'+userInfo1.username)
          }
        },[editedanswer])
        
          const { editorState } = state;
          return (
            <div className="editor">
              <div className="user-profile">
              <div>
              <ReactRoundedImage
            image={profilepic}
            imageWidth="36"
            imageHeight="36"
            roundedSize="0"
            />
              </div>
              <div className="user-details">
                <div className="second-flex">
                <p className="black">{userInfo1.username}</p>
                </div>
                <div>
                  <p className="details-description">{details}</p>
                </div>
            </div>  
              </div>
              <Editor
                editorState={editorState}
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
                toolbar={{
                  options: ['inline', 'list','textAlign', 'link', 'emoji', 'image'],
                  inline: {
                    inDropdown: false,
                    className: undefined,
                    component: undefined,
                    options: ['bold', 'italic', 'underline', ],
                    },
                  list: { inDropdown: true },
                  textAlign: { inDropdown: true },
                  link: { inDropdown: false,
                        options:['link'] 
                      },
                   
                }}
              />
              <div className="editor-bottom">
                <div className="editor-bottom-submit" 
                onClick={(e)=>onSubmit()}>
                  Submit
                </div>
                <div className="editor-bottom-cancel" 
                onClick={(e)=>{Close()}}>
                  Cancel
                </div>
              </div>
            </div>
          );
        }
      