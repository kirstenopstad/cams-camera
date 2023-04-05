// takes in quoteData object and builds quote message
const buildQuote = (quoteData) => {
  let delivery = quoteData.delivery ? `Yes` : `No`
  let address = quoteData.delivery ? `${quoteData.address}` : `N/A`
  // TODO: format equipment list
  // let equipment = 
  // quoteData.cart.map((item) => 
  //   `(${item.quantity}) ${item.brand} ${item.model}
  //   `
  // )
  // equipment = equipment.filter(char => char === ',')

  
  let quote = `
  Thank you for choosing Cam's Camera. Please check that this information is accurate and complete. Note that this represents an estimated cost and does not include tax.

  Quote Date: ${quoteData.quoteDate}
  Quote #: ${quoteData.quoteNumber}

  Disclaimer: Estimated price only valid for 2-week period
  Disclaimer: Equipment will not be held without deposit & Certificate of Insurance

  Company: ${quoteData.name}
  Project: ${quoteData.name}

  Date Submitted: ${quoteData.quoteDate}
  
  Delivery: ${delivery}
  Delivery Address: ${address}

  Contact Name: ${quoteData.name}
  Contact Phone: ${quoteData.phone}
  Contact Email: ${quoteData.email}

  Equipment
  ${quoteData.cart.map((item) => 
    `(${item.quantity}) ${item.brand} ${item.model}`
    )}

  Rental Period: ${quoteData.startDate} - ${quoteData.endDate}

  Estimated Subtotal: $${quoteData.baseCharge}
  Estimated Shipping: $${quoteData.deliveryFee}
  Esitmated Tax: 
  Estimated Grand Total: $${quoteData.subTotal}
  `
  console.log(quote);

  return quote
}

export default buildQuote;