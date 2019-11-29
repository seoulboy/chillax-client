# Chillax

Chillax 는 사운드스케이프 기능을 가진 백색소음 공유 플랫폼 입니다.

평소에 백색소음을 자주 듣습니다. 예를 들으면 음악을 들을 때, 쉴 때, 자기 전, 책 읽을 때, 등 이렇게 백색소음은 제 일상에 녹아들어 있습니다. 그동안 백색소음을 모아둔 스트리밍 플랫폼 같은게 있었으면 좋겠다는 생각이 있었고, 그러다가 탄생한 것이 바로 Chillax 입니다. 제가 원해서 만들고, 필요해서 만들었습니다. 그런 덕분인지 대부분의 진행이 즐거웠던 프로젝트였습니다.

배포 주소: [chillax.imho.space](chillax.imho.space)

## Preview

### Login

![](README.assets/chillax-login.gif)

### Browse

![](README.assets/chillax-browse.gif)

### Upload

![](README.assets/chillax-upload.gif)

## Requirements

- Chrome Browser를 권장합니다.

- Google OAuth ID 와 Secret Key 발급이 선행되어야 합니다.

- MongoDB 가입 후 데이터베이스 설정이 선행되어야 합니다.

- AWS Access Key ID 및 Secret Key 발급이 선행되어야 합니다.

  

## Prerequisites

- Node.js 설치

## Installation

### Client

```
git clone https://github.com/imhojang/chillax-client.git
cd chillax-client
npm install
npm start
```

### Server

```
git clone https://github.com/imhojang/chillax-server.git
cd chillax-server
npm install
npm start
```

chillax-server의 root 디렉토리 안에 '.dotenv' 파일명으로 작성한 파일 안에 아래의 ** **안 작성이 선행되어야 서버가 정상적으로 작동합니다.

```
DB_USER=**MongoDB userID**
DB_PASS=**MongoDB password**
SESSION_SECRET=**this can be any connected string**
GOOGLE_CLIENT_ID=**Google API OAuth Client ID**
GOOGLE_CLIENT_SECRET=**Google API OAuth Client Secret**
FACEBOOK_CLIENT_ID=**Facebook API OAuth Client ID**
FACEBOOK_CLIENT_SECRET=**Facebook API OAuth Client Seceret**
GITHUB_CLIENT_ID=**Github API OAuth Client ID**
GITHUB_CLIENT_SECRET=**Github API OAuth Client Secret**
TWITTER_CLIENT_ID=**Twitter API OAuth Client ID**
TWITTER_CLIENT_SECRET=**Twitter API OAuth Client Secret**
AWS_SECRET_KEY=**AWS API Secret Key**
AWS_ACCESS_KEY_ID=**AWS API Access Key ID**
AWS_REGION=**AWS region**
```


## Features

- 사용자가 백색소음을 재생하거나 직접 업로드할 수 있습니다.
- 업로드된 백색소음은 다른 사용자들과 공유되고 다른 사용자들은 좋아요를 남길 수 있습니다.
- 한번에 한가지 백색소음이 재생되도록 하는 것 뿐만이 아니라, 다수의 백색소음 을 사용자가 원하는 대로 조합하여 사운드스케이프 (soundscape), 즉 소리의 풍경화를 만들 수 있습니다.
- Discover 섹션에서 들어보지 못한 새로운 백색소음을 접할 수 있습니다.
- Most Popular 섹션에서 좋아요 를 많이 받은 순으로 정렬된 백색소음 확인이 가능합니다.
- Recent Uploads 섹션에서 가장 최근 업로드된 순으로 정렬된 백색소음 확인이 가능합니다.
- Most Listened 섹션에서 가장 많이 청취된 순으로 정렬된 백색소음 확인이 가능합니다.



## Client-Side

- Babel을 통한 모던 자바스크립트 (ES2015+)
- Passport와 Google OAuth 2.0 인증을 통한 소셜 로그인 구현
- React Redux와 Redux Thunk를 이용한 예측 가능한 상태 관리
- React를 사용한 컴포넌트 베이스 UI 아키텍처 구현
- HTTP Client fetch API를 통한 GET & POST HTTP 요청
- CSS Prepropcessor Sass(SCSS)를 이용한 CSS 작성



## Server-Side

- Babel을 통한 모던 자바스크립트 (ES2015+)
- Node와 Express를 통한 API 서버 구현
- MongoDB Atlas와 Mongoose를 이용한 사용자 및 사운드 데이터 관리
- AWS S3와 Multer를 이용한 이미지 및 오디오 파일 업로드 및 관리
- Moment를 이용한 업로드 시간 변환 
- Dotenv를 통한 환경변수 관리



## Continuous Integration

- Netlify를 이용한 클라이언트 배포와 AWS Elastic Beanstalk과 CircleCI를 이용한 서버 배포 자동화



## Deployment

- AWS Elastic Beanstalk (Server)
- Netlify (Client)



## Project Control

- Adobe XD을 통한 application view flow 설계 및 디자인
- Trello를 이용한 기획 및 일정과 task 관리
- Git을 이용한 version control
- 클라이언트와 서버의 독립적인 관리를 위한 각각의 Github 저장소

---



## Challenges

### 1. Concurrent Audio Streaming & Controlling

소리의 풍경화 (Soundscape)를 만들기 위해서는 동시에 한가지 이상의 백색소음이 재생되어야 하지만 프로젝트 후반에 다다를 때까지는 한가지 소리만 재생되도록 구현을 하였습니다. 그 결과 뒤늦게 여러개의 소리가 재생되려면 재생되는 소리의 숫자에 따라 Audio 태그를 비롯한 소리 재생 제어 로직이 필요하다는 것을 알게 됬습니다. 이 문제를 해결한 방법은 다음과 같습니다: 기존에 최상위 컴포넌트 App 안에 있던 Audio 태그와 소리 재생 제어 로직을 새롭게 만든 AudioPlayer 컴포넌트 안으로 이동했습니다. 사용자가 기존에 재생한 소리와 다른 소리를 재생할 경우에는 currentlyPlaying이라는 배열로 이루어진 상태에 소리의 정보가 담긴 Object가 추가됩니다. 결과적으로 AudioPlayer 컴포넌트는 currentlyPlaying 배열에 담긴 Object 수 만큼 렌더링 되고, 동시에 여러개의 소리가 재생되고, 그 소리를 제어할 수 있게 됬습니다.

### 2.  Debouncing Dispatch Calls In Volume Control

홈 화면에는 백색소음의 볼륨크기를 조절 할 수 있는 컨트롤이 있는데, 오디오 볼륨의 값은 Redux Store에 있는 volume이라는 상태로 관리하고 있었습니다. 문제는 이 볼륨의 onChange 이벤트가 볼륨 컨트롤의 스크롤 방식 때문에 볼륨의 값을 업데이트하는 Dispatch가 자주 호출됬습니다. 퍼포먼스에는 문제가 없는 듯이 보였지만 미세한 볼륨 변경에도 불필요한 컴포넌트 렌더링이 수십번씩 생긴다는 점을 깨달았습니다. 그리하여 useDebounce라는 Custom Hook을 만들어서 300밀리초 안에도 볼륨 변경이 없으면 Dispatch 되는 식으로 debounce를 구현하여 문제를 해결하였습니다.

## Things to do

### 1. Smooth Infinite Scroll With Debouncing

여러 백색소음을 디스플레이하는 Browse 페이지의  Most Popular, Recent Uploads, 그리고 Most Listened 섹션은 현재 한번에 7개의 백색소음만 불러오고, 스크롤이 마지막이 되었을 때 서버로 API 요청을 보내 다음 7개의 백색소음을 불러옵니다. 문제는 이 백색소음을 불러올 때의 딜레이 때문에 부드럽게 다음 백색소음으로 넘어가지 않고 요청이 돌아온 후 다시 다음 버튼을 눌러야 다음 백색소음이 보입니다. 이 문제를 해결하기 위해서는 스크롤이 끝에 다다르기 전 1번만 서버로 요청을 보내는 debounce가 포함된 로직을 필요로 하는 상태입니다.



### 2. Etc

- Server API Unit Test
- E2E Test
- Integration Test
- Code Refactoring
