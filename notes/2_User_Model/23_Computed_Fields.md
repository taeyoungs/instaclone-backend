# 23 Computed Fields

## log

- Computed Fields

GraphQL schema로 채워져 있지만 데이터베이스에는 없는 필드를 말하며, 매번 request를 받을 때마다 계산된다.

- Query와 Mutation이 resolver를 가지듯 커스텀 타입의 필드 resolver 또한 만들어줄 수 있다.

데이터베이스에서 User를 가져와서 반환해주려고 할 때 GraphQL이 특정 필드가 데이터베이스에 존재하지 않음을 알고 해당 필드의 resolver를 찾게 된다. resolver가 존재한다면 resolver를 데이터베이스에서 가져온 User로 실행한다. (root 인자에 해당 User 정보가 담겨있다)

- totalFollowing, totalFollowers

내가 팔로우하고 있는 사람들을 찾기 위해서는 다른 사용자들 중 팔로워 목록에 내가 포함된 사용자들만 찾으면 된다. 반대로 내 팔로워들은 다른 사용자들 중 팔로우 목록에 내가 포함된 사용자들만 찾으면 된다.  
물론 엄청난 수의 사용자를 보유하고 있는 인스타그램이 이런 식으로 팔로워와 팔로우 수를 계산하지는 않는다. 하지만 웬만한 경우에는 이와 같이 작성하면 무리 없이 동작할 것이다.

- isMe, isFollowing

isMe: 서버에 요청하고 있는 사용자 정보가 로그인한 사용자인지 확인하는 Boolean 필드
isFollowing: 서버에 요청하고 있는 특정 사용자를 로그인한 사용자가 팔로우하고 있는지 확인하는 Boolean 필드

## tips

- client의 결과를 바로 반환하는 경우 async & await를 사용하지 않아도 GraphQL이 결과가 반환될 때까지 기다린다.

## issue

- none

## dependencies

## devDependencies
