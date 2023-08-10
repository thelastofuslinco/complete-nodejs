const fs = require('fs')
const chalk = import('chalk')

const print = (text, color) =>
  chalk.then(({ default: chalkColor }) => console.log(chalkColor[color](text)))

const saveNotes = (data) => fs.writeFileSync('notes.json', JSON.stringify(data))

const loadNotes = () => {
  try {
    const notesBuffer = fs.readFileSync('notes.json')
    const notesJson = notesBuffer.toString()
    const notes = JSON.parse(notesJson)
    return notes
  } catch (error) {
    return []
  }
}

const getNotes = (title) => {
  const notes = loadNotes()

  if (title) {
    const note = notes.find((note) => note.title === title)
    note && print(note.title, 'blue')
    !note && print('Note not found!', 'red')
  } else {
    notes.forEach((note) => {
      print(note.title, 'blue')
    })
  }
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const noteIndex = notes.findIndex((note) => note.title === title)

  if (noteIndex === -1) {
    notes.push({ title, body })
    saveNotes(notes)
    print('Note added!', 'green')
  } else {
    print('This note is already exists!', 'red')
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const noteIndex = notes.findIndex((note) => note.title === title)

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1)
    saveNotes(notes)
    print('Note removed!', 'green')
  } else {
    print('Note not found!', 'red')
  }
}

module.exports = { getNotes, addNote, removeNote }
