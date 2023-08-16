const add = (x, y, callback) => {
  setTimeout(() => {
    callback(x + y)
  }, 2000)
}

add(5, 1, (sum) => {
  console.log(sum)
})
