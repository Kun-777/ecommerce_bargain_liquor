// update cart
// option {1}: increase quantity of {product} by 1
// option {-1}: decrease quantity of {product} by 1
// option {0}: completely remove {product}
const updateCartQty = async (product, option, cart, setCart) => {
  const item_index = cart?.items.findIndex((item) => item.id === product.id);
  if (option === 1) {
    if (item_index !== -1) {
      // item already in cart
      setCart((prev) => ({
        ...prev,
        items: [].concat(
          prev.items.slice(0, item_index),
          {
            ...prev.items[item_index],
            quantity: prev.items[item_index].quantity + 1,
          },
          prev.items.slice(item_index + 1)
        ),
        total_items: prev.total_items + 1,
      }));
    } else {
      // new item
      setCart((prev) => ({
        ...prev,
        items: [...prev.items, { ...product, quantity: 1 }],
        total_items: prev.total_items + 1,
      }));
    }
  } else if (option === -1) {
    if (cart?.items[item_index].quantity > 1) {
      setCart((prev) => ({
        ...prev,
        items: [].concat(
          prev.items.slice(0, item_index),
          {
            ...prev.items[item_index],
            quantity: prev.items[item_index].quantity - 1,
          },
          prev.items.slice(item_index + 1)
        ),
        total_items: prev.total_items - 1,
      }));
    } else {
      setCart((prev) => ({
        ...prev,
        items: [].concat(
          prev.items.slice(0, item_index),
          {
            ...prev.items[item_index],
            quantity: 0,
          },
          prev.items.slice(item_index + 1)
        ),
        total_items: prev.total_items - 1,
      }));
    }
  } else if (option === 0) {
    setCart((prev) => ({
      ...prev,
      items: [].concat(
        prev.items.slice(0, item_index),
        {
          ...prev.items[item_index],
          quantity: 0,
        },
        prev.items.slice(item_index + 1)
      ),
      total_items: prev.total_items - prev.items[item_index].quantity,
    }));
  }
};

export default updateCartQty;
