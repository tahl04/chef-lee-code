import React from 'react'
import "../css/common.css"
import {Link, useNavigate} from 'react-router-dom';
import { authService } from '../fbase';
import Swal from "sweetalert2";


const Header = ({isLoggedIn}) => {

  const navigate = useNavigate();
  
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
    Swal.fire({
      position: "center",
      icon: 'success',
      title: '로그아웃 되었습니다',
      showConfirmButton: false,
      timer: 1500
    })
  }

  return (
    <div className='header'>
      <Link to="/" className='logo-img'>
        <img src='https://ifh.cc/g/O8coTC.png'/>
      </Link>

      { isLoggedIn ? 
        <nav className='header-menu'>
          <Link to="/mypage">마이페이지</Link>
          <Link to="/" onClick={onLogOutClick}>로그아웃</Link>
        </nav>
      : 
        <nav className='header-menu'>
          <Link to="/login">로그인</Link>
          <Link to="/signup">회원가입</Link>
        </nav>
      }

    </div>
  )
}

export default Header