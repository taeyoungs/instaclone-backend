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
