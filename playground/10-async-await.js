const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) reject('Numbers must be positive')
      resolve(a + b)
    }, 2000)
  })
}

const getName = async () => {
  const sum = await add(2, 2)
  const secondSum = await add(sum, 2)
  const thirdSum = await add(secondSum, -1)

  return `Lincoln ${sum} ${secondSum} ${thirdSum}`
}

getName().then(console.log).catch(console.log)
