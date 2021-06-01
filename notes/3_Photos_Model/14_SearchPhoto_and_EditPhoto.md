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
