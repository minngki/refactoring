function statement(invoice) {
  let result = `청구 내역 고객명: ${invoice.customer}`;

  for (let perf of invoice.performances) {
    // 청구내역 출력
    result += `${playFor(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    }석)\n`;
  }

  result += `총액: ${usd(totalAmount())}`;
  result += `적립 point: ${totalVolumeCredits()}점`;

  return result;

  function amountFor(aPerformance) {
    let result = 0;

    switch (playFor(perf).type) {
      case "tradegy":
        thisAmount = 40000;
        if (aPerformance.audience > 30) {
          thisAmount += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (aPerformance.audience > 20) {
          thisAmount += 10000 + 500 * (aPerformance.audience - 20);
        }
        thisAmount += 300 * aPerformance.audience;
        break;
      default:
        throw new error(`알 수 없는 장르: ${playFor(perf).type}`);
    }

    return result;
  }

  function playFor(aPerformance) {
    // 인라인 함수로 변경하기 위함.
    // 임시 변수와 같은 로컬 범위에 존재하는 이름이 늘어나서 추출 작업이 복잡해진다.
    return plays[aPerformance.playID];
  }

  function volumeCreditsFor(perf) {
    let result = 0;

    // 포인트 적립
    result += Math.max(perf.audience - 30, 0);

    // 희극 관객 5명마다 추가 포인트 제공
    if ("comedy" === playFor(perf).type)
      result += Math.floor(perf.audience / 5);

    return result;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }
}
