const provinces = ['Western Cape', 'Gauteng', 'Northern Cape', 'Eastern Cape', 'KwaZulu-Natal', 'Free State']
const names = ['Ashwin', 'Sibongile', 'Jan-Hendrik', 'Sifso', 'Shailen', 'Frikkie']

names.forEach((name, province) => {
    console.log(name,':', provinces[province])
})

console.log(' ')

provinces.map(function(provinces) {
    const province = provinces.toUpperCase()
    console.log(province)
})

const lengthOfNames = names.forEach((name) => {
  return name.length
})
console.log(lengthOfNames);


