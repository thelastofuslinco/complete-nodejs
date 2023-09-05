const socket = io('ws://localhost:3000')

const $form = document.getElementById('message_form')
const $messages = document.getElementById('messages')

console.log(location.search.slice(1).split('&'))

const renderMessage = (message) => {
  const div = document.createElement('div')
  const paragraph = document.createElement('p')
  const nameContainer = document.createElement('span')
  const nameContent = document.createTextNode('User name')

  const createdAtContainer = document.createElement('span')
  const createdAtContent = document.createTextNode(message.createdAt)

  const messageContainer = document.createElement('p')
  const messageContent = document.createTextNode(message.text)

  nameContainer.appendChild(nameContent)
  createdAtContainer.appendChild(createdAtContent)
  messageContainer.appendChild(messageContent)

  nameContainer.classList.add('message__name')
  createdAtContainer.classList.add('message__meta')

  paragraph.append(nameContainer)
  paragraph.append(createdAtContainer)
  div.append(paragraph)
  div.append(messageContainer)
  div.classList.add('message')
  $messages.append(div)
}

$form.addEventListener('submit', (event) => {
  event.preventDefault()
  const { message, button } = event.target
  button.setAttribute('disabled', true)

  socket.emit('send_message', message.value, () => {
    button.removeAttribute('disabled')
    message.value = ''
    message.focus()
  })
})

socket.on('welcome', (messages) => {
  messages.forEach((message) => renderMessage(message))
})

socket.on('message', (message) => {
  renderMessage(message)
})
