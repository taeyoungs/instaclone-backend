# 12 Configure Databases

## log

- `introspection: true`

  playground: true로 production 상태에서도 playground에 접근할 수 있도록 설정했지만 docs나 schema에 접근하려면 `introspection: true`이라는 옵션을 apollo server에게 추가로 설정해줘야 한다.

- Database

  데이터베이스는 heroku에서 제공하는 Add-ons(데이터베이스)를 이용, 물론 무료 버전으로 !

- release phase

  heroku가 앱이 시작되기 전에 명령어를 실행할 수 있게 해주는 부분, release phase에 `prisma migrate deploy`를 추가하여 앱이 실행되기 전에 데이터베이스에 schema를 기반으로 데이터베이스를 모델링할 수 있도록 하자.  
  `prisma migrate deploy`와 `dev`의 차이점은 `dev`는 migrate 도중 에러가 발생하면 client를 다시 생성하는 기능이 추가로 있다.  
  release phase를 설정하기 위해서는 **Procfile**을 추가해줘야 한다.

- Migrating

  Procfile을 만들었으므로 npm start가 이루어지기 전 npx prisma migrate deploy가 실행될 수 있도록 release: npx prisma migrate deploy를 해주자.

## tips

## issue

- none

## dependencies

## devDependencies
