# 13 See Hashtag

## log

- totalPhoto

  hashtag 타입의 resolver라고 hashtag 테이블만 조회할 필요는 없다. 해당 해시태그를 가지고 있는 사진의 개수를 구하는 필드이므로 Hashtag_Photo 테이블에서 해당 해시태그의 id값을 가지고 있는 컬럼의 수를 센다. (= 해당 해시태그를 가지고 있는 사진들)

- field arguments

  resolver에 argument를 전달하는 것은 이미 계속해서 해오던 일이다. 하지만 필드에도 argument를 전달할 수 있다면? computed field로 만들 필드의 resolver가 argument를 받을 수 있도록 필드에 argument를 전달할 수 있다.

## tips

## issue

- none

## dependencies

## devDependencies
