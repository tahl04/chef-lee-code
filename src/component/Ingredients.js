import React, { useState, useContext } from 'react'
import { dbService } from '../fbase';
import { doc,deleteDoc, updateDoc} from "firebase/firestore"
import { Link, useNavigate } from 'react-router-dom';
import {Myrecipe} from './Myrecipe';
import Swal from "sweetalert2";
import "../css/Mypage.scss"

const Ingredients = ({ ingredientsObj, isOwner }) => {

  const {data} = useContext(Myrecipe);
  const [editing, setEditing] = useState(false);
  const [newIngredients,setIngredients] = useState(ingredientsObj.ingredients)
  const [newDate,setNewDate] = useState(ingredientsObj.date);
  const IngredientsTextRef = doc(dbService, "ingredientsG", `${ingredientsObj.id}`)
  const navigate = useNavigate();

  const onChange = (e) => {
    setIngredients(e.target.value)
  }

  const onChangeD = (e) => {
    setNewDate(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
      await updateDoc(IngredientsTextRef,{
      ingredients: newIngredients,
      date: newDate
    })
    setEditing(false);
  }

  const onDeleteClick = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: "삭제하시겠습니까?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '네!',
      cancelButtonText: '아니요',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          '삭제되었습니다!',
          deleteDoc(IngredientsTextRef)
        )
      }
    })

    
  }  

  const toggleEditing = () => setEditing((prev)=>!prev);

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="U-input">
            <input type="text" value={newIngredients} onChange={onChange} required />
            <input type="date" onChange={onChangeD}/>
            <input type="submit" value="저장"/>
            <button onClick={toggleEditing}>cancle</button>
          </form>
        </>
        ) : (
        <>
            {isOwner && (
              <div className='ingredients-list'>
                <p className='ingredients-name'>{ingredientsObj.ingredients}</p>
                <p className='ingredients-date'>{ingredientsObj.date}</p>
                <div className='ingredients-btn'>
                  <button onClick={onDeleteClick}>삭제</button>
                  <button onClick={toggleEditing}>수정</button>
                  <button onClick={()=>{
                    navigate("/list", { state : ingredientsObj.ingredients})
                  }}>레시피 검색</button>
                </div>
              </div>
            )}
          </>
        )}
    </div>
  )
}

export default Ingredients