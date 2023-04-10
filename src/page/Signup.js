import React, { useState } from 'react'
import "../css/Login.css"
import "../css/common.css"
import Footer from '../component/Footer'
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';

const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const onChange = (event) => {
        const {
            target: { name, value }
        } = event;
        if(name === "email"){
            setEmail(value);
        } else if (name === "password"){
            setPassword(value);
        }
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            const auth = getAuth();
            data = await createUserWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch(error) {
            setError(" * 아이디는 이메일형식으로, 비밀번호는 6자리 이상으로 입력해 주세요.")
        }
    }
  

    return (
        <>
        <div className='header-empty-box'/>
            <div className='login-wrap'>
                <div className='login-component'>
                <div className='chef-lee-background'>
                    <img src='https://ifh.cc/g/R9Hdfr.png'/>
                </div>
                    <h4>회원가입</h4>
                    <form onSubmit={onSubmit}>
                        <input 
                            type="text" 
                            placeholder='Email' 
                            required 
                            value={email} 
                            name="email" 
                            onChange={onChange}
                        />
                        <input 
                            type="password" 
                            placeholder='Password' 
                            required 
                            value={password} 
                            name="password" 
                            onChange={onChange}
                        />
                        <input type="submit" value="Sign up" className='submit-btn' />            
                        <p style={{color:"red", fontSize:"15px"}}>{error}</p>
                    </form>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default Signup