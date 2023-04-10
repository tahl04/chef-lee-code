import React,{useContext, useEffect, useState} from 'react';
import Footer from '../component/Footer';
import {Link, useLocation} from 'react-router-dom';
import '../css/common.scss';
import '../css/Detail.scss';
import {Myrecipe} from '../component/Myrecipe';
import Top from "../component/Top";
import { addDoc, collection,doc,deleteDoc, query, onSnapshot, orderBy} from "firebase/firestore";
import { dbService } from '../fbase';

function Detail({ data, userObj }) {

  //const likeRef = useRef()
  const { pathname } = useLocation();
  const [click,setClick] = useState(false);
  const [like,setLike] = useState([]);
  const { pageNum } = useContext(Myrecipe);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  
  const onClickLike = async () => {
    setClick(true);
    const docRef = await addDoc(collection(dbService, "like"), {
      data : data.id,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
  }


  useEffect(() => {
    const q = query(
      collection(dbService, "like"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const likeArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setLike(likeArr);
    });
  }, []);

  
  
  useEffect(() => {
      if(!like.length) return;
      like.map((li)=>{
        if(userObj.uid == li.creatorId){
          if(li.data == data.id){
            setClick(true);
          }
        }
        // console.log("실행", userObj.uid, li.creatorId, li.data, data.id);
      });

     
        

  },[like])

 
    




  const onClickLikeD = async (e) => {
    setClick(false);
    const I = like.filter(like => like.data === data.id) 
    if(I){
      await deleteDoc(doc(dbService, "like", `${I[0].id}`) );
    }
  }

  
  if(!data){
    return <div className='loading-anim'> 식자재를 불러오는 중입니다...</div>
  }
  return (
    <>
      <div className='header-empty-box'/>

      <div className='detail'>
        <div className='detail-top'>
          {pageNum === 0
          ? <Link to='../list' className='back-btn'><img src='https://ifh.cc/g/wCvHr6.png'/></Link>
          : <Link to='../mypage' className='back-btn'><img src='https://ifh.cc/g/wCvHr6.png'/></Link>

          }
          
          <h1>{data.name}</h1>

          {click ? 
            <div className="like-btn is-active" onClick={(e)=>{
              onClickLikeD();
              e.target.classList.toggle('is-active');
            }}/>
          :
            <div className="like-btn" onClick={(e)=>{
              onClickLike();
              e.target.classList.toggle('is-active');
            }}/>
          }
          

        </div>
        <div className='detail-bottom'>
          <div className='main-recp' style={{backgroundImage:`url(${data.mainImg})`}}/>
          <div className='nutrient'>
            <h2>✍️ 영양정보</h2>
            <div className='n-contain'>
              <div className='d-circle light'>
                <h3>{data.tan}</h3>
                <h4>탄수화물</h4>
              </div>
              <div className='d-circle deep'>
                <h3>{data.dan}</h3>
                <h4>단백질</h4>
              </div>
              <div className='d-circle light'>
                <h3>{data.ji}</h3>
                <h4>지방</h4>
              </div>
              <div className='d-circle deep'>
                {data.na.length > 4
                  ? <h3 className='fz20'>{data.na}</h3>
                  : <h3>{data.na}</h3>
                  }
                <h4>나트륨</h4>
              </div>
            </div>
          </div>
          <div className='ingredient'>
            <h2>✍️ 재료</h2>
            {data.hashtag.length > 24 
            ? <nav className='h255'>
              {
                data.hashtag.map((obj, key)=>
                <p>{key+1}. {obj}</p>
                )
              }
            </nav> 
            : <nav className='h170'>
              {
                data.hashtag.map((obj, key)=>
                <p>{key+1}. {obj}</p>
                )
              }
            </nav>}
          </div>
          <div className='make-recp'>
            <h2>✍️ 만드는 법</h2>
            <nav>
              {
                data.make.map((obj, key)=>
                obj === "" 
                  ? <div className='none-block'/>
                  : <div className='m-r-wrap'>
                      <div className='m-r-img' style={{backgroundImage:`url(${data.makeImg[key]})`}}/>
                      <h4>0{key+1}</h4>
                      <p>{obj}</p>
                    </div>
                )
              }
            </nav>
          </div>
          <div className='link-box'>
            <div className='l-box-wrap'>
              <img src='https://ifh.cc/g/lLjTFW.png'/>
              <a href={`https://www.youtube.com/results?search_query=${data.name}+만드는+법`} target='_blank'>관련 영상 보러가기</a>
            </div>
            <div className='l-box-wrap'>
              <img src='https://ifh.cc/g/NKThC4.png'/>
              <a href={`https://www.coupang.com/np/search?component=&q=${data.hashtag[0]}&channel=user`} target='_blank'>검색 재료 장 보러가기</a>
            </div>
          </div> 
        </div>
        <Top/>
      <Footer/>
      </div>
    </>
  )
}

export default Detail