# 11 Deploy the Heroku

## log

- heroku 무료 버전을 이용하여 백엔드 서버 배포하기

  heroku에 서버를 배포하는 방법에는 heroku cli를 이용하는 방법과 github repo를 연결해서 진행하는 방법이 있다.

- 서버에 이미지나 비디오를 저장하지 않는 이유

  이유는 다양한 것이 있겠지만 지금 배포하면서 살펴볼 수 있는 이유는 서버를 배포하게 될 때 서버가 바닥부터 다시 만들어지기 때문이다. 서버를 배포할 때마다 매번 처음부터 다시 만들어지는데 서버에 이미지를 저장하고 있으면 배포할 때마다 이미지가 사라져버릴테니 다른 저장소에 저장하고 url을 가져와서 사용하는 것이 맞다.

- heroku에 배포할 경우 heroku 측에서 자동으로 process.env.NODE_ENV = "production"이 활성화된다. 따라서, graphql playground를 배포한 서버에서 확인하고 싶다면 apollo server에게 명시적으로 playground를 활성화하라고 알려줘야 한다. (`playground: true`)

## tips

- Babel vs TypeScript의 tsc

  빌드 출력 결과와 소스 입력 파일이 거의 비슷한가요? tsc를 사용하세요.  
  여러 잠재적인 결과물을 내는 빌드 파이프라인이 필요하신가요? babel로 트랜스파일링을 하고, tsc로 타입을 검사하세요.

## issue

- none

## dependencies

## devDependencies
