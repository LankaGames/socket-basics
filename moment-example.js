var moment = require("moment");
var now = moment();


console.log(now.format());
var timeStamp = now.valueOf();
console.log(moment.utc(timeStamp).local().format('h:mma'));