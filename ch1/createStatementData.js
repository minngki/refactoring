export default function createStatementData(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);

  return result;

  function enrichPerformance(aPerformance) {
    const calculator = new createPerformanceCalculator(
      // 생성자 대신 팩터리 함수 이용?
      aPerformance,
      playFor(aPerformance)
    );

    const result = Object.assign({}, aPerformance);
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits(result);
    return result;
  }

  function playFor(aPerformance) {
    // 인라인 함수로 변경하기 위함.
    // 임시 변수와 같은 로컬 범위에 존재하는 이름이 늘어나서 추출 작업이 복잡해진다.
    return plays[aPerformance.playID];
  }

  //   function amountFor(aPerformance) {
  // class로 이동했지만, 에러가 나지 않도록 원본 함수인 이 함수도 계산기를 이용하도록 수정한다.
  //     return new PerformanceCalculator(aPerformance, playFor(aPerformance))
  //       .amount;
  //   }

  function totalAmount(data) {
    return data.performances.reduce((total, p) => total + p.amount, 0);
  }

  function totalVolumeCredits(data) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
  }
}

function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case "tragedy":
      return new TragedyCalculator(aPerformance, aPlay);
    case "comedy":
      return new ComedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
}

class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }

  get amount() {
    throw new error(`서브클래스에서 처리하도록 설계되었습니다.`);
  }

  get volumeCredits() {
    return Math.max(this.performance.audience - 30, 0);
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount() {
    result = 40000;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount() {
    result = 30000;
    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20);
    }
    result += 300 * this.performance.audience;
    return result;
  }

  get volumeCredits() {
    return super.volumeCredits + Math.max(this.performance.audience / 5);
  }
}
