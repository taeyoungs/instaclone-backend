# 14 Login and Refactor

## log

- login에서 에러를 핸들링하는 방법이 seeProfile과는 조금 다른데 login과 같이 에러의 내용을 담아 반환해줌으로써 이후에 프론트엔드에서 이를 화면에 표시해줄 수도 있기 때문에 단순히 에러를 발생시켜서 멈추기 보다는 현재 상태와 에러 메세지를 담은 객체를 반환해준다. (seeProfile도 나중에 이런 방식으로 에러 핸들링할 예정)
- 프론트엔드와 백엔드가 분리되어 있으니 Cookie와 Session을 사용하기 보다는 JSON Web Token을 사용하여 사용자의 로그인 여부를 체크한다.

서버에서 JSON Web Token을 생성할 때 서명을 추가하게 되고 클라이언트로부터 토큰을 받게 됐을 때 서명이 일치하는지를 확인하여 서버에서 보낸 토큰이 맞는지 확인한다. 토큰의 목적은 중요한 정보를 담아서 이를 주고 받는 것이 아니라 **토큰 안에 정보를 담고 해당 토큰이 서버에서 사인한 토큰인지 확인하는 것**이다.  
물론 서버에서 토큰을 사인할 때 사용하는 Key는 절대 공개되선 안되므로 env 파일에 보관한다. 추가로 토큰에는 유효 기간 등 다양한 옵션을 설정할 수도 있다.

- Resolver 이름으로 리팩토링

점점 많아지는 typeDefs와 mutation, query를 대비하여 기존 model 이름으로 된 폴더 안에 3가지를 작성한 구조에서 한번 더 분리하여 Resolver 이름으로 폴더를 생성한 뒤 typeDefs, mutation 그리고 query를 작성해주도록 하자. Divide and Conquer !

## tips

## issue

- none

## dependencies

## devDependencies
