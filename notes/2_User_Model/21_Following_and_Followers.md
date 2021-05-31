# 21 Following and Followers

## log

- following과 followers의 self relationship 관계 (User model)

following User[] @relation("FollowRelations", references: [id])  
followers User[] @relation("FollowRelations", references: [id])  
DB 테이블로 살펴보면 User 테이블의 id 컬럼을 외래키로 하고 두 개의 id 컬럼을 primary key로 설정한 새로운 테이블이 생성된 것을 확인할 수 있다.

- followUser, unfollowUser 구현
- 외래키로 연결된 테이블의 정보를 가져오는 것은 데이터베이스의 측면에서 볼 때 상당한 자원이 소모되는 일이다.

팔로우와 팔로잉 관계를 생각해보자. 자신을 팔로잉한 User들의 정보를 데이터베이스에서 가져와야 할 때 팔로잉한 User가 1, 10, 100명 정도면 큰 문제가 되지 않을 것이다. 하지만 User의 수가 10만, 100만 혹은 그 이상이라면? 매 요청마다 이렇게 많은 수의 User 정보를 데이터베이스에게 요청하고 가져오려고 한다면 이 요청을 해결하느라 다른 요청을 해결하지도 못할 것이다. Prisma에서는 옵션을 부여하지 않는 이상 테이블 간의 연관 관계를 가지고 있는 컬럼을 가져오려고 할 때 null을 반환한다. 즉, 옵션을 지정하지 않는 이상 사용자를 보호하기 위하여 요청을 기본적으로 막는다.

- include 옵션

Prisma는 외래키 관계에 있는 컬럼의 정보를 기본적으로 막지만 이를 허용하게끔 옵션을 지정할 수 있다. include 옵션 안에 해당 컬럼을 true로 설정하면 이때 이후로는 컬럼 정보를 가져오기 시작한다.

## tips

- **connect** 속성과 unique 옵션이 붙은 컬럼을 이용하여 User 연결, 반대로 연결을 끊고 싶을 때는 **disconnect**

```ts
await client.user.update({
  where: {
    id: loggedInUser.id,
  },
  data: {
    following: {
      connect: {
        username,
      },
    },
  },
});
```

## issue

- none

## dependencies

## devDependencies
