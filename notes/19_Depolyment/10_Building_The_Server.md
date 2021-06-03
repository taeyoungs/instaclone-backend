# 10 Building The Server

## log

- nodemon과 babel-node는 개발 편의성을 위해 추가한 패키지이기 때문에 production mode에서 사용하면 안된다.

  특히나 babel-node는 babel 홈페이지의 설명에 따르면 무겁고, 메모리를 많이 사용하며 초기 구동 퍼포먼스에 영향을 줄 수 있다고 설명되어있다.

- @babel/cli

  babel을 package.json으로부터 실행할 수 있게 만들어주는 도구

- regeneratorRuntime error

  `Babel`은 최신 자바스크립트 문법(ES6+)을 ES5를 지원하는 하위 브라우저에서도 사용할 수 있게 파일을 변환해주는 트랜스파일러다. 하지만 새롭게 추가된 전역 객체들(Promsie, Set, Map ...)과 String.padStart 등 전역 객체에 추가된 메서드들은 트랜스파일링만으로 해결하기 어렵기 때문에 `core-js`나 `regenerator-runtime`과 같은 별도의 polyfill(이하 폴리필)이 필요하다.  
  `Babel` 기반에서 폴리필을 추가하는 방법은 두 가지가 존재한다. `babel-polyfill`을 사용하는 방법과 `@babel/plugin-transform-runtime`을 사용하는 방법이다.

- babel-polyfill

  `babel-polyfill`은 내부적으로 페북에서 만든 Generator Function 폴리필인 `regenerator runtime`과 ES5/6/7 폴리필인 `core-js`를 주요 디펜던시로 가지고 있다. 가장 유명하고 안정적인 폴리필들을 사용하기 편리하게 랩핑해 놓은 모듈이라고 생각하면 편하다.

- @babel/plugin-transform-runtime

  `babel-polyfill` 외에 또 하나의 방법은 `@babel/plugin-transform-runtime` 플러그인을 사용해서 Babel이 트랜스파일링을 하는 과정에서 폴리필이 필요한 부분을 내부의 헬퍼 함수를 사용하도록 치환해주는 방법이다.  
  `Babel`은 내부적으로 `_extend`처럼 공통 함수를 위한 작은 헬퍼들을 사용하는데, 기본적으로 모든 파일에 이런 헬퍼들이 추가되기 때문에 이런 낭비를 막기 위해 `transform-runtime` 플러그인을 사용해서 모든 헬퍼들이 `babel-runtime`이라는 모듈을 참조하도록 해준다. `@babel/plugin-transform-runtime`은 플러그인이기 때문에 빌드 단계에서 동작하게 된다.  
  `@babel/plugin-transform-runtime` 플러그인은 내부적으로 `babel-runtime`을 디펜던시로 갖는데, `babel-runtime`은 또 `core-js`와 `regenerator-runtime`을 디펜던시로 갖는다. 자동적으로 `babel-runtime/regenerator`와 `babel-runtime/core-js`를 내장하게 되며 트랜스파일링 과정에서 인라인 `Babel` 헬퍼들을 제거하고 `babel-runtime/helper`들을 사용하도록 변경하게 된다.

- babel-plugin-transform-runtime & babel-runtime

  두 패키지 모두 설치해야 하는 이유는 babel-plugin-transform-runtime이 트랜스파일링 과정에서 내부 헬퍼들을 babel-runtime 모듈을 참조하도록 변경해주면 babel-runtime이 실제 실행 환경에서 헬퍼 함수들이 참조할 수 있는 폴리필으 내장한 모듈로 동작하게 된다.

  [reference](https://programmingsummaries.tistory.com/401)

```json
// babel.config.json
{
  "plugins": ["@babel/plugin-transform-runtime"]
}
```

## tips

- TypeScript 사용 시 babel로 트랜스파일링하기 위해서는 @babel/preset-typescript와 script에서 babel 명령어에 옵션 추가가 필요하다. `--extensions ."ts"`이라고 홈페이지에는 나와있는데 windows 환경에서는 ""가 제거되어야 정상적으로 동작한다.

```json
// paackge.json
{
  "build": "babel src --out-dir build --extensions .ts",
  "start": "node build/server"
}
// babel.config.json
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript"]
}
```

## issue

- none

## dependencies

## devDependencies
