# 15 Prisma Migrate

## log

- npx prisma migrate dev 테스트
- dev

prisma migrate는 기본적으로 데이터베이스를 변형해주는 명령어이며 이 명령어에 옵션으로 dev를 설정해줘야 client까지 자동으로 생성해준다.

## tips

- prisma 2가 production 상태가 되어 더 이상 migrate 명령어에 --preview-feature를 사용하지 않아도 된다.

## issue

- windows 환경 postgresql과 prisma 연결 문제

Mac 환경에서는 개발 모드일 경우에는 postgresql user 비밀번호에 상관없이 접속이 가능한듯 하다. 윈도우에서는 postgresql에서 생성한 아이디와 일치하는 비밀번호가 필수

## dependencies

## devDependencies
