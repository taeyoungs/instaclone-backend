# 18 Comment on Photos

## log

- Comment Model 추가
- isMine (Computed field)

  Photo와 Comment 타입에 로그인한 사용자의 댓글인지 확인할 수 있는 isMine 필드 추가, 자기 자신의 댓글일 경우 삭제가 가능해야 하기 때문에 이를 확인할 수 있는 Computed field를 추가해서 이용한다.  
  항상 로그인한 상태는 아닐테니까 주의할 점은 loggedInUser가 없는 경우가 있다는 점. 따라서, loggedInUser를 이용해서 작업을 해야 하는 경우 로그인한 사용자 정보가 null아 아닌지 체크해줄 필요가 있다.

- Create Comment

  photo의 id값과 text를 인자값으로 받아 Comment 테이블에 새로운 Comment 컬럼을 생성한다. (Photo, User connect 연결 필수)

## tips

## issue

- none

## dependencies

## devDependencies
