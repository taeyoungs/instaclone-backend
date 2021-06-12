# 20 Delete Comment and Photo

## log

- Check First

  추가한 기능이 잘 동작하려면 예외 상황에 대한 대처는 필수다. 따라서, 삭제하려는 Comment나 Photo가 존재하는지, Comment나 Photo의 주인과 로그인한 사용자가 일치하는지 체크할 필요가 있다.

- prisma에서 아직 cascade delete를 지원하지 않기 때문에 라이브러리를 추가해서 사용하지 않는 이상 무언가를 삭제하기 전에 삭제할 데이터와 연관된 데이터를 먼저 삭제해주는 작업이 필요하다.

## tips

## issue

- none

## dependencies

## devDependencies
