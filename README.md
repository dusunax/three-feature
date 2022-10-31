## **세 가지 기능**을 구현합니다. => 작업완료!

기능1) 무한 스크롤  
기능2) 검색  
기능3) 게시글 탭 구분  

<img src="https://user-images.githubusercontent.com/94776135/199058566-377aa8a1-5078-43da-9a15-010c1f60de45.png" style="width: 500px">

  
## **조건**은 다음과 같습니다.

조건1) React 함수형 컴포넌트를 사용  
조건2) 라이브러리 사용 지양, ex) UI 프레임워크, 유틸리티 라이브러리  

  
## 사용한 라이브러리
- @emotion/css
- typescript


## ✏️ **작업 내용**

- 작업 기간: 28일~31일(4일)
- 총 작업 시간: 27시간
- 통계: 평균 5시간 30분, 5차 진행
- 학습내용: <a href="https://dusunax.notion.site/React-01833095ea0741b9b5a9cd15fd5d9611">노션 링크 바로가기</a>
```
1) 세션 스토리지 활용
2) emotion 사용법
3) debounce & throttle 개념 정리
4) 타입스크립트 실습
```
  
## 진행 내용 기록

| 진행 | 구현 | 구현내용 |
| --- | --- | --- |
| 1차 | 뷰 및 컴포넌트 구조 | feature 페이지와 atomic 컴포넌트, emotion을 이용한 css |
| 2차 | 기능구현 및 api요청 | api요청 보내는 함수 정리, 무한스크롤 요청할 스크롤탑 위치 확인, 탭(a, b), 검색(api요청) |
| 3차 | 기능완성, 세션스토리지 | 무한스크롤 기본 기능, 검색 debounce 적용, 세션 스토리지에 현재값 보관 |
| 4차 | 버그 수정, 최종 확인 | state 재정리, 함수 정리, 기능 확인, 요구사항 충족 확인 |
| 5차 | 타입스크립트 적용 | tsx 적용하고, 관련해서 생긴 추가 버그를 수정 |


### 1차 작업 : 기본 컴포넌트 구조 및 CSS 적용 완료

작업: 10월 28일 11시 ~ 29일 3시(4시간)

![image](https://user-images.githubusercontent.com/94776135/199057126-82bbb2be-14ce-448a-a1de-61dbc5e5aee0.png)


### 2차 작업 : 기본 API 요청 및 탭, 검색 기능(각각 api요청), 게시글 상세 페이지 추가

작업: 10월 29일 3시반 ~ 9시반 (6시간)

![image](https://user-images.githubusercontent.com/94776135/199057158-010301c4-2ec6-423b-a5c4-44e9b780eabe.png)


### 3차 작업: 무한스크롤 + 디바운스, 세션 스토리지 저장 + 스크롤탑 위치, 버그 해결

작업: 10월 30일 12시~7시 (7시간)

- throttle + debounce 내용 정리
    - [x]  throttle
    - [x]  debounce
- 세션 스토리지 작업
- 상세 페이지 만들기 + 뒤로 가기 기능 구현

![image](https://user-images.githubusercontent.com/94776135/199057215-98c9572c-9502-4d8d-8431-4226d55ce88f.png)


### 4차 작업: 버그 수정(state 재정리)🤕, 최종 확인

작업: 10월 31일 12시~18시 (6시간)


#### ✏️ 버그 수정 내용

- state obj에서 단일 sate로 변경(리랜더링 관련 버그 수정)
- page 0번째 일 때 패치 두 번 적용되는 점 수정 ⇒ cleanup loaded state
- 세션 스토리지에서 값 가져오는 타이밍 관련 수정 (한 위치에서 api 요청 보내기로 변경)
- 서치가 랜더링 후, 한 번 연속적으로 작동한 다음, 작동이 안 됨
(버그 상태에서 tab도 작동이 되지 않음)

#### ✏️ 최종 확인

- [x]  사용가능 라이브러리 체크
- [x]  무한스크롤링
- [x]  onChange 검색바
    - [x]  svg아이콘 추가
- [x]  게시글 리스트 3줄 생략
- [x]  게시글 상세 페이지
    - [x]  뒤로 가기 버튼
    - [x]  클릭 시 스크롤 탑 및 검색어, 세션 스토리지 내용 화면에 반영
- [x]  150 Debounce
- [x]  A post, B post를 구분하는 탭
</aside>

### 5차 작업: 타입스크립트!

작업: 10월 31일 20시~24시 (4시간)

![image](https://user-images.githubusercontent.com/94776135/199060016-2faf43ad-b5c8-4f9b-8f7f-4241d7a03de5.png)
![image](https://user-images.githubusercontent.com/94776135/199059983-dc45e68a-339f-4fb7-8160-0e05b25da301.png)

- 코드 전체 tsx로 수정함(일부 util 제외)
    - 아직 타입스크립트가 익숙하지 않아 코드가 예쁘지 않습니다.
    App와 index파일이 tsx인 것이 신경쓰여서 atom단위부터 하나씩 바꿔봤습니다.
        - 버그가 생겨서 다시 수정하였습니다.
- 전체 작업 내용을 노션에 정리하는 중입니다.
