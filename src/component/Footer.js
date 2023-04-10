import React from 'react'
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
        <Link to="/" className='logo-img-footer'>
            <img src='https://ifh.cc/g/O8coTC.png'/>
        </Link>
        <div className='footer-t'>
            <p>email : neukhyojong@naver.com</p>
            <p>daun1309@gmail.com</p>
            {/* <p>github : https://github.com/tahl04</p> */}
        </div>
    </div>
  )
}

export default Footer