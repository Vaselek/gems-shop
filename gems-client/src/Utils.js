export const endPrice = (price, discount) => {
  const priceInFloat = parseFloat(price);
  const discountInFloat = parseFloat(discount);
  return Math.floor(priceInFloat - priceInFloat * discountInFloat/100)
};