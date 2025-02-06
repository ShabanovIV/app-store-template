export const formatNumber = (number: number, locale: string = 'ru-RU'): string => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number);
};
