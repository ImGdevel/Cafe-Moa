# CafeMoa

"카페 모아"는 카페 좌석 예약 애플리케이션입니다! 카페 모아를 통해 쉽게 원하는 카페의 좌석을 예약할 수 있습니다. 
긴 대기 줄에 서거나 좌석을 찾기 힘들어하는 번거로움은 이제 그만! 
앱을 다운로드하고 원하는 카페를 선택하고, 원하는 시간대를 선택하면 몇 번의 간단한 탭만으로 좌석을 예약할 수 있습니다. 
"카페 모아"와 함께 아늑하고 편안한 카페 경험을 즐겨보세요! ☕️
</br>

## 목차
- [기술](##기술)
- [기여](##기여)
- [기능](##기능)
- [설치](##설치)
- [라이센스](##라이센스)

</br>

## 기술

| 분야        | 기술           |
| ----------- | -------------- |
| Frontend    | React Native   |
| Backend     | Spring Boot    |
| AuthService | Firebase       |
| Database    | MariaDB        |

</br>

## 기여
김성진 https://github.com/ksj000625 </br>
우승화 https://github.com/ImGdevel <br>
장난영 https://github.com/warmzer0 </br>
정유나 https://github.com/eunaJ </br>

</br>

## 기능
1. 카페 검색: 사용자는 지도를 통해 주변의 카페를 검색할 수 있습니다. 또는 원하는 위치나 특정 카페 이름으로 검색할 수도 있습니다.
2. 좌석 예약: 선택한 카페에서 빈 좌석을 확인하고, 원하는 시간대에 좌석을 예약할 수 있습니다. 이를 통해 사용자들은 미리 자리를 확보할 수 있어 카페 방문 시간을 더 효율적으로 활용할 수 있습니다.
3. 메뉴 및 리뷰 확인: 카페의 메뉴와 다른 사용자들의 리뷰를 볼 수 있어, 방문 전에 어떤 메뉴를 주문할지 결정하거나 카페의 분위기와 서비스를 파악할 수 있습니다.
4. 프로필 관리: 사용자들은 개인 프로필을 생성하고 관리할 수 있습니다. 이를 통해 예약 기록과 리뷰를 남기거나 나만의 카페 찜 목록을 만들 수도 있습니다.
5. 알림 기능: 예약한 시간이 다가올 때 사용자에게 알림을 보내줍니다.


</br>

<div style="display: flex; justify-content: space-between;">
    <img src="https://github.com/user-attachments/assets/a895c43c-b95f-453b-b9f1-4446c7293521" alt="이미지 1" width="108" height="228">
    <img src="https://github.com/user-attachments/assets/e9e74306-c564-4225-9242-3bf7ec749645" alt="이미지 2" width="108" height="228">
    <img src="https://github.com/user-attachments/assets/0d726e78-13b1-4b86-804c-e1580a310f28" alt="이미지 3" width="108" height="228">
    <img src="https://github.com/user-attachments/assets/790bb962-2b93-4cfa-bfbf-ff751f8aba7c" alt="이미지 4" width="108" height="228">
    <img src="https://github.com/user-attachments/assets/d5490aca-df3e-4e9e-93ad-af078475a3c5" alt="이미지 4" width="108" height="228">
</div>


## 설치

### 요구 사항
- Node.js (v18 이상)
- npm 또는 yarn
- Java (v17 이상)
- MariaDB

</br>

### 클론 및 설치
프로젝트를 클론하고 필요한 의존성을 설치하는 방법을 설명합니다.

```bash
# 리포지토리를 클론합니다
git clone https://github.com/사용자이름/CafeMoa.git
```
</br>

###프론트엔드 설치 및 실행
```bash
# 프론트엔드 디렉토리로 이동합니다
cd frontend-refactoring

# 필요한 의존성을 설치합니다
npm install
# 또는
yarn install

# 개발 서버를 실행합니다
npm start
### 또는
```bash
yarn start
```
</br>

###백엔드 설치 및 실행
```
# 백엔드 디렉토리로 이동합니다
cd ../backend

# 필요한 의존성을 설치합니다
./mvnw clean install

# 백엔드 서버를 실행합니다
./mvnw spring-boot:run
```

</br>

###환경 설정
프로젝트를 실행하기 전에 필요한 환경 설정 파일(.env 등)을 설정하는 방법을 설명합니다.
###프론트 엔드 .env 파일 설정
```.env
    REACT_APP_API_URL='backend server url'
    REACT_APP_FIREBASE_API_KEY= 'firebase api key'
    REACT_APP_FIREBASE_DOMAIN= 'firebase domain'
    REACT_APP_FIREBASE_PROJECT='firebase project id'
    REACT_APP_FIREBASE_STOTAGE_BUCKET='firebase stotage_bucket'
    REACT_APP_FIREBASE_MSG_SENDER='firebase massage sender'
    REACT_APP_FIREBASE_API_ID='firebase api id'
    REACT_APP_FIREBASE_MEASUREMENTID='firebase measuremetid'
```
###백엔드 application.properties 파일 설정
```
spring.datasource.url=jdbc:mariadb://localhost:3306/yourDatabase
spring.datasource.username=yourUsername
spring.datasource.password=yourPassword
````

</br></br>

## 라이센스
이 프로젝트는 MIT 라이센스를 따릅니다.

