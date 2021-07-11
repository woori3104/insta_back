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


