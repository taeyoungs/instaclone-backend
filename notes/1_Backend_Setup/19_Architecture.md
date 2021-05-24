# 18 Prisma Studio

## log

- 도메인 별로 폴더를 구조화 ex. movies, users ⇒ 안에 movies.queries.ts, movies.mutations.ts, movies.typeDefs.ts ...
- 파일명만 보고도 무슨 파일인지 알 수 있도록 `movies.queries`와 같이 파일명을 작성
- 각 설정 파일이 하나의 동작만을 하게 변경 ⇒ server.ts는 서버를 실행시키는 역할, client.ts는 prisma client를 초기화하고 내보내주는 역할 ...
- 분리된 type, mutation, query을 하나의 schema 파일로 만들어서 내보내주기 위하여 `graphql-tools`를 이용
- loadFilesSync로 찾고자 하는 typeDefs, query, mutation 가져와서 mergeTypeDefs, mergeResolvers로 하나의 파일로 만들어준다.

## tips

- `${__dirname}/**/*.{queries, mutations}.ts`, `${__dirname}/**/*.typeDefs.ts`

Glob 문법으로 모든 폴더 안에(\*\*) 모든 파일(\*)을 찾되 파일명이 queries, mutations, typeDefs에 해당하는 타입스크립트 파일만 찾게끔 설정

- loadFilesSync는 찾은 파일에서 export default로 내보낸 모듈을 가져온다.

## issue

- none

## dependencies

- graphql-tools

## devDependencies
