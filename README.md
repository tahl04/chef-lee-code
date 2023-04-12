# 🥦🍅🥬 냉장고 속 갖가지 레시피 Chef Lee 🧅🧄🥔

![banner](https://velog.velcdn.com/images/daun/post/ef43a2d9-cb0c-4a32-b647-1a5fe566f9d3/image.png)

<br>

## 🌱 프로젝트 소개및 제작 계기
냉장고를 관리해주는 어플로 재료를 쉽고 편리하게 관리 할 수 있고, 냉장고 속 재료로 만들 수 있는 음식의 조리법, 영양 성분에 관한 자료를 제공해주는 모바일 전용 사이트입니다.

React를 기반으로 한 프로젝트를 만들기로 했습니다.
외부의 api를 받아와 프로젝트를 만들고 싶다는 생각이 들어 무료 api자료들을 찾아보던 중 식품의약품안전처에서 제공하는 조리식품의 레시피DB라는 api를 찾게 되어 요리 레시피 관련 프로젝트를 구상했습니다.
요리 관련 웹사이트 아이디어 구상 중에 자취할때 요리를 해 먹으려 사놓은 재료들을 다 쓰지 않은 채로 아깝게 버려지던 생각이 나서,특정 재료만을 입력하여 만들 수 있는 요리 레시피를 보여주는 웹사이트를 만들어야겠다고 생각했습니다. 그렇게 자취생들과 주부를 대상으로 한 CHEF LEE 라는 웹 사이트를 기획하였습니다. 여기서 CHEF LEE의 뜻은 저와 팀원 어머니의 이름 성씨에서 따왔고, 엄마가 해주던 맛있는 음식이라는 뜻을 품고 있습니다.


<br>

## ☘️ 주요기능

#### 🔐 firebase서버를 통한 로그인

- fairebase/auth를 사용하여 세션을 관리하였고, 구글 아이디를 통하여 로그인도 가능하도록 구현하였습니다.

#### 📧 정규식

- 서버에 부하가 일어나지 않기 위해, 사용하는 데이터만 최소화 하여 가져오고 또한 정규식을 사용하여 문자들의 균일화를 해서 다듬은 데이터들을 변수로 담아 프로젝트 전역에서 사용하였습니다.

#### ✔ 파라미터를 통한 링크 이동
- 각 버튼을 클릭하여 해당 음식의 조리법, 해당 음식의 재료를 살 수 있는 페이지로 이동합니다.

#### ❤️ 레시피 찜

- 마음에 드는 레시피를 저장할 수 있습니다.

#### 📱 재료 관리

- 냉장고의 남은 재료들과 유통기한을 입력하여 관리할 수 있고, 해당 재료가 포함된 레시피를 보러 갈 수 있습니다.

#### 🪄 스크롤 저장

- 페이지 이동 전 위치값을 저장하여 뒤로가기 버튼 클릭 시 위치값을 기억하여 불러드립니다.
<br>

## 🔨 기술스택

### **Tech**

<p>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"/>
<img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=white"/>
<br>
</p>

### **Design**
<p>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"/>
</p>

### **Tools**

<p>
<img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white"/>
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white"/>
<img src="https://img.shields.io/badge/Github-181717?style=for-the-badge&logo=github&logoColor=white">
<br>
</p>

<br>

<br/>

## 🔥 Trouble shooting
<details>
<summary><strong> issue1: 페이지 전환 시 애니메이션 및 스크롤 오류 </strong></summary>

#### 🙁 situation

- 메인 페이지에 있는 스크롤에 의한 애니메이션이 페이지 전환이 있고, 다시 복귀하였을 때 다시 애니메이션이 일어나지 않았다.이유는 페이지 이동을 하면서 나의 초기 스크롤 위치를 설정해주는 함수가 작동하지 않아서 였다.

#### 🚥 solution

- useLocation을 이용하여 페이지가 재할당 되었을 시 함수를 다시 실행하게 하여, 문제 없이 사용 할 수 있었다.
</details>
<details>
<summary><strong> issue2: 배포 환경 </strong></summary>

#### 🙁 situation

- 리엑트는 오로지 js형식으로 만들어지기 때문에, 그냥 작성한 코드만을 올리면 배포가 되지 않았던 걸 몰랐다. 찾아본 결과 컴파일 작업이 필요하다는 것을 알게 되었다.

#### 🚥 solution

- 빌드하는 과정에 대해 공부하여 컴파일 하였고, 변환한 html로 깃허브 레파지토리에 업로드 하였다.
</details>



<br></br>
## 🌸 와이어프레임

[💾 와이어프레임](https://www.figma.com/file/CDKNOSVNT8V3OlYs3LGKxf/%EB%83%89%EC%9E%A5%EA%B3%A0?node-id=0-1&t=sGMlded8uHaRp1ZE-0)

<br></br>
