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
