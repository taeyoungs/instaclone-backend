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

# 19 File Upload

## log

- User model에 bio, avatar 컬럼 추가
- Apollo가 이젠 file upload를 지원한다.

이전에는 늘상 그래왔듯이 REST API를 작성하여 클라이언트에서 파일을 업로드(파일을 담아 요청을 보내면)하면 백엔드가 파일을 받아 AWS S3 같은 외부 저장소에 파일을 업로드하고 파일의 URL 주소를 받아온다. 이 URL 주소를 데이터베이스에 저장하거나 graphql mutation과 함께 url 주소를 내보내는 방식이다.

- Graphql로 파일 업로드를 하기 위해선 Upload라는 타입을 사용해야 하는데 이는 Apollo Server가 스키마를 만들 때 자동으로 만들어서 지원하는 타입이다. 즉, Apollo Server가 스키마를 만들지 않는 이상 따로 만들어지지 않는다. 따라서, 기존에 graphql-tools를 이용해 스키마 파일을 만드는 방식에서 Apollo Server가 스키마 파일을 만들도록 변경한다.

- 실제로 서버에 업로드한 파일을 저장하는 경우는 없다. 여러 서버를 가동할 수도 있고 서버를 지우고 다른 서버를 활성화 시키는 경우도 있고 다른 이유도 있다. 일반적으로 외부 저장소에 파일을 업로드하지만 이후에 서버를 AWS 같은 곳에 올릴 때 그렇게 진행하도록 하고 현재는 node.js를 이용해 서버에 파일을 업로드 하는 방식으로 진행

- node 14와 apollo server 내의 graphql-upload의 오래된 버전이 호환되지 않으므로 apollo-server에서 apollo-server-express로 변경하여 graphql-upload를 다룰 수 있는 미들웨어를 추가하고 upload의 타입과 resolver를 따로 작성해서 schema에 추가해준다.

- uploads 폴더

서버 내 폴더인 uploads에 node.js 파일 시스템을 이용하여 파일을 저장하였다고 해도 현재의 apollo-server로는 해당 폴더를 읽고 사용자가 요청하는 파일을 찾을 수가 없다. (apollo server에 그런 설정이 존재하지 않음) 따라서, 이를 가능하게 하기 위해 (이미 앞서 graphql-upload 때문에 변경했지만) apollo-server 위에 express 서버를 두는 형식인 apollo-server-express로 서버를 변경한다.  
설정이 크게 달라지진 않는다. Apollo Server를 사용하지 않는게 아니라 express 서버를 추가로 사용하는 것이기 때문이다.

```ts
const { filename, createReadStream } = (await avatar) as GraphQLFileUpload;
const readStream = createReadStream();

const writeStream = createWriteStream(
  path.join(process.cwd(), 'uploads', filename)
);
readStream.pipe(writeStream);
```

## tips

- Altair

Graphql playground보다 더 다양한 기능을 제공해주는 playground? 라고 생각하면 된다. Graphql playground에서는 파일 업로드를 진행할 수 없으니 Altair로 넘어가서 진행

- GraphQLFileUpload type

```ts
import { ReadStream } from 'fs-capacitor';

export interface GraphQLFileUpload {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(options?: {
    encoding?: string;
    highWaterMark?: number;
  }): ReadStream;
}
```

## issue

- nodemon 서버 포트 겹치는 에러

서버를 재시작할 때 이전에 실행했던 process가 아직 종료되지 않아서 생기는 문제로 nodemon에게 delay 옵션을 줌으로써 해결할 수 있다.

- node 14하고 apollo server file upload 에러

Apollo 공식 문서에도 나와있는 사항인데 Apollo Server 내에서 graphql-uploads의 오래된 버전을 사용하고 있기 때문에 node 14하고 호환이 제대로 되지 않는다. Apollo Server의 다음 버전에서는 이 upload scalar는 없어질 예정이며, 행여나 이 upload를 사용하고 싶다면 apollo server의 upload를 막고 따로 graphql-uploads의 최신 버전을 설치하여 server에 추가해서 사용할 것을 권장하고 있다.

## dependencies

## devDependencies

# 20 Change Avatar

## log

- 사용자가 업로드하는 파일명이 겹치는 경우를 생각해서 나름? 고유한 파일명을 만들어 주자.

서버에 파일을 저장하는 것은 정상적인 방법이 아니다. 그저 익숙해지는 과정을 겪기 위해 이렇게 진행  
이후에는 AWS에 업로드하여 저장된 URL 경로를 받아와 사용한다.

```ts
let avatarUrl = null;
if (avatar) {
  const { filename, createReadStream } = (await avatar) as GraphQLFileUpload;
  const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
  const readStream = createReadStream();

  const writeStream = createWriteStream(
    path.join(process.cwd(), 'uploads', newFilename)
  );
  readStream.pipe(writeStream);
  avatarUrl = `http://localhost:4000/static/${newFilename}`;
}
```

## tips

## issue

- none

## dependencies

## devDependencies
