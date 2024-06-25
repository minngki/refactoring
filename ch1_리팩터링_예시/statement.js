import createStatementData from "./createStatementData";

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));

  function renderPlainText(data, plays) {
    let result = `청구 내역 고객명: ${data.customer}`;
    for (let perf of data.performances) {
      result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
    }
    result += `총액: ${usd(data.totalAmount)}`;
    result += `적립 point: ${data.totalVolumeCredits}점`;

    return result;
  }

  function htmlStatement(invoice, plays) {
    return renderHtml(createStatementData(invoice, plays));
  }

  function renderHtml(data) {
    // html 생성코드
    return data;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }
}
