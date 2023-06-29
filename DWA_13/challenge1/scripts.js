const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']

// names
names.forEach((names) => {
    console.log(names)
})
console.log('')

// names with provinces
names.forEach((name, province) => {
    console.log(name,':', provinces[province])
})
console.log(' ')

// Upper case
provinces.map(function(provinces) {
    const province = provinces.toUpperCase()
    console.log(province)
})
console.log('')

// Creating an array
const lengthOfNames = names.map(name => name.length); 
console.log(lengthOfNames);

console.log('')

// sorting provinces alphabetically
const sortProvinces = provinces.sort();
console.log(sortProvinces)
console.log('')

// Removing provinces with the word "cape"
const filterProvince = provinces.filter(provinces => !provinces.includes('Cape'));
const filterProvinceCount = provinces.filter(provinces => !provinces.includes('Cape'))
console.log(filterProvinceCount);

console.log('')

// creating a boolean
const haveSArray = names.map(names => names.includes('S'));
console.log(haveSArray);
console.log('')



