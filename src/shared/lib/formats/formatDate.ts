export const formatDate = (date: string | Date, locale: string = 'ru-RU'): string => {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
};
