const generateMessage = (username, text) => {
  return {
    username,
    text,
    createdAt: new Date().toLocaleTimeString('es-US', {
      hour: 'numeric',
      minute: '2-digit'
    })
  }
}

module.exports = { generateMessage }
