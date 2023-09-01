const calculateTip = (total, percent = 0.3) => total + total * percent
const celsiusToFahrenheit = (celsius) => celsius * 1.8 + 32
const fahrenheitToCelsius = (fahrenheit) => (fahrenheit - 32) / 1.8
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (a < 0 || b < 0) reject(new Error('Numbers must be positive'))
      resolve(a + b)
    }, 2000)
  })
}

describe('Playground tests', () => {
  test('should calculate total tip', () => {
    expect(calculateTip(100, 0.1)).toBe(110)
  })

  test('should calculate total with default tip', () => {
    expect(calculateTip(100)).toBe(130)
  })

  test('should covert 32F to 0C', () => {
    expect(fahrenheitToCelsius(32)).toBe(0)
  })

  test('should covert 0C to 32F', () => {
    expect(celsiusToFahrenheit(0)).toBe(32)
  })

  test('should resolve positive number', async () => {
    await expect(add(1, 2)).resolves.toBe(3)
  })

  test('should reject negative number', async () => {
    await expect(add(1, -2)).rejects.toThrow(
      new Error('Numbers must be positive')
    )
  })
})
