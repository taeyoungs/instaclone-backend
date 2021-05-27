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
