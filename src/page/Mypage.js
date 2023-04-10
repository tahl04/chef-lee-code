import React, { useContext, useState, useEffect } from 'react';
import "../css/Mypage.scss";
import "../css/common.scss"
import { dbService } from '../fbase';
import { addDoc, collection, query, onSnapshot, orderBy} from "firebase/firestore";
import { Link, useLocation } from 'react-router-dom';
import Footer from '../component/Footer';
import Ingredients from '../component/Ingredients';
import Like from '../component/Like';
import {Myrecipe} from '../component/Myrecipe';



const Mypage = ({ userObj }) => {
    
  
  const { pathname } = useLocation();
  const {data, setPageNum} = useContext(Myrecipe);
  const [ingredients,setIngredients] = useState("");
  const [date,setDate] = useState("");
  const [ingredientsG,setIngredientsG] = useState([]);
  const [like,setLike] = useState([]);
  const val = [];

  useEffect(() => {
    setPageNum(1);
    window.scrollTo(0, 0);
  }, [pathname]);

  
  const likeData = like.map((like)=>{    
    if(like.creatorId == userObj.uid){
      return like.data 
    }
  });   

  data.filter((obj)=>{
    return likeData.map((obj1)=> {
        if(obj.id === obj1){
            val.push(obj);
        }
    })
  })

  //재료 R
  useEffect(() => {
    const q = query(
      collection(dbService, "ingredientsG"),
      orderBy("createdAt", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const ingredientsArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setIngredientsG(ingredientsArr);
    });
  }, []);


  //좋아요 R
  useEffect(() => {
    const p = query( 
        collection(dbService, "like"),
        orderBy("createdAt", "desc")
    );
    onSnapshot(p, (snapshot) => {
    const likeArr = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
    }));
    setLike(likeArr);
    
  });
  }, []);
  
  console.log(like);

  //재료저장 C
  const onSubmit = async (e) => {
    e.preventDefault();
    const docRef = await addDoc(collection(dbService, "ingredientsG"), {
      ingredients : ingredients,
      date: date,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setIngredients("");
  };

  const onChange = (event) => {
    setIngredients(event.target.value)
  } 

  const onChangeD = (event) => {
    setDate(event.target.value)
  } 
  




  return (
    <>
      <div className='header-empty-box'/>
      <div className='my-wrap'>
        <h4>Mypage</h4>

        <div className='mypage-bar'>
          <img src='https://ifh.cc/g/mJxoqp.png'/>
        </div>

        <Like val={val}/>
         
        <div className='mypage-bar'>
          <img className='img2' src='https://ifh.cc/g/RGFbrV.png'/>
        </div>

        <form onSubmit={onSubmit}>
          <div className='input'>
            <p>재료</p>
            <input value={ingredients} onChange={onChange} type="text" placeholder="재료" maxLength={30}/>
          </div>
          <div className='input'>
            <p>유통기한</p>
            <input type="date" onChange={onChangeD}/>
          </div>
          <input type="submit" value="저장"/>
        </form>

        <div>
          {
            ingredientsG.length == 0 
            ? 
              <p className="ingredients-list-n">
                냉장고가 비었습니다
              </p>
            :
            <>
              {ingredientsG.map((ingredients) => (
                <Ingredients key={ingredients.id} ingredientsObj={ingredients} isOwner={ingredients.creatorId == userObj.uid}/>
              ))}
            </>
          }
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default Mypage