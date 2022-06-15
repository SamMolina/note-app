const express = require('express')
const app = express()

const chalk = require('chalk')
const { addNote, removeNote, listNotes, readNote } = require('./notes')

const infoMessage = message => chalk.bold.magenta(message)
const successMessage = message => chalk.bold.green(message)
const errorMessage = message => chalk.bold.red(message)

console.log(infoMessage('Note App started and running'))

app.get('/', (req, res) => {
    res.send('Note App Backend')
  })

app.get('/add', (req, res) => {
    const { title, body } = req.query
    try {
        addNote(title, body)
        res.status(200).send('Note added!')
        console.log(successMessage('Note added!'))
    } catch(e) {
        res.status(404).send(e.message)
        console.log(errorMessage(e.message), '| title:', title, 'body:', body)
    }
})

app.get('/remove', (req, res) => {
    const { title } = req.query
    try {
        removeNote(title)
        res.status(200).send('Note removed!')
        console.log(successMessage('Note removed!'), '| title:', title)
    } catch(e) {
        res.status(404).send(e.message)
        console.log(errorMessage(e.message), '| title:', title)
    }
})

app.get('/list', (req, res) => {
    try {
        const notes = listNotes()
        res.status(200).send(notes)
    } catch(e) {
        res.status(404).send(e.message)
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
        res.status(404).send(e.message)
        console.log(errorMessage(e.message), '| title:', title)
    }
})

app.listen(3001)
