# 17 See Feed

## log

- Photo 목록 중에 팔로잉한 사람들의 Photo만 뽑아내기

  Photo 테이블에 해당 Photo의 주인인 User 정보가 있을텐데 만약 이 사람을 내가 팔로잉하고 있다면 이 사람의 팔로워 목록에 내가 들어있을 것이다. 따라서, Photo 주인의 팔로워 목록에 내가 있는 Photo만 추출해내면 팔로잉한 사람들의 Photo 목록만을 얻을 수 있다.

- 인스타그램에선 이미 자기 자신을 팔로잉하고 있다. (팔로잉한 것처럼 사진을 받아온다)

  이게 무슨 말이냐 하면 팔로잉한 사람들의 사진 목록을 추출해내고 있는데 그 중 자기 자신의 사진 목록이 포함되어 있으니 기본적으로 자기 자신을 팔로잉하고 있는 상태이다. 다만, 자기 자신을 팔로잉하게 되면 팔로워 목록에서 항상 -1을 해줘야 하는 등 귀찮은 일이 생기므로 팔로잉한 사람들의 사진들을 추출할 때 `OR` 조건을 이용하여 내가 올린 사진들 또한 가져오도록 하자.

```ts
import { Resolvers } from '../../type';
import { protectedResolver } from '../../users/users.utils';

// TODO: pagination
export default {
  Query: {
    seeFeed: protectedResolver((_, __, { client, loggedInUser }) =>
      client.photo.findMany({
        where: {
          OR: [
            {
              user: {
                followers: {
                  some: {
                    id: loggedInUser.id,
                  },
                },
              },
            },
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    ),
  },
} as Resolvers;
```

## tips

## issue

- none

## dependencies

## devDependencies
