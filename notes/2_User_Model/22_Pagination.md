# 22 Pagination

## log

- 특정 사용자를 외래키로 가지는 모든 사용자를 가져오는 방법에는 2가지 방법이 있다.

1. 특정 사용자를 찾은 뒤 사용자에 연결되어 있는 사용자 목록을 호출하여 가져오는 방법
2. 모든 사용자 중에서 특정 사용자를 가지고 있는 사람들을 필터링하여 가져오는 방법

- Offset Pagination

Airbnb나 TripAdvisor와 같은 결과 페이지를 가지게 될 때 유용한 Pagination, 말 그대로 페이지의 수를 볼 수 있으며 페이지를 뛰어넘을 수도 있다.  
Offset Pagination의 장점은 원하는 페이지로 한번에 뛰어넘을 수 있다는 것이고 페이지의 수를 확인할 수 있다는 점이다. 단점은 뛰어넘는다고 했지만 결국 skip 시킨 요소들을 확인하는 과정을 거치기 때문에 많은 양을 skip하면 느리게 동작할 가능성이 있다.

```ts
const followers = await client.user
  .findUnique({
    where: {
      username,
    },
  })
  .followers({
    take: 5,
    skip: (page - 1) * 5,
  });
```

- Cursor-based Pagination

Cursor-based Pagination은 가장 마지막에 요청한 결과물 중에서 제일 마지막 요소(unique한 컬럼)를 기억하고 있다가 요청 시 이를 보내 커서가 해당 결과물부터 시작하도록 만들어줘야 한다. 해당 결과물부터 시작하나 이미 클라이언트에게 존재하는 요소이기 때문에 `skip: 1`을 통해 그 다음 요소부터 가져가도록 만들어준다. (클라이언트가 마지막 결과물을 저장하고 있어야 한다)  
Cursor-based Pagination의 장점은 규모가 용이하게 커질 수 있다는 점이다. 단점은 특정 페이지로 한번에 넘어갈 수 없다는 점, 예를 들어 1페이지에서 35페이지로 넘어가서 사용자에게 결과를 보여줄 수가 없다.  
Cursor-based Pagination이 잘 어울리는 곳은 무제한 스크롤 페이지가 필요할 때이다. 페이지가 필요하지 않고 스크롤에 따라 계속해서 데이터를 로딩해줘야 할 때 유용하게 사용할 수 있다.

```ts
const following = await client.user
  .findUnique({
    where: {
      username,
    },
  })
  .following({
    take: 5,
    skip: lastId ? 1 : 0,
    ...(lastId && { cursor: { id: lastId } }),
  });
```

## tips

- findMany where 옵션 => some, every, none

some은 필터링할 요소가 하나 이상 부합하는 값들을 반환  
every는 필터링할 요소가 모두 부합하는 값들을 반환  
none은 필터링할 요소가 모두 부합하지 않는 값들을 반환

ex.  
some: User following $username (IN + EQUAL to $username)  
every: User following $username + User following nobody (NOT IN + NOT EQUAL to $username)  
none: User not following $username (NOT IN + EQUAL to $username)

- 단순히 사용자의 유무를 확인하고 싶다면 모든 컬럼을 조회하기 보다는 **select** 옵션을 사용하여 최소한의 정보만 요청하자.

```ts
const user = await client.user.findUnique({
  where: {
    username,
  },
  select: {
    id: true,
  },
});
```

- 조건에 부합하는 요소의 수를 알고 싶다면 **count** 메서드를 이용하는 것도 방법이다.

```ts
const totalFollowers = await client.user.count({
  where: {
    following: {
      some: {
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
