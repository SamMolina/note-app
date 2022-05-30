const yargs = require('yargs')
const chalk = require('chalk')
const { addNote, removeNote, listNotes, readNote } = require('./notes')

const infoMessage = message => chalk.black.bgBlueBright(message)
const successMessage = message => chalk.black.bgGreen(message)
const errorMessage = message => chalk.black.bgRed(message)

yargs.version('1.1.0') 

yargs.command({
    command: 'add',
    describe: 'Adds a new note',
    builder: {
        title: {
            describe: 'Note\'s title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note\'s body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(arg) {
        try {
            addNote(arg.title, arg.body)
            console.log(successMessage('Note added!'))
        } catch(e) {
            console.log(errorMessage(e.message))
        }
    }
})

yargs.command({
    command: 'remove',
    describe: 'Removes note',
    builder: {
        title: {
            describe: 'Note\'s title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(arg) {
        try {
            removeNote(arg.title)
            console.log(successMessage('Note removed!'))
        } catch (e) {
            console.log(errorMessage(e.message))
        }
    }
})

yargs.command({
    command: 'list',
    describe: 'Lists stored notes',
    handler() {
        console.log(infoMessage('Your notes:'))
        const notes = listNotes()
        notes.forEach(note => {
            console.log(note.title)
        })
    }
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note\'s title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(arg) {
        try {
            const note = readNote(arg.title)
            console.log(infoMessage(note.title))
            console.log(note.body)
        } catch(e) {
            console.log(errorMessage(e.message))
        }
    }
})

console.log(yargs.argv)
