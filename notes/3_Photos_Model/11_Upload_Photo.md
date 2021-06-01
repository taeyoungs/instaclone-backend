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
