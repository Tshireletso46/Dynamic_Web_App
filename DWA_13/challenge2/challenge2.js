const products = [
    { product: 'banana', price: "2" },
    { product: 'mango', price: 6 },
    { product: 'potato', price: ' ' },
    { product: 'avocado', price: "8" },
    { product: 'coffee', price: 10 },
    { product: 'tea', price: '' },
  ]

//   product names
 products.forEach((item) => {
     console.log(item.product)
 })
 console.log('');

//   filtering out names longer than 5 character
const filterProducts = products.filter((item) => item.product.length<5);
console.log(filterProducts);
console.log('');

//converting string prices to numbers
const convertString = products
  .filter(item => item.price !== '' && !isNaN(parseFloat(item.price)))
  .map(item => {
    item.price = parseFloat(item.price);
    return item;
  })
  .reduce((total, item) => total + item.price, 0);
console.log(convertString); 
console.log('');

// concatinating all products names 
const concatenatingNames = products.reduce((names, item, index) => {
  if (index = 0) {
    return item.product;
  }
  return names + ', ' + item.product;
}, '');
console.log(concatenatingNames);
console.log('');

// calculating the highest and lowest prices
const { highest, lowest } = products.reduce(
  (result, item) => {
    if (item.price > result.highest.price) {
      result.highest = item;
    }
    if (item.price < result.lowest.price) {
      result.lowest = item;
    }
    return result;
  },
  {
    highest: { price: Number.NEGATIVE_INFINITY },
    lowest: { price: Number.POSITIVE_INFINITY },
  }
);
const resultString = `Highest: ${highest.product}. Lowest: ${lowest.product}.`;
console.log(resultString);
console.log('');

// recreating an object 
const recreate = {
  product: 'banana',
  price: 2,
  quantity: 10,
};
const recreatedObject = Object.entries(recreate).reduce((obj, [key, value]) => {
  if (key === 'product') {
    obj.name = value;
  } else if (key === 'price') {
    obj.cost = value;
  } else {
    obj[key] = value;
  }
  return obj;
}, {});
console.log(recreatedObject);