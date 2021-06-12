# 22 Upload to AWS S3

## log

- AWS IAM, S3 Bucket 생성

  버킷에 대한 접근 권한을 부여한 사용자(IAM)과 애플리케이션에 업로드하는 이미지를 저장할 Bucket 생성

- AWS S3 Bucket config update

```ts
AWS.config.update({
  credentials: {
    accessKeyId: process.env.AWS_S3_KEY as string,
    secretAccessKey: process.env.AWS_S3_SECRET as string,
  },
});
```

- Upload file to AWS S3

```ts
const BUTKET_NAME = 'nomad-uploader';

export const uploadToS3 = async (
  file: GraphQLFileUpload,
  userId: number,
  folderName: string
) => {
  const { filename, createReadStream } = await file;
  const newFilename = `insta/${folderName}/${userId}-${Date.now()}-${filename}`;
  const readStream = createReadStream();
  const { Location } = await new AWS.S3()
    .upload({
      Bucket: BUTKET_NAME,
      Key: newFilename,
      ACL: 'public-read',
      Body: readStream,
    })
    .promise();

  return Location;
};
```

- 업로드 하기 전에 사용자 정보에 avatarUrl 정보가 있다면 S3에서 해당 이미지 삭제 후 업로드

```ts
const FOLDER_PATH = 'insta/avatar/';

export const deleteUploadedFile = async (path: string) => {
  const filename = path.split(`/${FOLDER_PATH}`)[1];
  const filepath = `${FOLDER_PATH}${filename}`;

  const params = {
    Bucket: BUTKET_NAME,
    Key: filepath,
  };

  try {
    await s3.headObject(params).promise();

    try {
      await s3.deleteObject(params).promise();
    } catch (error) {
      console.warn(error);
    }
  } catch (error) {
    console.log(error.code);
  }
};
```

## tips

## issue

- morgan tsError

  aws-sdk를 사용하기 위해서 @types/node를 추가한 이후로 morgan에서 tsError가 발생, 최대한 검색해봤는데 결과가 잘 안나오는 거 보면 검색 키워드를 잘못 잡고 있는 듯 하다. 우선 morgan을 사용하지 않는 방향으로 조치

## dependencies

## devDependencies

- @types/node: ^15.12.2
- aws-sdk: ^2.927.0
