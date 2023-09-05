class Message {
  constructor(text) {
    this.text = text
    this.createdAt = new Date()
  }

  getMessage() {
    return {
      text: this.text,
      createdAt: this.createdAt.toLocaleTimeString('es-US', {
        hour: 'numeric',
        minute: '2-digit'
      })
    }
  }
}

module.exports = Message
