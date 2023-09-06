const generateMessage = (username, text) => {
  return {
    username,
    text,
    createdAt: new Date().toLocaleTimeString('pt-BR', {
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'America/Sao_Paulo'
    })
  }
}

module.exports = { generateMessage }
