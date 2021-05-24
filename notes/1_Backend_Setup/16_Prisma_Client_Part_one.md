# 16 Prisma Client Part one

## log

- client

new PrismaClient()로 생성하는 Prisma Client 인스턴스로 데이터베이스와 대화할 수 있게 해주는 객체이다. dev 옵션을 추가한 migration에서 자동으로 생성되는 client로써 node_modules 안에 저장된다. schema.prisma 파일을 기반으로 생성되며 client가 제공하는 다양한 메서드를 사용할 수 있다.

```ts
client.movie.create({
    data: {
        title,
        year,
        genre,
    },
}),
```

## tips

## issue

- none

## dependencies

## devDependencies
