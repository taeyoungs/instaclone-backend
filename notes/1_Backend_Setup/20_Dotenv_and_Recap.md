# 20 Dotenv & Recap

## log

- .env 파일을 읽어들이기 위해 dotenv 설치
- Recap (Server)

1. 도메인별로 폴더를 구조화한다. ⇒ movies, users, comments ...
2. 구조화한 폴더에는 typeDefs, query, mutation이 각각 정의되어 있고 정의한 모듈을 export default 키워드로 내보내준다.
3. schema 파일에서 2번에서 내보낸 파일들을 loadFilesSync와 Glob 문법을 통해 가져온 뒤 각각 하나의 파일(typeDefs, resolvers)로 만든다.
4. 3번에서 만든 파일로 schema를 구성하고 내보낸다.
5. Apollo Server를 구성할 schema 파일을 만들었으니 server에서 schema을 가지고 Apollo Server 인스턴스를 생성한 뒤 서버를 실행한다.

- Recap (Prisma)

1. Prisma 설치 후 npx prisma init 명령어를 통해 prisma 기본 설정이 가능하다. (schema.prisma 파일 생성)
2. datasource에는 Prisma와 연결될 데이터베이스의 정보가 담겨있다.
3. model을 작성할 수 있으며 schema.prisma에 작성한 모델을 이후에 migration 진행하면 데이터베이스에서 이를 기반으로 한 테이블이 생성된다.
4. npx prisma migrate dev 명령어 실행 이후에는 client가 생성이 되며(dev 옵션으로 인해) 생성된 client를 통해 데이터베이스와 대화가 가능해진다. ⇒ 데이터베이스 데이터 조회, 삭제, 업데이트 ...

## tips

## issue

- none

## dependencies

- dotenv

## devDependencies
