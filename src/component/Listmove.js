import React from 'react'
import { Link } from 'react-router-dom';
import '../css/Main.scss';

function Listmove() {
    return (
        <section id='end' className='list-link' style={{backgroundImage:'url(https://ifh.cc/g/BZPbtR.jpg)'}}>
            <div className='link-wrap'>
                <h2>지금 바로 사용해보세요 !</h2>
                <Link className='list-btn' to="/list"><img src='https://ifh.cc/g/rBC2OR.png'/></Link>
            </div>
        </section>
    )
}

export default Listmove