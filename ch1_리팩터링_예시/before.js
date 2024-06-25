function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 고객명: ${invoice.customer}`;
  const format = new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case "tradegy":
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy":
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 10000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new error(`알 수 없는 장르: ${play.type}`);
    }

    // 포인트 적립
    volumeCredits += Math.max(perf.audience - 30, 0);

    // 희극 관객 5명마다 추가 포인트 제공
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구내역 출력
    result += `${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    total += thisAmount;
  }

  result += `총액: ${format(totalAmount / 100)}`;
  result += `적립 point: ${volumeCredits}점`;

  return result;
}
