export function formatPrice(totalPrice: number, discount: number): number {
  return parseFloat((totalPrice - (discount / 100) * totalPrice).toFixed(2));
}

export function savePrice(totalPrice: number, discount: number) {
  return (totalPrice - (totalPrice - (discount / 100) * totalPrice)).toFixed(2);
}

export function formatDate(date: Date) {
  const formattedDate = new Intl.DateTimeFormat('en-AU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);

  return formattedDate;
}

export function getInitials(name: string) {
  const names = name.split(' ');
  return `${names[0][0]}${names[1][0]}`;
}

export function formatPriceToCurrency(price: number) {
  return new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
