# 18 Protecting Resolvers

## log

- request header의 토큰 여부에 따라 context에 로그인한 유저 정보를 담을 수 있게 됐지만 resolver에서 이를 바로 사용하기엔 null인 경우도 존재하니 로그인한 유저 정보가 null인지 아닌지 확인하는 장치가 필요하다.

context에서 loggedInUser(= 로그인한 유저 정보)가 null인지 판단하는 조건문을 통하여 에러를 발생시킬 수도 있겠지만 이러면 모든 resolver에 이 조건문을 반복해서 적어줘야 한다. 반복해서 적는게 문제라면 이를 재사용 가능한 유틸 함수로 만들어서 사용해보자.

```ts
// users.utils.ts
export const protectedResolver = (user: User | null) => {
  if (!user) {
    throw new Error('You need to login.');
  }
};
```

뭔가 조금 아쉽다. Error 객체를 생성하여 던지기 보다는 프론트엔드에서도 에러 메세지를 이용할 수 있게 따로 만든 output type을 만들어서 에러 메세지를 담아 응답으로 보내고 싶다. 이를 위해 resolver를 wrap하는 함수를 만든다. 리덕스에서도 사용하는 thunk 패턴. 즉, 함수를 반환하는 함수를 만든다.

```ts
// example
const protectedResolver = (resolver) => (root, args, ctx, info) => {
  if (!ctx.loggedInUser) {
    // ...
  }
  return resolver(root, args, ctx, info);
};
```

로그인한 유저 정보를 체크하고 graphql resolver(함수)를 반환해주는 함수를 만들었다. 이를 다음과 같이 resolver를 감싼 뒤에 호출해준다. **호출**해줬다는 점이 중요하다. 이미 한번 함수를 호출했으니 protectedResolver가 반환한 함수는 전형적인 graphql resolver인 상태이다. (protectedResolver가 root, args, ctx, info를 매개변수로 받는 함수를 반환하는 함수이기 때문에)

```ts
Mutation: {
    editProfile: protectedResolver(resolver),
}
```

단, 주의할 점은 로그인 유무를 판단하기 위해 protectedResolver로 감싼 resolver들의 반환 타입은 모두 동일해야한다는 점이다. protectedResolver 함수에서 로그인한 유저 정보가 없을 경우 ok, error가 담긴 객체를 반환할 것이기 때문에 👍

```ts
type NotLogggedInResult = {
  ok: boolean;
  error: string;
};

export function protectedResolver(resolver: Resolver): Resolver {
  return function (root, args, ctx, info): Resolver | NotLogggedInResult {
    if (!ctx.loggedInUser) {
      return {
        ok: false,
        error: 'Please log in to perform this action',
      };
    }
    return resolver(root, args, ctx, info);
  };
}
```

## tips

## issue

- none

## dependencies

## devDependencies
