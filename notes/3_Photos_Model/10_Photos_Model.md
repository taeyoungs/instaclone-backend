# 10 Photos Model

## log

- 실제 인스타그램 처럼 사용자가 올리는 이미지 파일을 담당하는 Photo Model을 생성

Photo Model은 사용자의 id 값을 외래키로 갖는다. (어느 사용자가 올린 이미지인지 알 수 있어야 하므로)

- 인스타그램에는 해쉬태그(#) 기능이 존재하는데 이를 위해 해쉬태그를 관리하는 Model이 존재해야 한다.

Hashtag와 Photo Model은 다대다 관계로 하나의 Photo가 여러 개의 Hashtag를 가질 수 있고 하나의 Hashtag가 여러 개의 Photo를 가질 수도 있다. (사진에 여러 개의 #를 걸어놓을 수도 있고 #keyword가 걸린 사진은 여러 개일 수도 있기 때문에)

## tips

## issue

- none

## dependencies

## devDependencies
