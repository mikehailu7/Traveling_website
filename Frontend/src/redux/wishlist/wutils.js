export const addItemToCart = (allItems, newItem) => {
  const itemExists = allItems.find((item) => item.id === newItem.id);

  if (itemExists) return allItems;
  // if (itemExists) {
  //   return allItems.map((item) => {
  //     if (item.id === newItem.id) {
  //       return { ...item, quantity: item.quantity + 1 };
  //     } else {
  //       return item;
  //     }
  //   });
  // }

  return [...allItems, newItem];
};

export const removeItemFromCart = (allItems, currentItem) => {
  const itemFound = allItems.find((item) => item.id === currentItem.id);

  if (itemFound.quantity === 1) {
    return allItems.filter((item) => item.id !== currentItem.id);
  } else {
    return allItems.map((item) => {
      if (item.id === currentItem.id) {
        return { ...item, quantity: item.quantity - 1 };
      } else {
        return item;
      }
    });
  }
};
