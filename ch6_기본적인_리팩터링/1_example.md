# 1. 예시: 유효범위를 벗어나는 변수가 없을 때

## raw script
```javascript
function printOwing(invoice) {
    let outstanding = 0;
    console.log("*********************")
    console.log("****** 고객 채무 ******")
    console.log("*********************")
    
    // 미해결 채무(outstanding)를 계산한다.
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }
    
    // 마감일(dueDate)을 기록한다.
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+30);
    
    // 세부 사항을 출력한다.
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}
```
- `Clock.today` 시스템 시계를 감싸는 객체로, 
  - `Date.now()`처럼 시간을 알려주는 함수는 직접 호출하지 않는 것이 좋다.
  - 직접 호출하게 되면 테스트할 때 마다 결과가 달라져서 오류 상황을 재현하기 어렵다.


###  배너 출력 로직 및 세부 사항 출력을 함수로 추출하기
```javascript
function printOwing(invoice) {
    let outstanding = 0;

    printBanner()
    
    // 미해결 채무(outstanding)를 계산한다.
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }
    
    // 마감일(dueDate)을 기록한다.
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+30);

    printDetails()

    function printDetails() {
        console.log(`고객명: ${invoice.customer}`);
        console.log(`채무액: ${outstanding}`);
        console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
    }
}
function printBanner() {
    console.log("*********************")
    console.log("****** 고객 채무 ******")
    console.log("*********************")
}
```
- `printDetails()`를 `printOwing()`에 중첩되도록 정의한다. 
  - 이렇게 하면 추출한 함수에서 상위 함수에 정의된 모든 변수에 접근할 수 있다.
  - 하지만 중첩함수를 지원하지 않은 언어에서는 불가능하다.
  - 그럴 때는 함수를 최상위 수준으로 추출하는 문제로 볼 수 있다.
  - 따라서 원ㅇ본 함수에서만 접근할 수 있는 변수들에 특별히 신경 써야 한다.
  - 원본 함수의 인수나 그 함수 안에서 정의된 임시 변수가 여기 해당한다.

# 2. 예시: 지역 변수를 사용할 때
```javascript
function printOwing(invoice) {
    let outstanding = 0;

    printBanner()
    
    // 미해결 채무(outstanding)를 계산한다.
    for (const o of invoice.orders) {
        outstanding += o.amount;
    }
    
    recordDueDate(invoice)    
    printDetails(invoice, outstanding)
}

function printBanner() {
    console.log("*********************")
    console.log("****** 고객 채무 ******")
    console.log("*********************")
}

function printDetails(invocie, outstanding) {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}

function recordDueDate(invoice) {
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+30);
}
```
- 지역 변수가 (배열, 레코드, 객체와 같은) 데이터 구조라면 똑같이 매개변수로 넘긴 후 필드값을 수정할 수 있다.

# 3. 예시: 지역 변수의 값을 변경할 때
- 지역 변수에 값을 대입하게 되면 문제가 복잡해진다. 지금은 임시 변수만을 취급하겠다.
  - 만약 매개변수에 값을 대입하는 코드를 발견하면 곧바로 그 변수를 쪼개서 임시 변수를 새로 하나 만들어 그 변수에 대입하게 한다.
- 대입 대상이 되는 임시 변수는 크게 두 가지다.
  - 1. 변수가 추출된 코드 안에서만 사용할 때다. (즉, 이 변수는 추출된 코드 안에서만 존재한다.)
    - 변수가 초기화되는 지점과 실제로 사용되는 지점이 떨어져 있다면 `문장 슬라이드하기`를 활용하여 변수 조작을 모두 한 곳에서 처리하도록 모아두면 편핟.
  - 2. 변수가 추출한 함수 밖에서 사용될 때다.
     - 이럴 때는 변수에 대입된 새 값을 반환해야 한다.
```javascript
function printOwing(invoice) {
    printBanner()
    const outstanding = calculateOutstanding(invocie)
    recordDueDate(invoice)    
    printDetails(invoice, outstanding)
}

function printBanner() {
    console.log("*********************")
    console.log("****** 고객 채무 ******")
    console.log("*********************")
}

function printDetails(invocie, outstanding) {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}

function recordDueDate(invoice) {
    const today = Clock.today;
    invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate()+30);
}

function calculateOutstanding(invoice) {
    let result = 0;
    for (const o of invoice.orders) {
        result += o.amount;
    }
    return result;
}
```

> 💡 값을 반환할 변수가 여러 개라면 ?
>> 추출할 코드를 다르게 재구성해보자.
> - 함수가 값 하나만 반환하는 방식이 필자의 방식인데, 값을 하나만 반환하는 함수를 여러 개 만든다.
> - 한 함수에서 여러 값을 반환해야 한다면 값들을 레코드로 묶어서 반환해도 되지만, 임시 변수 추출 작업을 다른 방식으로 처리하는 것이 나을 때가 많다.
>   - 임시 변수를 질의 함수로 바꾸거나
>   - 변수를 쪼개는 식으로 처리한다.
>> 그렇다면 이렇게 추출한 함수를 최상위 수준 같은 다른 문맥으로 이동하려면 어떻게 해야 할까?
> - 필자는 단계를 작게 쪼개는데, 먼저 중첩 함수로 추출하고 나서 새로운 문맥으로 옮기는 걸 추천한다.
> - 하지만 변수를 처리하기 까다로워져서, 실제로 문맥을 옮겨보기 전에는 알지 못한다.
> - 따라서 중첩 함수로 추출할 수 있더라도 최소한 원본 함수와 같은 수준의 문맥으로 먼저 추출해보자.