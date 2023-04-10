import React,{useEffect, useContext} from 'react'
import '../css/common.scss';
import '../css/Main.scss';
import { Link } from 'react-scroll';
import Listmove from '../component/Listmove';
import { useLocation } from "react-router-dom";
import {Myrecipe} from '../component/Myrecipe';


function Main() {
  
  const { pathname } = useLocation();
  const {setScroll} = useContext(Myrecipe);



  useEffect(() => {
    //main에서 list 이동 시 scrollTop 을 0으로 주어 검색에 용이 하게 셋팅
    setScroll(0);
    window.scrollTo(0, 0);
    var windowWidth = window.matchMedia("screen and (max-width: 768px)");

    if (windowWidth.matches) {

    } else {
      const scrollElements = document.querySelectorAll(".scrolls");
    const elementInView = (el) => {   
      const elementTop = el.getBoundingClientRect().top+700;
      return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / 1
      );
    };
    const elementOutofView = (el) => {
      const elementTop = el.getBoundingClientRect().top+850;
      return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
      );
    };
    const hideScrollElement = (select) => {
      select.classList.remove("scrolled");
    };
    const displayScrollElement = (select) => {
      select.classList.add("scrolled");
    };
    const handleScrollAnimation = () => {
      scrollElements.forEach((obj) => {
        if (elementInView(obj, 1.25)) {
          displayScrollElement(obj);
        } else if (elementOutofView(obj)) {
          hideScrollElement(obj)
        }
      })
    }
    window.addEventListener("scroll", () => { 
      handleScrollAnimation();
    });
    }

    //스크롤 채팅 이벤트
    const scrollElements = document.querySelectorAll(".scrolls");
    const elementInView = (el) => {   
      const elementTop = el.getBoundingClientRect().top+700;
      return (
        elementTop <= (window.innerHeight || document.documentElement.clientHeight) / 1
      );
    };
    const elementOutofView = (el) => {
      const elementTop = el.getBoundingClientRect().top+850;
      return (
        elementTop > (window.innerHeight || document.documentElement.clientHeight)
      );
    };
    const hideScrollElement = (select) => {
      select.classList.remove("scrolled");
    };
    const displayScrollElement = (select) => {
      select.classList.add("scrolled");
    };
    const handleScrollAnimation = () => {
      scrollElements.forEach((obj) => {
        if (elementInView(obj, 1.25)) {
          displayScrollElement(obj);
        } else if (elementOutofView(obj)) {
          hideScrollElement(obj)
        }
      })
    }
    window.addEventListener("scroll", () => { 
      handleScrollAnimation();
    });
  }, [pathname]);

  return (
    <>
      <div className='m-wrap'>
      <div className='header-empty-box'/>
        
        <section className='main-title' style={{backgroundImage: 'url(https://ifh.cc/g/BSdkC0.jpg)'}}>
          <img src='https://ifh.cc/g/ljrKFX.png'/>
        </section>

        <section className='main-app'>
          <div className='a-wrap'>
            <div className='a-img-wrap'>
              <div className='app-box'>
                <img src='https://ifh.cc/g/wTRhYV.jpg'/>
              </div>
              <div className='app-box'>
                <img src='https://ifh.cc/g/HWVkWq.jpg'/>
              </div>
              <div className='app-box'>
                <img src='https://ifh.cc/g/q0JLFc.jpg'/>
              </div>
            </div>
            <div className='a-text-box'>
              <h2>손 안에 작은 셰프 <span>셰프리</span></h2>
              <p>내게 필요한 갖가지 레시피 정보부터,</p>
              <p>나만의 냉장고까지 관리해 보세요.</p>
              <Link className='end-hight' to="end" spy={true} smooth={false}><img src='https://ifh.cc/g/RtpbWc.png'/></Link>
            </div>
          </div>
        </section>

        <section className='scroll-chat'>
          <div className='s-wrap'>
            <div className='s-text-box'>
              <h2><span>CHEF LEE</span> IS FREE !</h2>
              <p>남녀노소, 가정 주부, 자취생등등</p>
              <p>모두에게 편리한 정보를 제공합니다.</p>
              <Link className='end-hight' to="end" spy={true} smooth={false}><img src='https://ifh.cc/g/RtpbWc.png'/></Link>
            </div>
            <div className='chat-box'>
              <div className='phone' style={{backgroundImage:'url(https://ifh.cc/g/3MX3cY.png)'}}>
              </div>
            </div>
          </div>
          <div className='s-wrap'>
            <div className='s-text-box'>
              <h2><span>CHEF LEE</span> IS FREE !</h2>
              <p>남녀노소, 가정 주부, 자취생등등</p>
              <p>모두에게 편리한 정보를 제공합니다.</p>
              <Link className='end-hight' to="end" spy={true} smooth={false}><img src='https://ifh.cc/g/RtpbWc.png'/></Link>
            </div>
            <div className='chat-box'>
              <div className='phone' style={{backgroundImage:'url(https://ifh.cc/g/3MX3cY.png)'}}>
                <img className='chat1' src='https://ifh.cc/g/7CSLGa.png'/>
                <img className='imo' src='https://ifh.cc/g/ahZft0.gif'/>
                <img className='chat2' src='https://ifh.cc/g/G2Gbwq.png'/>
                <img className='chat3' src='https://ifh.cc/g/qc50Oc.png'/>
              </div>
            </div>
          </div>
          <div className='s-wrap scrolls'>
            <div className='s-text-box'>
            </div>
            <div className='chat-box'>
              <div className='phone'>
                <img className='chat1' src='https://ifh.cc/g/7CSLGa.png'/>
              </div>
            </div>
          </div>
          <div className='s-wrap scrolls'>
            <div className='s-text-box'>
            </div>
            <div className='chat-box'>
              <div className='phone'>
                <img className='imo' src='https://ifh.cc/g/ahZft0.gif'/>
                <img className='chat2' src='https://ifh.cc/g/G2Gbwq.png'/>
              </div>
            </div>
          </div>
          <div className='s-wrap scrolls'>
            <div className='s-text-box'>
            </div>
            <div className='chat-box'>
              <div className='phone'>
                <img className='chat3' src='https://ifh.cc/g/qc50Oc.png'/>
              </div>
            </div>
          </div>
          <div className='s-wrap'>
          </div>
          <div className='s-wrap'>
          </div>
        </section>
        { 
        //Link태그가 곂치기 때문에 컨포넌트로 분리
        }
        <Listmove/>

      </div>

    </>
  )
}

export default Main