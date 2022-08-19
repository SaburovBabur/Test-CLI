import path from 'path'
import { homedir } from 'os'
import { promises } from 'fs'

async function save(key, value, fileName = undefined) {
    const filePath = path.join(homedir(), fileName || 'weather-cli.json')
    let data = {}

    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath)

        data = JSON.parse(file.toString())
    }

    data[key] = value
    const jsonData = JSON.stringify(data)

    await promises.writeFile(filePath, `${jsonData}`)
}

async function isExist(path) {
    try {
        await promises.stat(path)
        return true
    } catch (error) {
        return false
    }
}

export { save }
