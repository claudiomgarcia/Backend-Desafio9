import winston from "winston"

const customLevelsOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'magenta',
        error: 'red',
        warning: 'yellow',
        info: 'cyan',
        http: 'green',
        debug: 'blue'
    }
}

winston.addColors(customLevelsOptions.colors)

const developmentLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({ level: 'debug' })
    ]
})

const productionLogger = winston.createLogger({
    levels: customLevelsOptions.levels,
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: './src/logs/errors.log', level: 'error' })
    ]
})

const logger = process.env.NODE_ENV === 'production' ? productionLogger : developmentLogger

export const addLogger = (req, res, next) => {
    req.logger = logger
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`)
    next()
}