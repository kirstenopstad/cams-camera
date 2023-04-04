export function filterCart(cartItems) {
  let check = [];
  let result = { count: {}, items: [] };
  result.items = cartItems.filter((i) => {
    const iName = i.model.replace(/ /g, "_");
    if (check.includes(i)) {
      result.count[iName] += 1;
      return false;
    } else {
      check.push(i);
      result.count[iName] = 1;
      return true;
    }
  });
  return result;
}
