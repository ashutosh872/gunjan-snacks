export const calculateCartTotals = (cartItems) => {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Count items with price > 100
  const qualifyingItemsCount = cartItems.reduce((sum, item) => {
    return item.price > 100 ? sum + item.quantity : sum;
  }, 0);

  const isDiscountUnlocked = qualifyingItemsCount >= 3;
  const itemsNeeded = Math.max(0, 3 - qualifyingItemsCount);
  
  // 5% discount when 3 or more items priced > 100 are in cart
  const discountRate = isDiscountUnlocked ? 0.05 : 0;
  const discountAmount = Math.round(subtotal * discountRate);

  // Free pickup packaging, ₹0 delivery (since it's self-pickup)
  const packagingFee = 0;
  const finalTotal = Math.max(0, subtotal - discountAmount + packagingFee);

  return {
    subtotal,
    qualifyingItemsCount,
    isDiscountUnlocked,
    itemsNeeded,
    discountRate: discountRate * 100, // 5%
    discountAmount,
    packagingFee,
    finalTotal
  };
};
