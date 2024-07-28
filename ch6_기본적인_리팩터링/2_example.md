# 예시

## raw script
```javascript
function reportLines(aCustomer) {
    const lines = [];
    gatherCustomerData(lines, aCustomer);
    return lines;
}
function getherCustomerData(out, aCustomer) {
    out.push(['name', aCustomer.name]);
    out.push(['location', aCustomer.location]);
}
```

단순히 복붙 만으로 `getherCustomerData()`을 `reportLines()`로 인라인할 수 없다.
- 실수하지 않으려면 **한 문장씩 옮기는 것이 좋다.**
- `여러 문장을 호출한 곳으로 옮기기`를 적용해서 첫 문장부터 시작해보자.
  - **잘라내서, 붙이고, 다듬는 방식**

```javascript
function reportLines(aCustomer) {
    const lines = [];
    gatherCustomerData(lines, aCustomer);
    return lines;
}
function getherCustomerData(out, aCustomer) {
    out.push(['name', aCustomer.name]);
    out.push(['location', aCustomer.location]);
}
```

### step 1
```javascript
function reportLines(aCustomer) {
    const lines = [];
    lines.push(['name', aCustomer.name]);
    gatherCustomerData(lines, aCustomer);
    return lines;
}
function getherCustomerData(out, aCustomer) {
    out.push(['location', aCustomer.location]);
}
```

### step 2
```javascript
function reportLines(aCustomer) {
    const lines = [];
    lines.push(['name', aCustomer.name]);
    lines.push(['location', aCustomer.location]);
    gatherCustomerData(lines, aCustomer);
    return lines;
}
```