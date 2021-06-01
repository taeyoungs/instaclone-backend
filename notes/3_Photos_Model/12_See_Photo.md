# 12 See Photo

## log

- user computed field

  현재 Photo 타입에서 User를 조회하면 에러가 발생하는데 이는 해당 필드의 resolver가 존재하지 않기 때문이다. prisma schema에 User 필드가 있기 때문에 데이터베이스에서 User 정보를 저장하고 있는 것처럼 보이지만 이건 Prisma가 테이블 간의 관계를 이해하기 위해 설정해놓은 부분이고 데이터베이스가 갖는 정보는 User의 id값이다. 따라서 **해당 id값을 가진 User를 연결해주는 resolver가 필요**하다. 즉, computed field가 필요하다.

- hashtag computed field

  Prisma는 기본적으로 배열과 같이 많은 양의 데이터를 단순히 요청하는 것은 허락하지 않는다. include 옵션을 추가해주거나 해당 필드에 대한 resolver를 만들어줘야 한다. hashtags 필드도 해당 Photo와 연관된 hashtag들을 전부 불러오는 요청이므로 기본적으로 막혀있다. (null 반환) 따라서, 해시태그들 중에 해당 Photo의 id값을 가지고 있는 해시태그를 찾아 반환하는 resolver를 구현해준다.

```ts
export default {
  Photo: {
    user: ({ userId }: Photo, _, { client }) =>
      client.user.findUnique({
        where: {
          id: userId,
        },
      }),
    hashtags: ({ id }: Photo, _, { client }) =>
      client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      }),
  },
} as Resolvers;
```

## tips

## issue

- none

## dependencies

## devDependencies
