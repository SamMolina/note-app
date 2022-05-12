const chalk = require('chalk')
const getNotes = require('./notes')

const message = getNotes()

const bold = chalk.bold.inverse

console.log(chalk.bgGreen(message))
console.log(bold(message))
