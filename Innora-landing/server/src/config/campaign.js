// Single source of truth for pricing — the client only displays these values.
export const campaign = {
  unitPrice: 599,
  regularPrice: 1250,
  codDeliveryFee: 100,
  advanceDeliveryFee: 0,
  maxQty: 20,
  paymentNumber: '01989399740',
  variants: ['pink', 'burgundy', 'black'],
};

export function ticketsFor(qty) {
  if (qty === 1) return 1;
  if (qty === 2) return 3;
  return Math.floor(qty * 1.5);
}

export function billFor(qty, paymentMethod) {
  const subtotal = qty * campaign.unitPrice;
  const deliveryFee = paymentMethod === 'advance' ? campaign.advanceDeliveryFee : campaign.codDeliveryFee;
  return { subtotal, deliveryFee, total: subtotal + deliveryFee };
}
