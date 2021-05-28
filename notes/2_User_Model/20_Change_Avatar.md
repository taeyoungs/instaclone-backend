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
