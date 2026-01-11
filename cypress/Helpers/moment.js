import moment from "moment";

const currentDate = moment().format('DD.MM.YYYY');
const beforeCurrentDate = moment().subtract(1, 'days').format('DD.MM.YYYY');
const afterCurrentDate = moment().add(1, 'days').format('DD.MM.YYYY');
export { currentDate, beforeCurrentDate, afterCurrentDate };
console.log(currentDate);
console.log(beforeCurrentDate);
console.log(afterCurrentDate);
