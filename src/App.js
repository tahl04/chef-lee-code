
import './css/common.scss';
import {useState, useRef, useEffect} from 'react';
import {Link,BrowserRouter,Route, Routes} from 'react-router-dom';
import {authService} from "./fbase";
import Main from "./page/Main"
import List from "./page/List"
import Login from './page/Login';
import Detail from './page/Detail';
import Signup from './page/Signup';
import Header from './component/Header';
import Footer from './component/Footer';
import Mypage from './page/Mypage';
import {Myrecipe} from './component/Myrecipe';

function App() {

  // api 파라미터 구조 정리
  // http://openapi.foodsafetykorea.go.kr/api/인증키/서비스명/요청파일타입/요청시작위치/요청종료위치


  

  /**api 링크*/
  const tahl = "https://openapi.foodsafetykorea.go.kr/api/fb1bb5a1586a4caa8676/COOKRCP01/json/1/999";
  


  /*
    [{
      id = 고유번호 
      name = 요리이름 
      cook = 요리방법(끓이기,찌기...) 
      mainImg = 메인 이미지 
      tan,dan,ji,na = 영양소
      yul = 열량(칼로리)
      item = 요리재료 
      v = 분류(반찬,후식...)
      make1~20 = 만드는 법(text)
      makeImg1~20 = 만드는 법(img)
    }]
  */

    //reset filter 초기값
  const [ulBox, setUlBox] = useState("----"),
    hate = useRef();
    
  const [data, setData] = useState([]),
    [serchTxt, serchChange] = useState([]),
    [num, setNum] = useState([]),
    [pageNum, setPageNum] = useState(0),
    [hateFilter, setHate] = useState([]),
    elInput = useRef();

  //list.js 스크롤 값을 저장하기위한 변수
  const [remScroll, setScroll] = useState(0);


  const [init, setInit] = useState(false);  //초기화되지 않은 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false); //로그인x=null //로그인 여부 판단
  const [userObj, setUserObj] = useState(null);

  useEffect(()=>{ 
    //사용자의 로그인 상태변화를 감지하는 메소드 onAuthStateChanged()
    authService.onAuthStateChanged((user)=> {
      if(user){
        setIsLoggedIn(true);
        setUserObj(user);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  },[])

  console.log(userObj);

  useEffect(() => {
    fetch(tahl, {
        headers: {
          Accept: "application / json",
        },
        method: "GET",
      })
      .then((a) =>  a.json())
      .then((recipe) => {
        const reg = /([가-힣]{1,10}[ ][가-힣]{1,10}|[가-힣]{1,10})/g
        let rcp = recipe.COOKRCP01.row.map((obj,key)=>{
          return {
            id:key,
            hashtag:obj.RCP_PARTS_DTLS.replace(/인분|컵|송송 썬|불린 것|줄기부분|삶은것|주재료|주 재료|육수|마른것|양념|다진|부순|뿌리|으깬|데친|두 가지 색|재료|갈은것|다진것|개|적당량|소스|소스소개/g, "").replace(/로즈마리/g, "셰프리").replace(/마리/g, "").replace(/셰프리/g, "로즈마리").replace(/낙지 다리/g, "낙지").replace(/두부강된장 참기름/g, "강된장").replace(/파인애플 통조림/g, "파인애플").match(reg),
            name:obj.RCP_NM, cook:obj.RCP_WAY2, mainImg:obj.ATT_FILE_NO_MAIN, tan:obj.INFO_CAR+"g", dan:obj.INFO_PRO+"g", ji:obj.INFO_FAT+"g", na:obj.INFO_NA+"mg",yul:obj.INFO_ENG, item:obj.RCP_PARTS_DTLS, v:obj.RCP_PAT2, 
            make:[obj.MANUAL01.replace(/1./g, ""),obj.MANUAL02.replace(/2./g, ""),obj.MANUAL03.replace(/3./g, ""),obj.MANUAL04.replace(/4./g, ""),obj.MANUAL05.replace(/5./g, ""),obj.MANUAL06.replace(/6./g, ""),obj.MANUAL07.replace(/7./g, ""),obj.MANUAL08.replace(/1./g, "")],
            // make2:obj.MANUAL02, make3:obj.MANUAL03, make4:obj.MANUAL04, make5:obj.MANUAL05, make6:obj.MANUAL06, make7:obj.MANUAL07, make8:obj.MANUAL08, 
            // make9:obj.MANUAL09, make10:obj.MANUAL10, make11:obj.MANUAL11, make12:obj.MANUAL12, make13:obj.MANUAL13, make14:obj.MANUAL14, make15:obj.MANUAL15, make16:obj.MANUAL16, make17:obj.MANUAL17, make18:obj.MANUAL18, make19:obj.MANUAL19, make20:obj.MANUAL20,
            makeImg:[obj.MANUAL_IMG01,obj.MANUAL_IMG02,obj.MANUAL_IMG03,obj.MANUAL_IMG04,obj.MANUAL_IMG05,obj.MANUAL_IMG06,obj.MANUAL_IMG07,obj.MANUAL_IMG08]
            // makeImg2:obj.MANUAL_IMG02, makeImg3:obj.MANUAL_IMG03, makeImg4:obj.MANUAL_IMG04, makeImg5:obj.MANUAL_IMG05, makeImg6:obj.MANUAL_IMG06, makeImg7:obj.MANUAL_IMG07, makeImg8:obj.MANUAL_IMG08, 
            // makeImg9:obj.MANUAL_IMG09, makeImg10:obj.MANUAL_IMG10, makeImg11:obj.MANUAL_IMG11, makeImg12:obj.MANUAL_IMG12, makeImg13:obj.MANUAL_IMG13, makeImg14:obj.MANUAL_IMG14, makeImg15:obj.MANUAL_IMG15, makeImg16:obj.MANUAL_IMG16, makeImg17:obj.MANUAL_IMG17, makeImg18:obj.MANUAL_IMG18, makeImg19:obj.MANUAL_IMG19, makeImg20:obj.MANUAL_IMG20
          };
        })
        setData(rcp);

      });
  }, []);


  //List.js 에서 input입력시 발생
  console.log(pageNum);
  
  const serch = (e)=>{
    let arr = [];
    e.preventDefault();
    if(!elInput.current.value){
      //아무것도 입력하지 않았을 때, 가지고 있는 레시피 999개보다 많은 수인 1000을 넣어 특정 이벤트 발생 -> Item.js, List.js 에서 사용
      arr.push(1000)
    }else{
      data.map((obj, key)=>{
        try{
          obj.hashtag.forEach((objs)=>{
            if(objs === elInput.current.value){
              arr.push(key);
            }
          })
        }catch{}
      })
    }
    setNum(arr);
    serchChange(elInput.current.value);
    elInput.current.value = '';
    elInput.current.focus();
  };

  const hates = (e) => {
    setUlBox(e.target.innerText);
    hate.current.classList.toggle('active');
    let arr1 = [];
    e.preventDefault();
  }

  return (
    <div className='cheflee'>
      <div className='main-bg' style={{backgroundImage:'url(https://ifh.cc/g/VR2NNw.png)'}}/>
      <div className='web-title'>
        <h1>CHEF LEE</h1>
        <p>*본 서비스는 모바일 환경에 최적화 되어 있습니다</p>
      </div>
      <div className="chef-app">
        <BrowserRouter>
          <Myrecipe.Provider value={{data:data, setData:setData,serchTxt:serchTxt, num:num, serch:serch, elInput:elInput, remScroll:remScroll, setScroll:setScroll, hates:hates, hate:hate, ulBox:ulBox, setPageNum:setPageNum, pageNum:pageNum}}>
            
          <Header isLoggedIn={isLoggedIn}/>
          {/* <div className='header-wraps'> */}
          {/* </div> */}
          <main>
            <Routes>
              <Route exact path="/cheflee" element={<Main/>} />
              <Route exact path="/" element={<Main/>} />
              <Route path="/list" element={<List/>} />
              {
                //999개의 레시피 페이지 생성 작업 (헤쉬를 쓰지 않은 이유 detail 정보에 해당 레시피 값 이외에 객체들이 들어와서 list -> detail 페이지 전환속도가 늦어짐)
                data.map((obj)=>{
                  return <Route path={`/detail/${obj.name}`} element={<Detail data={obj} userObj={userObj}/>}/>
                })
              }
              <Route path="/detail" element={<Detail/>} />
              <Route path="/login" element={<Login isLoggedIn={isLoggedIn}/>} />
              <Route path="/signup" element={<Signup isLoggedIn={isLoggedIn}/>} />
              <Route path="/mypage" element={<Mypage userObj={userObj}/>} />
            </Routes>
          </main>
              </Myrecipe.Provider>
          <Routes>
            <Route path="/" element={<Footer/>} />
          </Routes>
        </BrowserRouter>
    </div>
    </div>
  );
}

export default App;
