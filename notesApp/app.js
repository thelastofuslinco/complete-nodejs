const yargs = require('yargs')
const notes = require('./notes')

const title = {
  describe: 'Note title',
  demandOption: true,
  type: 'string'
}

const body = {
  describe: 'Note body',
  demandOption: true,
  type: 'string'
}

yargs.command(
  'add',
  'Add a new note',
  {
    title,
    body
  },
  (argv) => notes.addNote(argv.title, argv.body)
)

yargs.command(
  'remove',
  'Remove a note',
  {
    title
  },
  (argv) => notes.removeNote(argv.title)
)

yargs.command('list', 'List notes', () => notes.getNotes())

yargs.command(
  'read',
  'Read note',
  {
    title
  },
  (argv) => notes.getNotes(argv.title)
)

yargs.parse()
