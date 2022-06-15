const express = require('express')
const cors = require('cors');
const app = express()

const chalk = require('chalk')
const { addNote, removeNote, listNotes, readNote } = require('./notes')

const infoMessage = message => chalk.bold.magenta(message)
const successMessage = message => chalk.bold.green(message)
const errorMessage = message => chalk.bold.red(message)

console.log(infoMessage('=========== Note App started and running ==========='))

app.use(cors())

app.get('/', (req, res) => {
    res.send('Note App Backend')
  })

app.post('/add', (req, res) => {
    const { title, body } = req.query
    try {
        addNote(title, body)
        const successData = {
            type: 'success',
            message: 'Note added!'
        }
        res.status(200).send(successData)
        console.log(successMessage('Note added!'))
    } catch(e) {
        const errorData = {
            type: 'danger',
            message: e.message
        }
        res.status(400).send(errorData)
        console.log(errorMessage(e.message), '| title:', title, '| body:', body)
    }
})

app.delete('/remove', (req, res) => {
    const { title } = req.query
    try {
        removeNote(title)
        res.status(200).send('Note removed!')
        console.log(successMessage('Note removed!'), '| title:', title)
    } catch(e) {
        res.status(400).send(e.message)
        console.log(errorMessage(e.message), '| title:', title)
    }
})

app.get('/list', (req, res) => {
    try {
        const notes = listNotes()
        res.status(200).send(notes)
    } catch(e) {
        res.status(400).send(e.message)
        console.log(errorMessage(e.message))
    }
})

app.get('/read', (req, res) => {
    const { title } = req.query
    try {
        const note = readNote(title)
        res.status(200).send(note)
        console.log(successMessage('Note readed!'))
    } catch(e) {
        res.status(400).send(e.message)
        console.log(errorMessage(e.message), '| title:', title)
    }
})

app.listen(3001)
