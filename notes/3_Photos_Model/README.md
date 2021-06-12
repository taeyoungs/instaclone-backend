# 10 Photos Model

## log

- 실제 인스타그램 처럼 사용자가 올리는 이미지 파일을 담당하는 Photo Model을 생성

Photo Model은 사용자의 id 값을 외래키로 갖는다. (어느 사용자가 올린 이미지인지 알 수 있어야 하므로)

- 인스타그램에는 해시태그(#) 기능이 존재하는데 이를 위해 해쉬태그를 관리하는 Model이 존재해야 한다.

Hashtag와 Photo Model은 다대다 관계로 하나의 Photo가 여러 개의 Hashtag를 가질 수 있고 하나의 Hashtag가 여러 개의 Photo를 가질 수도 있다. (사진에 여러 개의 #를 걸어놓을 수도 있고 #keyword가 걸린 사진은 여러 개일 수도 있기 때문에)

## tips

## issue

- none

## dependencies

## devDependencies

# 11 Upload Photo

## log

- 모듈 간의 의존성 고려하기

새롭게 만든 Photo와 Hashtag Model에 대한 GraphQL typeDefs와 resolver를 만들어주게 될텐데 Photo 타입에는 Hashtag 타입이 필요하니 Hashtag 타입 정의가 필요하다. Hashtag 타입을 Photo 타입에서만 참조한다면 한 모듈 내에서 작성하면 되겠지만 다른 타입에서도 참조할 경우를 고려해야 한다. 한 모듈 내에서 작성할 것인지 별도의 모듈로 분리할 것인지는 본인의 선택이다. 애초에 분리할 생각으로 진행해도 되고 개발을 진행해 나가면서 상황에 맞게 리팩토링을 진행하는 방식으로 진행해도 된다.

- 문자열 내에 포함된 해시태그는 정규식 표현을 통해 추출

한국어 또는 영어로 이루어진 해시태그를 추출하는 정규식 표현: `/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g`

- connectOrCreate / hashtagObjs

이미지를 저장할 때 해당 hashtag의 유무에 따라 기존에 있는 hashtag를 연결하거나 새로운 hashtag를 만들어줘야 하는데 이를 Prisma option 중 하나인 connectOrCreate를 이용해서 해결한다. connectOrCreate는 연결하고자 하는 테이블에서 where 옵션에 해당하는 컬럼이 존재한다면 해당 컬럼을 가져와서 연결하고 그렇지 않다면 테이블에 새로운 컬럼을 생성한 뒤 연결해준다.  
connectOrCreate를 사용하는 것은 좋으나 해시태그의 수가 여러 개일 경우 일일히 where 조건을 입력해주는 것은 불가능하다. 따라서 where 조건이 요소로 담긴 배열을 따로 생성하여 해시태그의 유무에 따라 Photo 생성 시 추가하도록 해주자.

```ts
let hashtagObj: any[] = [];
if (caption) {
  const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g);
  if (hashtags) {
    hashtagObj = hashtags.map((hashtag) => ({
      where: {
        hashtag,
      },
      create: {
        hashtag,
      },
    }));
  }
}

return client.photo.create({
  data: {
    file,
    caption,
    user: {
      connect: {
        id: loggedInUser.id,
      },
    },
    ...(hashtagObj && {
      hashtags: {
        connectOrCreate: hashtagObj,
      },
    }),
  },
});
```

## tips

## issue

- none

## dependencies

## devDependencies

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

# 13 See Hashtag

## log

- totalPhoto

  hashtag 타입의 resolver라고 hashtag 테이블만 조회할 필요는 없다. 해당 해시태그를 가지고 있는 사진의 개수를 구하는 필드이므로 Hashtag_Photo 테이블에서 해당 해시태그의 id값을 가지고 있는 컬럼의 수를 센다. (= 해당 해시태그를 가지고 있는 사진들)

- field arguments

  resolver에 argument를 전달하는 것은 이미 계속해서 해오던 일이다. 하지만 필드에도 argument를 전달할 수 있다면? computed field로 만들 필드의 resolver가 argument를 받을 수 있도록 필드에 argument를 전달할 수 있다.

## tips

## issue

- none

## dependencies

## devDependencies

# 14 Search Photo and Edit Photo

## log

- Edit Photo resolver에서 photo의 주인과 로그인한 사용자가 동일한지 확인

  photo 테이블의 컬럼 중에 unique한 필드는 id뿐이다. 따라서, findUnique와 argument로 주어지는 photo id로 photo를 찾고 해당 photo의 user id를 이용해 로그인한 사용자와 동일한지 검증하거나 findFirst로 찾되 photo id와 로그인한 사용자의 id를 모두 만족하는 photo를 찾는다.

- caption 수정 시 hashtag

  caption을 수정했을 때 hashtag 또한 수정해줘야 한다. 사진을 업로드할 때 caption을 통하여 hashtag를 생성 또는 연결하기 때문에 caption의 변화가 생기면 hashtag 컬럼에도 변화가 생겨야 하는 게 맞다.  
  photo의 주인과 로그인한 사용자가 동일한지 확인하는 과정에서 업데이트 하기 전 photo의 정보를 데이터베이스에서 이미 가져오게 된다. 이때 가져온 photo에 include와 select 옵션을 추가하여 hashtag의 목록을 추가로 가져오고 이 hashtag 목록을 이용하여 기존 hashtag 목록은 disconnect하고 새로운 caption에서 추출한 hashtag 목록을 connect 시킨다.

```ts
await client.photo.update({
  where: {
    id,
  },
  data: {
    caption,
    hashtags: {
      disconnect: photo.hashtags,
      connectOrCreate: processHashtags(caption),
    },
  },
});
```

## tips

- 재사용할 수 있는 기능은 util 함수로 분류하여 작성한 뒤 재사용해주자.

```ts
export const processHashtags = (caption: string) => {
  const hashtags = caption.match(/#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g) || [];
  return hashtags.map((hashtag) => ({
    where: {
      hashtag,
    },
    create: {
      hashtag,
    },
  }));
};
```

## issue

- none

## dependencies

## devDependencies

# 15 Like Unlike Photo

## log

- 프론트단에서만이 아니라 백엔드단에서도 사용자 요청에 대한 관리가 필요하다.

  좋아요와 같은 기능을 이미 좋아요를 누른 사용자라면 해당 기능을 사용할 수 없게 하는 식으로 한명의 사용자가 하나의 사진에 여러 번의 좋아요를 누를 수 없게 막아놨다고 하자. 문득 보면 해당 기능을 반복적으로 사용할 수 없게 막아놓은 것 같지만 만약에 사용자가 네트워크 단에서 같은 요청을 계속해서 보낸다면? 브라우저에서 HTML 요소를 클릭해서 이벤트를 발생시키는 것이 아니라 네트워크 단에서 API 요청을 계속 보낼 수도 있다. 따라서, 백엔드 단에서도 이러한 경우를 방지하는 코드를 작성할 필요가 있다.

- toggleLike

  사진에 좋아요를 누르거나 좋아요를 취소하는 기능의 흐름은 로직 흐름이 거의 흡사하다. 끝에 좋아요의 상태에 따라 다른 업데이트를 진행해줄 뿐 그 외의 로직은 동일하기 때문에 하나의 resolver로 관리해준다.  
  Photo가 존재하는지 확인 ⇒ 해당 사진에 로그인한 사용자의 좋아요 여부 체크 ⇒ 좋아요 여부에 따른 다른 작업

## tips

## issue

- none

## dependencies

## devDependencies

# 16 See Likes

## log

- `select`과 `include`

  `select`은 테이블에서 원하는 필드만 선택해서 해당 필드 정보만 가지고 올 수 있게 하는 옵션이고 `include`는 외래키로 연결된 필드의 정보까지 추가로 가져오게 하는 옵션이다. 즉, `select`은 전체 필드 중에서 해당 필드만 가져오겠다는 것이고 `include`는 전체 필드에 더하여 해당 필드 정보까지 추가로 가져오겠다는 의미이다.

- Like 테이블에서 Photo 아이디값으로 해당 Photo 아이디값을 가진 Like 컬럼을 찾아서 User 목록을 조회하던지, User 목록 중에서 User가 가진 Like 목록 중에 해당 Photo 아이디값을 가지고 있는 User 목록을 조회

## tips

## issue

- none

## dependencies

## devDependencies

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

# 19 See Photo Comments

## log

- Photo 타입에 Photo에 연결된 Comment 컬럼의 개수를 알 수 있도록 comments라는 필드를 추가 (Computed field)

  Hashtag 타입에서 Photo 목록을 pagination 해서 정보를 모두 가져오는 것과 달리 개수만 알 수 있는 필드를 추가하는 것은 인스타그램에서 comments를 보여주는 방식 때문이다. 한 화면 내에서 모든 걸 같이 보여주는 방식이라면 해당 타입 정보를 가져올 때 외래 키로 연결된 다른 타입의 정보도 가져와서 같이 보여주겠지만 인스타그램에서 댓글을 보려고 누르면 다른 화면으로 이동해서 댓글을 보여준다.  
  즉, 다른 화면에서 다른 리졸버가 실행되어 댓글 목록을 가져온다는 것이다.  
  틀린 방법이 아니라 사용자에게 보여주고자 하는 방식이 다를 뿐이다. 한 화면에서 모두 같이 보여주고 싶다면 다른 리졸버를 만드는 것이 아니라 computed field를 이용하여 모든 정보를 같이 가져오고 다른 화면에서 따로 진행하고 싶다면 리졸버를 따로 구현하는 것이 좋다.

- include or select

  comments 목록을 가져올 때 연결된 User의 특정 필드만 가져오거나 아예 가져오는 작업이 필요한 것 같다. 댓글을 보여줄 때 보통 아이디나 사진 등을 보여주게 되니 ..

## tips

## issue

- none

## dependencies

## devDependencies

# 20 Delete Comment and Photo

## log

- Check First

  추가한 기능이 잘 동작하려면 예외 상황에 대한 대처는 필수다. 따라서, 삭제하려는 Comment나 Photo가 존재하는지, Comment나 Photo의 주인과 로그인한 사용자가 일치하는지 체크할 필요가 있다.

- prisma에서 아직 cascade delete를 지원하지 않기 때문에 라이브러리를 추가해서 사용하지 않는 이상 무언가를 삭제하기 전에 삭제할 데이터와 연관된 데이터를 먼저 삭제해주는 작업이 필요하다.

## tips

## issue

- none

## dependencies

## devDependencies
