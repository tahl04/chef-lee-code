import React,{useContext} from 'react'
import Detail from '../page/Detail';
import '../css/Item.scss';
import '../css/common.scss';
import Footer from './Footer';
import {Myrecipe} from './Myrecipe';
import {Link} from 'react-router-dom';

function Item() {

  
  
  const {data} = useContext(Myrecipe),
    {num} = useContext(Myrecipe),
    {setScroll} = useContext(Myrecipe);

    const saveScroll = ()=>{
      setScroll(window.scrollY);
    }

  return (
    <>
      <div className='item-wrap'>
      {
        num.length === 0
        ? <div className='empty-box'>
            <img src='https://ifh.cc/g/R9Hdfr.png'/>
          </div>
        : (num[0] === 1000 ? <div className='empty-box'>
        <img src='https://ifh.cc/g/R9Hdfr.png'/>
      </div> : num.map((obj)=>{
            return <div className='recipe'>
              <div className='r-wrap'>
                <div className='img-box'>
                  {/* <div className='like'>
                      <div className="like-btn" onClick={(e)=>e.target.classList.toggle('is-active')}/>
                  </div> */}
                  <div className='r-img' style={{backgroundImage:`url(${data[obj].mainImg})`}}/>
                </div>
                <div className='r-wrap-bottom'>
                  <div className='text-con'>
                    <h3>{data[obj].name}</h3>
                    <div className='hash-box'>
                      <span>#{data[obj].hashtag[0]}</span>
                      <span>#{data[obj].hashtag[1]}</span>
                      <span>#{data[obj].hashtag[2]}</span>
                    </div>
                  </div>
                  <Link onClick={saveScroll} to={`../detail/${data[obj].name}`} className='item-btn'>
                    레시피 보러가기
                  </Link>
                </div>
              </div>
            </div>
            
        })
        )
      }
      </div> 
      <Footer/>
    </>
  )
}

export default Item