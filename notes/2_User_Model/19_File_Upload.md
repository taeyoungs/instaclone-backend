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
