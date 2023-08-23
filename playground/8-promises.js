const promiseFunction = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve([7, 4, 1])
    reject('Things went wrong!')
  }, 2000)
})

promiseFunction
  .then((result) => console.log(result))
  .catch((error) => console.log('Error:', error))
