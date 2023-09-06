const socket = io(`ws://localhost:${process.env.PORT}`)

const $form = document.getElementById('message_form')
const $messages = document.getElementById('messages')
const $sidebar = document.getElementById('sidebar')

const urlParams = new URLSearchParams(window.location.search)
const username = urlParams.get('username')
const room = urlParams.get('room')

const renderSidebar = (data) => {
  $sidebar.innerHTML = ''
  const roomContainer = document.createElement('h2')
  const roomContent = document.createTextNode(data.room)

  const titleContainer = document.createElement('h2')
  const titleContent = document.createTextNode('Users')

  const usersContainer = document.createElement('ul')

  roomContainer.appendChild(roomContent)
  titleContainer.appendChild(titleContent)
  data.users.forEach((user) => {
    const li = document.createElement('li')
    const liContent = document.createTextNode(user.username)

    li.appendChild(liContent)

    usersContainer.appendChild(li)
  })

  roomContainer.classList.add('room-title')
  titleContainer.classList.add('list-title')
  usersContainer.classList.add('users')

  $sidebar.append(roomContainer)
  $sidebar.append(titleContainer)
  $sidebar.append(usersContainer)
}

const renderMessage = (message) => {
  const div = document.createElement('div')
  const paragraph = document.createElement('p')

  const nameContainer = document.createElement('span')
  const nameContent = document.createTextNode(message.username)

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

const autoscroll = () => {
  const $newMessage = document.getElementById('messages').lastElementChild

  const newMessageStyles = getComputedStyle($newMessage)
  const newMessageMargin = parseInt(newMessageStyles.marginBottom)
  const newMessageHeight = $newMessage.offsetHeight - newMessageMargin

  const visibleHeight = $messages.offsetHeight
  const containerHeight = $messages.scrollHeight
  const scrollOffset = $messages.scrollTop + visibleHeight

  if (containerHeight - newMessageHeight >= scrollOffset) {
    $messages.scrollTop = containerHeight
  }
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

socket.on('message', (message) => {
  renderMessage(message)
  autoscroll()
})

socket.on('roomData', (data) => {
  renderSidebar(data)
})

socket.emit('join', { username, room }, (error) => {
  if (error) {
    alert(error)
    location.href = '/'
  }
})
