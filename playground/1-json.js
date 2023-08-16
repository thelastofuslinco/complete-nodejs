const fs = require('fs')
// Store data in json format
// const books = [
//   {
//     title: 'O cavaleiro dos sete reinos',
//     author: 'George R.R Martin'
//   }
// ]
// fs.writeFileSync('books.json', JSON.stringify(books))

// Get data in Json format
const booksBuffer = fs.readFileSync('books.json')
const booksJson = booksBuffer.toString()
const books = JSON.parse(booksJson)

for (const book of books) {
  console.log(book)
}
