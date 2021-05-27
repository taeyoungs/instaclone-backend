# 16 Update Profile

## log

- Prisma에게 보낸 데이터가 undefined라면 데이터베이스로 전달되지 않는다. (Prisma가 값이 존재하는지 확인한 후에 DB에 값을 전달한다)
- 논리 연산자와 Object spread 문법을 이용하여 변수의 상태에 따라 값을 전달하게끔 만든다.

```ts
{
    ...(data && { key: value })
}
```

## tips

## issue

- none

## dependencies

## devDependencies
