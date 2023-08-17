console.log('Client side javascript file is loaded!')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
  response.json().then((data) => {
    console.log(data)
  })
})

fetch('http://localhost:3000/weather?address=Boston').then((response) => {
  response.json().then((data) => {
    console.log(data)
  })
})
