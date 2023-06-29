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
const { highest, lowest } = products.reduce((result, item) => {
    const price = parseFloat(item.price);
    if (isNaN(price)) {
      return result;
    }
    if (price > result.highest.price) {
      result.highest = { name: item.product, price };
    }
    if (price < result.lowest.price) {
      result.lowest = { name: item.product, price };
    }
    return result;
  },
  { highest: { name: '', price: -Infinity }, lowest: { name: '', price: Infinity } }
);
console.log(`Highest: ${highest.name}. Lowest: ${lowest.name}`);
console.log('');

// recreating an object 
const recreateArray = Object.entries(products).reduce((result, [key, value]) => {
  const modifiedKey = key === 'product' ? 'name' : key === 'price' ? 'cost' : key;
  return { ...result, [modifiedKey]: value };
}, {});
console.log(recreateArray);