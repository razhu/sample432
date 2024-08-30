export const uptoTwoDecimal = (value) => {
  const number = Number(value);
  return Math.floor(number * 100) / 100;
};
