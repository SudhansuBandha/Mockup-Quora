import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {Button} from 'react-bootstrap'
import {deleteProfile, register, signin, verify_email} from '../actions/userActions'
import Cookie from 'js-cookie'


function SignIn(props){

    const [email_submit, setEmailSumbit]= useState('')
    const [password_submit, setPasswordSubmit]= useState('')
    const [uname, setUname]= useState('')
    const [repassword, setRepassword]= useState('')
    const [email_check, setEmailCheck]= useState('')
    const [password_check, setPasswordCheck]= useState('')
    const [error, setError] = useState('')
    const [submit_disable, setSubmitDisable] = useState(true)
    const [login_disable, setLoginDisable] = useState(true)

    
    const [email_login, setEmailLogin]=useState('kcb011@gmail.com')
    const [password_login, setPasswordLogin]=useState('Himansu@1')
    
    const userLoggedin = useSelector(state => state.userLoggedin)
    const userRegistered = useSelector(state => state.userRegistered)
    const verifyEmail = useSelector(state => state.verifyEmail)

    if(userLoggedin){ Cookie.set('userLoggedin', JSON.stringify(userLoggedin))
    
    if(userLoggedin.error1)  Cookie.remove('userLoggedin')
    }
    
    const checkPassword =()=>{
        if(password_submit !== repassword)
        setError("Your password didnt match")
        
        checkSubmit()

    }

    const checkSubmit=()=>{
        if(uname!=='' && email_submit!=='' && password_submit===repassword && password_check!==''  && password_check===true && email_check===true)
        setSubmitDisable(false)   
    }

    const checkLogin = () =>{
        if(email_login!=='' && password_login!=='')
        setLoginDisable(false)
    }

    const {  userInfo1, error1} = userLoggedin
    
    const {  userInfo2 } = userRegistered
     
    var { verified } = verifyEmail
    if (email_submit ==='') verified=''
    
    
    
    const dispatch = useDispatch()

    
    
    useEffect(()=>{
        dispatch(deleteProfile())
        if(userInfo2){
            Cookie.set('userLoggedin', JSON.stringify(userLoggedin))        
            dispatch(signin(email_submit, password_submit))
            props.history.push("/user/account_created")
        }
        
        
        return ()=>{}
    },[userInfo2])
    useEffect(()=>{
        
        if(userInfo1){
            props.history.push('/')
        }
        
        
        return ()=>{}
    },[userInfo1])

    const submitLoginHandeler = (e)=>{
        e.preventDefault()
        
        dispatch(signin(email_login, password_login))
    }
    function ValidateEmail() 
        {
            if(email_submit.length!==0){
            if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email_submit))
                {
                    setEmailCheck(true)
                    dispatch(verify_email(email_submit))
                }
            else{    
                setError('Please use a valid email address')
        }}}

    function ValidatePassword() 
        { 
            var paswd=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
            if(password_submit.length!==0){
            if(password_submit.match(paswd)){setPasswordCheck(true)}
            else return setError(' Your password should contain characters 7 to 15, at least one numeric digit and a special character');
        }}

    const submitRegisterHandeler= (e) =>{
        e.preventDefault()

           
        dispatch(register(uname, email_submit, password_submit))
    }

    const nullify =()=>{
        setError('')
        verified=''
    }
    return <div className="signin">
            { error ? 
            <div className="error-message">
                {error}
            </div>:<div className="error-message-none"></div>}

        <div className="signin-container">
            
            <div className="Left">
                <h4>Sign Up</h4>
                <form onSubmit={submitRegisterHandeler}>
                <div className="input-box">
                
                <input placeholder="Username" className="input-signin"
                name="uname"
                type="text"
                id="uname"
                onChange={(e)=>setUname(e.target.value)}
                onBlur={checkSubmit}
                />
                </div>
                <div className="input-box">
                
                <input placeholder="Email" 
                className="input-signin"
                name="email"
                type="email"
                id="registeremail"
                onChange={(e)=>setEmailSumbit(e.target.value)}
                onBlur={ValidateEmail}
                onFocus={nullify}
                />
                {  (verified) ? <div  className="form-error-message">{verified.errormessage}</div>: <div></div>}                
                </div>
                <div className="input-box">
                
                <input placeholder="Password" 
                className="input-signin"
                name="password"
                type="password"
                id="registerpassword"
                onChange={(e)=>setPasswordSubmit(e.target.value)}
                onBlur={ValidatePassword}
                onFocus={nullify}
                />
                </div>
                <div className="input-box">
                
                
                <input placeholder="Re-Enter Password"
                className="input-signin" 
                name="repassword"
                type="password"
                id="repassword"
                onChange={(e)=>setRepassword(e.target.value)}
                onBlur={checkPassword}
                onFocus={nullify}
                />
                </div>
                <Button type="submit" className="signup-button" disabled={submit_disable}>Submit</Button>
                </form>
            </div>
            
            
            <div className="Right">
            <h4>Login</h4>
            <form onSubmit={submitLoginHandeler}>
            <input placeholder="Email" className="input-signin"
            name="email"
            value={email_login}
            type="email"
            id="loginemail"
            onChange={(e)=>setEmailLogin(e.target.value)
            }
            />
            <input placeholder="Password" className="input-signin"
                name="password"
                value={password_login}
                type="password"
                id="loginpassword"
                onChange={(e)=>setPasswordLogin(e.target.value)}
                onBlur={checkLogin}                
            />
            <Link to="">Forgot Password?</Link>
            <div className="login-button">
            <Button type="submit" variant="success">Login</Button>
            </div>
            {error1? 
                <div className="form-error-message">Please try to login with a valid Email ID or Password</div>
                :<div></div>
            }
            
            </form>
            </div>
        </div>
    </div>

}

export default SignIn