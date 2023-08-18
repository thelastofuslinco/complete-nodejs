console.log('Client side javascript file is loaded!')

const weatherForm = document.querySelector('form')
const secondMessage = document.querySelector('#message-2')

const getWeather = (location) => {
  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          secondMessage.textContent = data.error
        } else {
          const content = `${data.weather} in ${data.location}`
          secondMessage.textContent = content
        }
      })
    }
  )
}

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const { search } = event.target
  getWeather(search.value)
})
