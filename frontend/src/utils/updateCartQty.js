// update cart
// option {1}: increase quantity of {product} by 1
// option {-1}: decrease quantity of {product} by 1
// option {0}: completely remove {product}
const updateCartQty = async (product, option, cart, setCart) => {
  const item_index = cart?.items.findIndex((item) => item.id === product.id);
  if (option === 1) {
    if (item_index !== -1) {
      // item already in cart
      // quantity in cart must not be greater than inventory
      if (cart.items[item_index].quantity < product.inventory) {
        setCart((prev) => ({
          ...prev,
          items: [].concat(
            prev.items.slice(0, item_index),
            {
              ...prev.items[item_index],
              quantity: prev.items[item_index].quantity + 1,
              synced: false,
            },
            prev.items.slice(item_index + 1)
          ),
          total_items: prev.total_items + 1,
          subtotal: prev.subtotal + product.price,
          modified: true,
        }));
      } else {
        alert("Sorry :( that's all we have left.");
      }
    } else {
      // new item
      setCart((prev) => ({
        ...prev,
        items: [...prev.items, { ...product, quantity: 1, synced: false }],
        total_items: prev.total_items + 1,
        subtotal: prev.subtotal + product.price,
        modified: true,
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
            synced: false,
          },
          prev.items.slice(item_index + 1)
        ),
        total_items: prev.total_items - 1,
        subtotal: prev.subtotal - product.price,
        modified: true,
      }));
    } else {
      setCart((prev) => ({
        ...prev,
        items: [].concat(
          prev.items.slice(0, item_index),
          {
            ...prev.items[item_index],
            quantity: 0,
            synced: false,
          },
          prev.items.slice(item_index + 1)
        ),
        total_items: prev.total_items - prev.items[item_index].quantity,
        subtotal:
          prev.subtotal - prev.items[item_index].quantity * product.price,
        modified: true,
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
          synced: false,
        },
        prev.items.slice(item_index + 1)
      ),
      total_items: prev.total_items - prev.items[item_index].quantity,
      subtotal: prev.subtotal - prev.items[item_index].quantity * product.price,
      modified: true,
    }));
  }
};

export default updateCartQty;
