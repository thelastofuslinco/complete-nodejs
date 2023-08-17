const userName = 'Andrew'
const userAge = 27

const user = {
  userName,
  age: userAge,
  location: 'Philadelphia'
}

console.log(user)

const product = {
  label: 'Red notebook',
  price: 3,
  stock: 201,
  salePrice: undefined,
  rating: 4.2
}

const transaction = (type, { label, stock = 0 } = {}) => {
  console.log(type, label, stock)
}

transaction('order', product)
