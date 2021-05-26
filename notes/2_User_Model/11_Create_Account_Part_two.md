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
