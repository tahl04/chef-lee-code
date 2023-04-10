import React, { useState } from 'react'
import "../css/Login.css"
import "../css/common.css"
import Footer from "../component/Footer"
import { authService } from '../fbase';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from 'firebase/auth';

//로그인 성공시 메인 화면으로 이동
const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

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
            data = await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch(error) {
            setError(" * 아이디 혹은 비밀번호가 일치하지 않습니다")
        }
    }

    //Google 로그인
    const onSocialClick = async () => {
        let provider;
        provider = new GoogleAuthProvider();
        const data = await signInWithPopup(authService, provider);
        navigate('/');
    };

    return (
        <>
        <div className='header-empty-box'/>
        <div className='login-wrap'>
            <div className='login-component'>
            <div className='chef-lee-background'>
                <img src='https://ifh.cc/g/R9Hdfr.png'/>
            </div>
                <h4>로그인</h4>
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
                    <input type="submit" 
                        //value={newAccount ? "Create Account" : "Log In"}
                        value="Log in"
                        className='submit-btn'
                    />
                    <Link to="/signup"> <b> 회원가입 </b> </Link>
                </form>
                <p style={{color:"red", fontSize:"15px"}}>{error}</p>
                <div className='google-login-btn'>
                    <button onClick={onSocialClick}>
                        <img src='https://ifh.cc/g/31gQNd.png'/>
                        <p>Google로 로그인하기</p>
                    </button>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default Login