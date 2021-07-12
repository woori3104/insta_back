# Instaclone

 Instaclone Backend.

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
    - autoincrement 자동증가
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
- Prisma Studio는 
```
npx prisma studio
```

