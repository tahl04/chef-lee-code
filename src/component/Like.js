import React,{useContext, useEffect, useState} from 'react';
import {Myrecipe} from './Myrecipe';
import { Link } from 'react-router-dom';
import "../css/Mypage.scss";


const Like = ({val}) => {
    
    const {setScroll} = useContext(Myrecipe);

    //like에서 creatorId 와 isOwner( "cYTXrL5LTQR4rxs3TuaIlgfCQPw1")가 
    // 일치하는 like객체를 골라내서 data의 id 와 like의 data가 같은것을 출력!
    
    return (
        <div className='recipe-wrap'>  
            {
                val.length == 0 ?
                <div className='like-list-n'>
                    <p>찜한 레시피가 없습니다</p>
                    <Link to="../list">레시피 추가하러 가기</Link>
                </div>
                :
                val.map((obj)=>{
                    return(
                        <div className='recipe-box'>
                            <Link to={`../detail/${obj.name}`}>
                            <img src={obj.mainImg}/>
                            <p className='name'>{obj.name}</p>
                            <p>#{obj.hashtag[0]} #{obj.hashtag[1]} #{obj.hashtag[2]}</p>
                            <button onClick={setScroll(0)}>레시피 보러가기</button>
                            </Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Like