export function getNetEaseKey(currentDate = new Date()) {
  const weekNumber = getWeekNumber(currentDate);
  const index = weekNumber % 4;
  const sign = ['#', '$', '%', '&'][index];

  const firstChar = String.fromCharCode(weekNumber + 65);
  const secondChar = String.fromCharCode((weekNumber % 3) + 97);
  const thirdChar = String.fromCharCode((weekNumber % 4) + 97);
  const fourthChar = String.fromCharCode((weekNumber % 12) + 65);

  return firstChar + 't' + sign + secondChar + 'w' + thirdChar + 'k' + fourthChar;
}

function getWeekNumber(currentDate = new Date()) {
  const startDate = new Date(currentDate.getFullYear(), 0, 1);
  var days = Math.floor((currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000));

  return Math.ceil(days / 7);
}
