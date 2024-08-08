# 1. 예시: 함수 이름 바꾸기(간단한 절차)
## raw script
```javascript
function circum(radius) {
    return 2 * Math.PI * radius;
}
```

```javascript
function circumference(radius) {
    return 2 * Math.PI * radius;
}
```

# 2. 예시: 함수 이름 바꾸기(마이그레이션 절차)
```javascript
function circum(radius) {
    return circumference(radius);
}
function circumference(radius) {
    return 2 * Math.PI * radius;
}
```

# 3. 예시: 매개변수 추가하기
## raw script
```javascript
addReservation(customer) {
    this._reservations.push(customer);
}
```
> 만약 우선순위 큐를 지원하라는 새로운 요구가 추가되었다면 ?

### step 1
```javascript
addReservation(customer) {
    this.zz_addReservation(customer);
}

zz_addReservation(customer) {
    this._reservations.push(customer);
}
```
- 먼저 `addReservation()`의 본문을 새로운 함수로 임의의 함수명으로 추출한다.

### step 2
```javascript
addReservation(customer) {
    this.zz_addReservation(customer, false);
}

zz_addReservation(customer, isPriority) {
    this._reservations.push(customer);
}
```
- 새 함수의 선언문과 호출문에 원하는 매개변수를 추가한다.

### step 3
```javascript
zz_addReservation(customer, isPriority) {
    assert(isPriority === true || isPriority === false)
    this._reservations.push(customer);
}
```
- 호출문을 변경하기 전에 **어서션을 추가하여 호출하는 곳에서 새로 추가한 매개변수를 실제로 사용하는지 확인**한다.
- 이렇게 해두면 호출문을 수정하는 과정에서 실수로 새 매개변수를 빠뜨린 부분을 찾는데 도움이 된다.
- 이제 기존 함수를 인라인하여 호출 코드들이 새로운 함수를 이욯다로고 고친다. 호출문은 한 번에 하나씩 변경한다.

### step 4
```javascript
addReservation(customer, isPriority) {
    assert(isPriority === true || isPriority === false)
    this._reservations.push(customer);
}
```
- 다 고쳤다면 새 함수의 이름을 기존 함수의 이름으로 바꾼다.

# 4. 예시: 매개변수를 속성으로 바꾸기
## raw script
```javascript
function inNewEngland(aCustomer) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(aCustomer.address.state);
}
const newEnglanders = someCustomers.filter(c=> inNewEngland(c));
```
- 함수 선언을 바꿀 때 함수 추출부터 해보자. 그러나 이번 코드는 함수 본문을 살짝 리팩터링해두면 이후 작업이 더 수월해지니 먼저 작업해보자.

### step 1
```javascript
function inNewEngland(aCustomer) {
    const stateCode = aCustomer.address.state;
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}
```
- 매개변수로 사용할 코드를 변수로 추출한다.

### step 2
```javascript
function inNewEngland(aCustomer) {
    const stateCode = aCustomer.address.state;
    return xxNEWinNewEngland(stateCode);
}
function xxNEWinNewEngland(stateCode) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}
```
- `함수 추출하기`로 새 함수를 만든다.

### step 3
```javascript
function inNewEngland(aCustomer) {
    return xxNEWinNewEngland(aCustomer.address.state);
}
const newEnglanders = someCustomers.filter(c=> xxNEWinNewEngland(c));
```
- `함수 인라인하기`로 기존 함수의 본문을 호출문에 집어넣는다.
  - 실질적으로 기존 함수 호출문을 교체하는 셈.

### step 4
```javascript
const newEnglanders = someCustomers.filter(c=> inNewEngland(c.address.state));

function inNewEngland(stateCode) {
    return ["MA", "CT", "ME", "VT", "NH", "RI"].includes(stateCode);
}
```
- 교체(인라인)했다면, `함수 선언 바꾸기`를 통해 새 함수의 이름을 기존 함수의 이름으로 변경한다.

