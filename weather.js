#!/usr/bin/env node
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { save } from './path/index.js'
import { log, __filename } from './util.js'
import { promises as fs } from 'fs'
import { homedir } from 'os'
import path from 'path'
import axios from 'axios'

function parse(args) {
    return yargs(hideBin(process.argv)).argv
}

class WeatherController {
    static FILE = 'weather-cli.json'

    constructor({ city, token }) {
        this.city = city
        this.token = token

        try {
            this.saveProperty('token', this.token)
            this.saveProperty('city', this.city)
        } catch (error) {
            log('error', error.message)
        }
    }

    async weather() {
        const { data: longLat } = await axios.get(
            `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&appid=${this.token}`
        )
        const { lat, lon } = longLat[0]

        const { data } = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.token}`
        )

        return { data }
    }

    saveProperty(key, value) {
        save(key, value, this.FILE)
    }
}

async function initCLI() {
    const params = parse(process.argv)
    const contentBuffer = await fs.readFile(
        path.join(homedir(), 'weather-cli.json')
    )
    const cliData = await JSON.parse(contentBuffer.toString())

    const weather = new WeatherController({
        city: params.c || cliData.city,
        token: params.t || cliData.token,
    })

    const { data: city } = await weather.weather()
    console.log(
        `
Погода в ${city.name}: ${city.weather[0].main}

`.trim()
    )
}

initCLI()
