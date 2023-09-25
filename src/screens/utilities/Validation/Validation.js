export const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
export const validationPhone = phone => {
  return String(phone).match(/^\+[0-9]+$/);
};
const maxLengthCount = (amount, count, decimalPlaces) => {
  const fixedValue = amount;
  const value = fixedValue?.split('.');
  if (
    value[1]?.length < Number(decimalPlaces) ||
    fixedValue?.length === count.current
  ) {
    count.current = value[0]?.length + (Number(decimalPlaces) + 1);
  } else if (fixedValue > Number(decimalPlaces)) {
    count.current = 8;
  }
};


export const debounceValidation = (
  num,
  beforeDecimal = 8,
  afterDecimal = 2,
  countLength,
) => {
  const value = num
    .replace(/[^\d.]/g, '')
    .replace(new RegExp('(^[\\d]{' + beforeDecimal + '})[\\d]', 'g'), '$1')
    .replace(/(\..*)\./g, '$1')
    .replace(new RegExp('(\\.[\\d]{' + afterDecimal + '}).', 'g'), '$1');
  maxLengthCount(value, countLength, afterDecimal);
  return value;
};
