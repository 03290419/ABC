# ABC-Martens 👞

ABC-Martens 는 <a href="https://www.drmartens.co.kr/">Dr.Martens</a> 홈페이지를 분석하여 해당 사이트의 기획 의도를 이해하고 개선해보는 프로젝트입니다.

# 📝 프로젝트 정보

## 1. 제작기간

    2023.09.18 ~ 2023.10.06

## 2. 참여 인원

    Backend(4)

<table>
  <tr>
    <th>Author</th>
    <th>Author</th>
    <th>Author</th>
    <th>Author</th>
  </tr>
  <tr>
    <td>
      <img style="border-radius: 50%" width="45" src="https://avatars.githubusercontent.com/u/142577943?v=4"/>
    </td>
    <td>
      <img style="border-radius: 50%" width="45" src="https://avatars.githubusercontent.com/u/132734576?v=4"/>
    </td>
    <td>
      <img style="border-radius: 50%" width="45" src="https://avatars.githubusercontent.com/u/142304129?v=4"/>
    </td>
    <td>
      <img style="border-radius: 50%" width="45" src="https://avatars.githubusercontent.com/u/58713222?v=4"/>
    </td>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/kimsw94">김승원</a>
    </td>
    <td>
      <a href="https://github.com/Park-KJ">박경재</a>
    </td>
    <td>
      <a href="https://github.com/DeveloperPMYJ">신유진</a>
    </td>
    <td>
      <a href="https://github.com/03290419">이현진</a>
    </td>
  </tr>
</table>

## 🚀 주요 기능

- [회원가입](https://github.com/wecode-bootcamp-korea/49-2nd-ABC-Martens-backend/pull/3) 👤 신유진
- [로그인](https://github.com/wecode-bootcamp-korea/49-2nd-ABC-Martens-backend/pull/8) 👤 신유진
  - [비밀번호 찾기](https://github.com/wecode-bootcamp-korea/49-2nd-ABC-Martens-backend/pull/10) 👤 이현진
- [상품 목록](https://github.com/wecode-bootcamp-korea/49-2nd-ABC-Martens-backend/pull/15) 👤 박경재
- [상품 상세](https://github.com/wecode-bootcamp-korea/49-2nd-ABC-Martens-backend/pull/7) 👤 김승원
- [장바구니](https://github.com/wecode-bootcamp-korea/49-2nd-ABC-Martens-backend/pull/11) 👤 이현진
- [주문](https://github.com/wecode-bootcamp-korea/49-2nd-ABC-Martens-backend/pull/13) 👤 이현진
- [결제](https://github.com/wecode-bootcamp-korea/49-2nd-ABC-Martens-backend/pull/16) 👤 이현진
- [외부 API 연동](https://github.com/wecode-bootcamp-korea/49-2nd-ABC-Martens-backend/pull/9) 👤 이현진
  - 카카오 로그인, 토스 페이먼츠 결제모듈 연결

## 🛠️ 사용 기술

    Express.js
    TypeORM
    JWT
    bcrypt
    nodemailer
    lodash

# 📊 ERD

<img src="./dbdiagram.png" alt="다이어그램">

## 🗄️ 기획문서

<a href="https://fern-shape-a88.notion.site/ABC-Martens-017c63872abf45489f890abbc6fa7e53?pvs=4">기획 문서 바로가기 </a>

## How To Migration

### 컨테이너 마이그레이션

해당 프로젝트는 도커 컨테이너를 이용해 테스트 환경을 재현할 수 있습니다.

```sh
docker-compose up -d
```

로컬의 8080 포트에 바인드된 컨테이너 앱에 요청을 보내 컨테이너화 된 앱에서 기능 동작 테스트가 가능합니다.

<img src="./docker.png"  alt="포스트맨"/>
</br>

❗️ docker-compose 명령 후 환경변수 바인딩이 제대로 동작하지 않아 컨테이너를 재시작해야 하는 이슈가 있습니다.

- 요청 uri: http://localhost:8080

최소한으로 요구되는 환경변수

```env
TYPEORM_CONNECTION = mysql
TYPEORM_HOST = abc-db
TYPEORM_USERNAME = root
TYPEORM_PASSWORD = test
TYPEORM_DATABASE = ABCMartens
TYPEORM_PORT = 3306
TYPEORM_LOGGING=TRUE
PORT = 8000
JWT_SECRET="ABC_Martnes!@#$098"
```

### 테스트 실행

POSTMAN 에서 MY APIS.postman_collection.json을 import 후 collection test를 실행합니다.

<img src="./postman.png"  alt="포스트맨"/>
