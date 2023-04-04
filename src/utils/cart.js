export function filterCart(cartItems) {
  let check = [];
  let result = { count: {}, items: [] };
  // filter the array of items
  result.items = cartItems.filter((i) => {
    const iName = i.model.replace(/ /g, "_");
    // check if the item is in the check array
    if (check.includes(i)) {
      // if it is, increment the count for that item
      result.count[iName] += 1;
      return false;
    } else {
      // if it is not, add it to the check array
      check.push(i);
      // set the count for that item to 1
      result.count[iName] = 1;
      return true;
    }
  });
  return result;
}
