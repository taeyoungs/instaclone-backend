# 10 Setup

## log

- git initialize
- Add gitignore
- npm init

## tips

## issue

- none

# 11 Apollo Server

## log

- typeDefs, resolvers를 작성하여 쉽고 빠르게 Apollo Server를 만들 수 있다.

```js
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'world',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
```

## tips

- nodemon을 활용하여 코드를 수정하고 저장할 때마다 서버가 재시작되도록 하자.

## issue

- none

## dependencies

- apollo-server
- graphql

## devDependencies

- nodemon

# 12 Babel

## log

- babel

이전에도 공부했듯이 최신 자바스크립트 문법을 지원하지 않는 환경에서도 해당 문법으로 작성한 코드가 동작할 수 있도록 자바스크립트 파일을 변환(컴파일)해주는 도구이다.

- @babel/core

자바스크립트를 변환하는 기능들을 모아놓은 모듈이다. 말 그대로 변환하는 기능들을 모아놓았기 때문에 @babel/core만 갖고는 바벨이 동작하지 않는다. 자바스크립트를 어떠한 환경(스펙)에 맞춰서 컴파일할지에 대한 정보를 알려주는 도구가 추가로 필요하다.

- @babel/preset-env

하위 브라우저 또는 낮은 버전의 Node.js 환경이 모던 자바스크립트를 지원하기 위해 필요한 내용들이 담겨있는 모듈이다. 바벨이 제대로 작동하길 바란다면 위 모듈을 바벨이 참고할 수 있도록 환경 설정 파일을 추가해줘야 한다. ⇒ babel.config.json

- @babel/node

Node.js cli와 동일하게 동작하지만 명령어 실행 전에 바벨 preset과 plugins를 사용하여 파일을 컴파일한 후 코드를 실행하게 해준다. Node.js 12버전부터는 모듈을 실험적으로 지원하기 때문에 굳이 사용하지 않고 이에 필요한 설정을 추가해도 되지만 모두 같은 조건에서 코드를 작성할 수 있도록 바벨을 사용한다.

## tips

## issue

- none

## dependencies

## devDependencies

- @babel/core
- @babel/preset-env
- @babel/node

# 13 POC API

## log

- 현재는 한 파일에 type 정의부터 resolve까지 모두 작성하고 있지만 후에 리팩토링 진행
- GraphQL Recap

```js
const typeDefs = gql`
  type Movie {
    title: String
    year: Int
  }
  type Query {
    movie: Movie
    movies: [Movie]
  }
  type Mutation {
    createMovie(title: String!): Boolean
    deleteMovie(title: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    movie: () => ({ title: 'Hello', year: 2021 }),
    movies: () => [],
  },
  Mutation: {
    // root, args, context, info
    createMovie: (_, { title }) => {
      console.log(title);
      return true;
    },
    deleteMovie: (_, { title }) => {
      console.log(title);
      return true;
    },
  },
};
```

## tips

## issue

- none

## dependencies

## devDependencies

# 14 Prisma Setup

## log

- 설치된 postgresql 환경과 데이터베이스 명에 맞게 env 파일 수정
- 타입스크립트로 진행하기 위해 typescript 및 tsconfig.json 추가

## tips

## issue

- none

## dependencies

## devDependencies

- typescript
- ts-node
- prisma

# 15 Prisma Migrate

## log

- npx prisma migrate dev 테스트
- dev

prisma migrate는 기본적으로 데이터베이스를 변형해주는 명령어이며 이 명령어에 옵션으로 dev를 설정해줘야 client까지 자동으로 생성해준다.

## tips

- prisma 2가 production 상태가 되어 더 이상 migrate 명령어에 --preview-feature를 사용하지 않아도 된다.

## issue

- windows 환경 postgresql과 prisma 연결 문제

Mac 환경에서는 개발 모드일 경우에는 postgresql user 비밀번호에 상관없이 접속이 가능한듯 하다. 윈도우에서는 postgresql에서 생성한 아이디와 일치하는 비밀번호가 필수

## dependencies

## devDependencies

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
