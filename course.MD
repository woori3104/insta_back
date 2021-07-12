
## ts SetUp
- typescript 설치 
```
pm i typescript ts-node --save-dev
```
- tsconfig.json
```
{
    "compilerOptions": {
        "outDir": "./build",
        "allowJs": true,
        "target": "ES5",
        "skipLibCheck": true
    },
    "include": [
        "./src/**/*"
    ]
}
```

 ## 3.1 Apollo Server 

- graphql Setup
```
npm i apollo-server graphql
```
- nodemon 
    - node application을 자동으로 재기동
```
npm i nodemon --save-dev
```
## 3.2 Babel
- babel : javascript complier
    - 최신 코드를 브라우저가 이해할수있는 코드로 변환해줌 
    - 노드 단계가 낮더라도 호환가능한 코드로 컴파일가능 
```
npm install --save-dev @babel/core
npm install @babel/preset-env --save-dev
npm install @babel/node --save-dev
```

## 3.3 POC API 
- 모든 내용을 한 파일에 넣는 아키텍처는 비추천
- query, mutaion, typeDef등 각 목적에 맞체 파일을 나누는 것이 가독성 면에서 유리
- resolver의 두번째 인자가 mutaion이나 query에게 주는 argument이다. 
- _를 사용하면 해당 파라미터는 무시 -> golang과 동일

## 3.4 Prisma Setup
- prisma is orm
- orm = object relational mapping,
- graphql과 다소 차이가 있지만 매우 비슷함 
- PRISMA 통해 자바스크립트(타입스크립트)와 대화 할 수 있어. 
```
npm install @prisma/cli -D
npx prisma init
install porstresapp(mac os) or pgadmin4(window)
postresapp : https://postgresapp.com
```
- .env 환경변수가 저장된 파일 
    - 어떤 환경 변수가 저장되어있는지는 .env_template을 만들어서 커밋


## 3.5 Prisma Migrate 
- VSC의 extention prisma설치 
    - 컬러링, 자동완성 기능제공, 개발편의성 향상 
```
npx prisma migrate dev 
```
- 윈도우에서 P1014에러가 나올경우 
```
.env파일 수정 
url에 비밀번호까지 입력
npx prisma migrate reset 
npx prisma migrate dev 
wsl사용시 
.env파일에 url에 localhost를 wsl Ipv4주소로 변경해야함! 
```
- Prisma
    - aut
    'oincrement 자동증가
    - DateTime 이미 설정된 변수타입
    - not required일때 ?를 붙여준다 
    - Prisma는 우리가 schema.prisma에서 작성한 코드를 토대로 migration.sql의 sql 코드로 변환해줌

## 3.6 ~ 3.7 Prisma Client
- client는 node_module에 위치함
- import {PrismaClient} from '@prisma/client'; 에서의 신텍스에러
    - SyntaxError: Cannot use import statement outside a module
        - json에 type : "module"을 추가
        - import {PrismaClient} from '@prisma/client'; 를 아래와 같이 수정
        ``` 
        import pkg from '@prisma/client';
        const { PrismaClient } = pkg;
        ```

## 3.8 Prisma Studio
- Prisma Studio는 시각적인 에디터 
- 실제 데이터 베이스의 모델들을 위한 브라우저 
- 실제 디비 값을 변경하는것도 가능 (생 sql로 확인은 불가)
    - filter를 사용하여 필터링하는것은 가능함
```
npx prisma studio
```

## 3.9 Architecture
- type, query, mutation 을 domain별로 독립된 파일로 관리
    - 용도에 따라 파일을 분리해주지않으면 파일이 길어지고 가독성이 안좋아짐
    - 폴더구조에서 모든 typedefs와 resolver파일들을 불러오기 위해 graphql-tools를 사용
    ```
    npm install graphql-tools@7.0.2 또는 npm install graphql-tools@latest
    ```
- loadFilesSync 를 통해 파일 경로 패턴 정의
    ```
    loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
    폴더의 이름등은 신경쓰지않음 
    typeDefs라는 이름을 가진 파일을 읽어옴
    ```
- * __filename 은 현재 실행 중인 파일 경로
- * __dirname 은 현재 실행 중인 폴더 경로
- /**/*.typeDefs.js : 모든 폴더의 모든 이름의 typeDefs.js   
- makeExecutableSchema 를 사용하여 typedef와 resolver를 하나의 스키마로 정의
- loadfilessync는 각 파일들의 export default 들을 불러오므로 설정 필요

## 3.11 Dotenv 
- .env를 사용하기 위해서 dotenv설치필요 
```
npm i dotenv
```
- app에서 dotenv를 top에서 실행해야한다.
- require('dotenv').config();
- process.env.#### 로 환경변수 접근

## 4.0 Create Account
- model명, 컬럼명 소문자로 
    - 대소문자 구분해서 테스하기 불편함.
- mutation 
    - 
- query 
    - 
- typeDefs
    - prisma의 schema와 싱크를 맞춰야함 
        - prisma schema에서 required는 typeDefs에서도 required
    - 
-  Prisma Schema, graphql Schema
    - Prisma schema
        - 기본 required ? : optional / default value : null
    - grahpql schema 
        - 기본 optional / ! : required
- Prisma 파일에 부여하는 속성을 통해 DB에러를 사전 방지
    - @unique ... 

## aws sdk for javascript

