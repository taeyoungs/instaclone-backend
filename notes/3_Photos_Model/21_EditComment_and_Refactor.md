# 21 EditComment and Refactor

## log

- protectedResolver Refactor

  Mutation과 Query의 경우로 나눠 로그인이 필요한 작업인데 Query operation일 경우 null 반환하는 작업 추가

```ts
type NotLogggedInResult = {
  ok: boolean;
  error: string;
};

export function protectedResolver(resolver: Resolver): Resolver {
  return function (
    root,
    args,
    ctx,
    info
  ): Resolver | NotLogggedInResult | null {
    if (!ctx.loggedInUser) {
      if (info.operation.operation === 'query') {
        return null;
      } else {
        return {
          ok: false,
          error: 'Please log in to perform this action',
        };
      }
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
