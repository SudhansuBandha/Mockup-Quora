import React, { useEffect, useState } from 'react'
import SingleComment from './SingleComment'

function ReplyComment(props) {

    console.log(props)
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {

        let commentNumber = 0;
        props.CommentLists.map((comment) => {

            if (comment.responseToId === props.parentCommentId) {
                commentNumber++
            }
        })
        
        setChildCommentNumber(commentNumber)
    }, [props.CommentLists, props.parentCommentId])

    let renderReplyComment = (parentCommentId) =>{
    if(props.CommentLists){    
    props.CommentLists.map((comment, index) => (
        <React.Fragment>
            {comment.responseToId === parentCommentId &&
                <div style={{ width: '80%', marginLeft: '40px' }}>
                    {comment.content}
                </div>
            }
        </React.Fragment>
    ))
    }}        
        const handleChange = () => {
            setOpenReplyComments(!OpenReplyComments)
            
        }

    return (
        <div>
        {ChildCommentNumber > 0 &&
            <p style={{ fontSize: '14px', margin: 0, color: 'gray', cursor:"pointer" }}
                onClick={handleChange} >
                View replies
         </p>
        }
        
        {OpenReplyComments &&
            renderReplyComment(props.parentCommentId)
        }            
        </div>
    )
}

export default ReplyComment
