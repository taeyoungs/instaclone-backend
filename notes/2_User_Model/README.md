# 10 Create Account Part one

## log

- Prisma Schema에 User model 추가 후 migrate
- User에 관한 typeDefs, Query, Mutation을 담아둘 폴더 추가
- Mutation: createAccount
- Query: seeProfile
- TypeDefs: User (password 제외, 일반적으로 비밀번호를 요청하는 일은 없음)

## tips

## issue

- none

## dependencies

## devDependencies

# 11 Create Account Part two

## log

- schema에 unique 옵션으로 이미 존재하는 데이터일 경우 DB가 에러를 발생시킬 수 있도록 하자.

하지만 DB 에러는 정말 최후의 방법이므로 User가 DB 에러를 만나게 해서는 안된다. DB 에러에 너무 의존하지 말고 DB 에러 이전에 코드 상에서 에러를 확인할 수 있어야 한다. User가 DB 에러를 만났다는 건 프로그래머가 그만큼 체크하지 않았다는 이야기이다.

- prisma client **findFirst**: 조건에 맞는 첫 번째 요소를 반환
- DB에 접근하는 client 메서드는 Promise를 반환하기 때문에 실행 순서를 보장받기 위해선 async & await를 사용해야 한다.

## tips

## issue

- none

## dependencies

## devDependencies

# 12 Create Account Part three

## log

- hash password

누군가가 비밀번호를 보게 하는 것은 싫지만 비밀번호는 기억할 필요가 있는 상황, 이를 위해 hash를 이용해 비밀번호를 변형한다. 조금 더 자세히 정리하자면 계정과 솔트(salt)/해쉬값(hash)을 저장해두고, 입력한 비밀번호가 맞는지 체크할 때 비밀번호+솔트로 해쉬값과 같은지 비교한다. 같은 입력값에 대한 출력값, 즉 해쉬값은 같으므로 맞는 패스워드라고 할 수 있다.  
또한 해쉬함수는 단방향 함수이기 때문에 비밀번호를 찾을 수 없다. 요즘에 비밀번호 변경이 사라지고 재설정이 존재하는 이유이다.

- bycrpt

해시 함수를 비롯한 다양한 보안 관련 함수들을 제공해주는 패키지, bycrpt의 hash 메서드를 사용하면 비밀번호와 솔트값이 입력값으로 들어간 해쉬값이 반환된다.

## tips

- 레인보우 테이블

솔트가 없는 상황에서 미리 해쉬값을 만들어놓은 것인데 해쉬값의 모든 경우의 수를 나열해놓은 테이블이라고 생각하면 된다.

- salt

레인보우 테이블 공격을 막기 위한 랜덤 문자열, 각 유저마다 랜덤하게 만든 솔트 문자열을 갖게 되고 문자열엔 소문자, 숫자 등이 포함되어 있어 경우의 수가 엄청나게 증가한다. 레인보우 테이블은 솔트가 없는 상황에서 만들어 놓은 값들인데 솔트가 존재하는 순간 레인보우 테이블을 새로 만들어야 하고 사용자마다 다른 솔트값을 가지고 있기 때문에 1명의 유저의 비밀번호를 알아내기도 힘들게 된다.

## issue

- none

## dependencies

- bcrypt: ^5.0.1

## devDependencies

- @types/bcrypt: ^5.0.0

# 13 See Profile

## log

- async & await 문법을 사용할 때 에러 핸들링을 하기 위해서는 try ~ catch문을 사용하자. Promise를 사용할 때 후속 처리 메서드 catch를 사용해서 에러를 잡아내듯 try문 안에서 발생한 에러를 catch문에서 받아 처리를 할 수 있다.
- OR 키워드로 동일한 username/email의 사용자 이미 존재하는지 확인했고 존재한다면 existingUser 변수에 담아내도록 했다. existingUser이 null이 아니라면 에러를 던져(`throw new Error()`) catch문에서 에러를 반환 또는 처리 + 반환을 해주자.

## tips

- `findUnique` 메서드는 prisma schema에서 unique 옵션이 설정된 컬럼만 검색 조건으로 사용할 수 있다.

## issue

- none

## dependencies

## devDependencies

# 14 Login and Refactor

## log

- login에서 에러를 핸들링하는 방법이 seeProfile과는 조금 다른데 login과 같이 에러의 내용을 담아 반환해줌으로써 이후에 프론트엔드에서 이를 화면에 표시해줄 수도 있기 때문에 단순히 에러를 발생시켜서 멈추기 보다는 현재 상태와 에러 메세지를 담은 객체를 반환해준다. (seeProfile도 나중에 이런 방식으로 에러 핸들링할 예정)
- 프론트엔드와 백엔드가 분리되어 있으니 Cookie와 Session을 사용하기 보다는 JSON Web Token을 사용하여 사용자의 로그인 여부를 체크한다.

서버에서 JSON Web Token을 생성할 때 서명을 추가하게 되고 클라이언트로부터 토큰을 받게 됐을 때 서명이 일치하는지를 확인하여 서버에서 보낸 토큰이 맞는지 확인한다. 토큰의 목적은 중요한 정보를 담아서 이를 주고 받는 것이 아니라 **토큰 안에 정보를 담고 해당 토큰이 서버에서 사인한 토큰인지 확인하는 것**이다.  
물론 서버에서 토큰을 사인할 때 사용하는 Key는 절대 공개되선 안되므로 env 파일에 보관한다. 추가로 토큰에는 유효 기간 등 다양한 옵션을 설정할 수도 있다.

- Resolver 이름으로 리팩토링

점점 많아지는 typeDefs와 mutation, query를 대비하여 기존 model 이름으로 된 폴더 안에 3가지를 작성한 구조에서 한번 더 분리하여 Resolver 이름으로 폴더를 생성한 뒤 typeDefs, mutation 그리고 query를 작성해주도록 하자. Divide and Conquer !

## tips

## issue

- none

## dependencies

## devDependencies

# 17 Authentication

## log

- 로그인부터 로그인이 필요한 작업을 요청하기까지의 흐름

1. 사용자가 아이디(혹은 username, email)과 비밀번호를 보내 로그인을 시도
2. DB에 담긴 정보와 일치한다면 토큰을 발행하여 사용자에게 서버가 응답 메세지에 담아 보내준다.
3. 토큰을 받은 클라이언트는 토큰을 저장해놓은 뒤에 사용자가 로그인이 필요한 작업을 요청할 때마다 토큰을 같이 보내준다.
4. 토큰을 받은 서버는 자신이 가지고 있는 Key를 이용하여 토큰이 변형된지 확인하고 변형되지 않았으면 요청에 대한 응답을 한다.

- 토큰을 전달하는 가장 기초적인 방법에는 mutation argument로 같이 보내주는 방법이 있다.

이는 편해보일지 몰라도 모든 mutation 요청 또는 토큰이 필요한 모든 작업에 token을 argument로 전달해야하는 문제가 있다. 기본적으로 클라이언트에서 토큰을 담아 보내는 곳은 request header의 Authorization이다. Authorization에 토큰의 종류와 토큰값을 공백으로 구분하여 하나의 문자열로 만들어 보내곤 한다. ex) "Authorization": "Bearer ~token~"

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
