# 12 Configure Databases

## log

- 프론트엔드 배포는 Netlify를 이용
- 백엔드 서버를 배포했으니 기존에 사용하던 백엔드 주소를 배포한 서버의 주소로 변경
- url이 변경된 후에 새로 고침을 누르면 에러가 발생하는 것을 볼 수 있는데 이는 경로를 담당하는 주최가 nelify router로 설정되었기 때문이다. 따라서, react router로 이를 교체하는 작업이 필요하다. 즉, nelify router가 아닌 react에게 리다이렉트 하는 과정이 필요하다. => `public/_redirects`

## tips

## issue

- none

## dependencies

## devDependencies
