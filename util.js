import chalk from 'chalk'
import path from 'path'
import { fileURLToPath } from 'url'

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

function log(type, msg) {
    let logType = ''

    if (type === 'success') {
        logType = beautify({
            status: type.toUpperCase(),
            message: msg,
            type: type,
        })
    } else if (type === 'error') {
        logType = beautify({
            status: type.toUpperCase(),
            message: msg,
            type: type,
        })
    } else {
        logType = beautify({
            status: type.toUpperCase(),
            message: msg,
            type: type,
        })
    }

    console.log(logType)
}

function beautify({ status, message, type }) {
    const lineLength = status.length + message.length + 7
    const lines = String('-').repeat(lineLength)

    let bgColor = ''
    if (type === 'success') {
        bgColor = '#4e9a06'
    } else if (type === 'error') {
        bgColor = '#cc0000'
    } else {
        bgColor = '#c4a000'
    }

    const statusColored = chalk.bgHex(bgColor)(` ${status} `)

    return `${lines} \n${statusColored} | ${message} |\n${lines}`
}

export { log }
