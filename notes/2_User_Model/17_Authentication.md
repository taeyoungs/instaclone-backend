# 17 Authentication

## log

- 로그인부터 로그인이 필요한 작업을 요청하기까지의 흐름

1. 사용자가 아이디(혹은 username, email)과 비밀번호를 보내 로그인을 시도
2. DB에 담긴 정보와 일치한다면 토큰을 발행하여 사용자에게 서버가 응답 메세지에 담아 보내준다.
3. 토큰을 받은 클라이언트는 토큰을 저장해놓은 뒤에 사용자가 로그인이 필요한 작업을 요청할 때마다 토큰을 같이 보내준다.
4. 토큰을 받은 서버는 자신이 가지고 있는 Key를 이용하여 토큰이 변형된지 확인하고 변형되지 않았으면 요청에 대한 응답을 한다.

- 토큰을 전달하는 가장 기초적인 방법에는 mutation argument로 같이 보내주는 방법이 있다.

이는 편해보일지 몰라도 모든 mutation 요청 또는 토큰이 필요한 모든 작업에 token을 argument로 전달해야하는 문제가 있다. 기본적으로 클라이언트에서 토큰을 담아 보내는 곳은 request header의 Authorization이다. Authorization에 토큰의 종류와 토큰값을 공백으로 구분하여 하나의 문자열로 만들어 보내곤 한다. ex) "Authorization": "Bearer (token)"

- context

모든 resolver에서 접근 가능한 정보를 넣을 수 있는 객체, context에 대한 설정은 서버 인스턴스를 생성해주는 Apollo Server 생성자에서 이루어지며, 함수 또는 객체를 지정할 수 있다.  
앞서 적었던 query나 mutation의 argument로 token을 전달하는 방법 대신 context에 token 또는 token으로 찾은 user를 넣어줌으로써 mutation이나 query에 일일히 argument로 전달하지 않고도 resolver에서 context를 통해 token이나 user를 얻을 수 있다.

```ts
const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    return {
      client,
      user: await getUser(req.headers.authorization || null),
    };
  },
});
```

- getUser function

Apollo Server 생성자에서 context에 대한 설정을 할 때 request header에 담긴 token을 이용하여 사용자를 찾아서 반환하는 함수를 작성하자. 이렇게 하면 매 요청마다 resolver에서 로그인한 유저의 정보를 알 수 있다. (token이 없거나 에러가 발생하면 null)

```ts
import jwt from 'jsonwebtoken';
import client from '../client';
import { TokenType } from '../type';

export const getUser = async (token: string | null) => {
  if (!token) {
    return null;
  }
  const { id } = jwt.verify(
    token,
    process.env.SECRET_KEY as string
  ) as TokenType;

  const user = await client.user.findUnique({
    where: {
      id,
    },
  });

  if (!user) {
    return null;
  } else {
    return user;
  }
};
```

## tips

## issue

- none

## dependencies

## devDependencies
