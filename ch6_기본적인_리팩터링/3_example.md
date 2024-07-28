# 예시: 클래스 안에서
## raw data
```javascript
class Order {
    constructor(aRecord) {
        this._data = aRecord
    }
    
    get quantity() {return this._data.quantity;}
    get itemPrice() {return this._data.itemPrice;}
    
    get price() {
        return this.quantity * this.itemPrice -
        Math.max(0, this.quantity - 500) * this.itemPrice * 0.05 +
        Math.min(this.quantity * this.itemPrice * 0.1, 100);
    }
}
```
- 메서드 범위를 넘어 주문을 표현하는 Order 클래스 전체에 적용된다.
- 이처럼 클래스 전체에 영향을 줄 때 변수가 아닌 메서드로 추출해보자.


```javascript
class Order {
    constructor(aRecord) {
        this._data = aRecord
    }
    
    get quantity() {return this._data.quantity;}
    get itemPrice() {return this._data.itemPrice;}
    
    get price() {
        return basePrice + this.quantity - this.shipping;
    }

    get basePrice() {
        return order.quantity * order.itemPrice;
    }
    get quantityDiscount() {
        return Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
    }
    get shipping() {
        return Math.min(order.quantity * order.itemPrice * 0.1, 100);
    }
}
```