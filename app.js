require('body-parser')

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
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Note App Backend')
})

const getData = (status, data) => {
    return {
        status,
        data
    }
}

const getAlertData = (status, type, message) => {
    return {
        status,
        alert: {
            type,
            message
        }
    }
}

app.post('/add', (req, res) => {
    const { title, body } = req.body
    try {
        addNote(title, body)
        const successData = getAlertData('ok', 'success', 'Note added!')
        res.status(200).send(successData)
        console.log(successMessage(`Note with "${title}" was added!`))
    } catch(e) {
        const errorData = getAlertData('error', 'danger', e.message)
        res.status(400).send(errorData)
        console.log(errorMessage(e.message), '| title:', title, '| body:', body)
    }
})

app.delete('/remove', (req, res) => {
    const { title } = req.query
    try {
        removeNote(title)
        const successData = getAlertData('ok', 'success', 'Note removed!')
        res.status(200).send(successData)
        console.log(successMessage(`Note with "${title}" was removed!`))
    } catch(e) {
        const errorData = getAlertData('error', 'danger', e.message)
        res.status(400).send(errorData)
        console.log(errorMessage(e.message), '| title:', title)
    }
})

app.get('/list', (req, res) => {
    try {
        const notes = listNotes()
        res.status(200).send(getData('ok', notes))
        console.log(successMessage('Listed all notes!'))
    } catch(e) {
        const errorData = getAlertData('error', 'danger', e.message)
        res.status(400).send(errorData)
        console.log(errorMessage(e.message))
    }
})

app.get('/read', (req, res) => {
    const { title } = req.query
    try {
        const note = readNote(title)
        res.status(200).send(getData('ok', note))
        console.log(successMessage(`Note with "${title}" was readed!`))
    } catch(e) {
        const errorData = getAlertData('error', 'danger', e.message)
        res.status(400).send(errorData)
        console.log(errorMessage(e.message), '| title:', title)
    }
})

app.listen(3001)
