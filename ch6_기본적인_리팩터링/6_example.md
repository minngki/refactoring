# 1. 예시
## raw script
```javascript
let defaultOwner = {firstName: "Martin", lastName: "Pauler"};

// ..
spaceship.owner = defaultOwner;
// ..
defaultOwner = {firstName: "Lebecca", lastName: "Parson"};
```

```javascript
function getDefaultOwner() {return defaultOwner;}
function setDefaultOwner(arg) {defaultOwner=arg;}
```
1. 기본적인 캡슐화를 위해 가장 먼저 데이터를 읽고 쓰는 함수부터 정의한다.

```javascript
spaceship.owner = getDefaultOwner();
// ..
setDefaultOwner({firstName: "Lebecca", lastName: "Parson"});
```
2. defaultOwner를 참조하는 코드를 찾아서 방금 만든 게터 함수를 호출하도록 고친다.

```javascript
let defaultOwner = {firstName: "Martin", lastName: "Pauler"};
export function getDefaultOwner() {return defaultOwner;}
export function setDefaultOwner(arg) {defaultOwner=arg;}
```
3. 모든 참조를 수정했다면 이제 변수의 가시 범위를 제한한다. 
   - 그러면 미처 발견치 못한 참조가 있는지 확인할 수 있고, 
   - 나중에 수정하는 코드에서도 이 변수에 직접 접근하지 못하게 만들 수 있다.
   - 자바스크립트로 작성할 땐, 변수와 접근자 메서드를 같으 파일로 옮기고 접근자만 `export`시키면 된다.
