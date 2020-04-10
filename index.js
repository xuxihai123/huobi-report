const path = require('path');
const fs = require('fs');
const xlsx = require('node-xlsx');

function reportAnalysis(list) {
  let buyCurrency = 0;
  let selloutCurrency = 0;
  list.forEach((temp) => {
    if (temp.orderType === '买入') {
      buyCurrency += temp.totalPrice;
    } else {
      selloutCurrency += temp.totalPrice;
    }
  });
  return { buy: buyCurrency, sellout: selloutCurrency };
}

function parseQuestionExcel(buffer) {
  let sheets = xlsx.parse(buffer);
  let list = [];
  sheets.forEach((item) => {
    let cols = item['data'].slice(1);
    cols.forEach((col) => {
      // 0:"订单号"
      // 1:"交易类型"
      // 2:"是否大宗"
      // 3:"币种"
      // 4:"交易数量"
      // 5:"单价"
      // 6:"总价"
      // 7:"手续费"
      // 8:"点卡"
      // 9:"货币"
      // 10:"时间"
      // 11:"状态"
      // 12:"交易对象"
      // 13:"实名信息"
      list.push({
        orderId: col[0],
        orderType: col[1],
        isDZ: col[2],
        btcType: col[3],
        count: col[4],
        price: col[5],
        totalPrice: col[6],
        serviceCharge: col[7],
        pointCard: col[8],
        currency: col[9],
        time: col[10],
        status: col[11],
        trsObj: col[12],
        trsName: col[13],
      });
    });
  });
  return list;
}

module.exports = function(buffer) {
  const list = parseQuestionExcel(buffer);
  const reportData = reportAnalysis(list);
  console.log('买入总金额：' + reportData.buy);
  console.log('卖出总金额：' + reportData.sellout);
  console.log('收支统计：' + (reportData.sellout - reportData.buy));
};
