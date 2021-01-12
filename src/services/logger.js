
import { environments } from '../env'

export const log = (page = 'N/A', functionName = 'N/A', data = 'N/A') => {
    printLog(page, functionName, data, 'LOG');
}

export const warn = (page = 'N/A', functionName = 'N/A', data = 'N/A') => {
    printLog(page, functionName, data, 'WARN');
}

export const info = (page = 'N/A', functionName = 'N/A', data = 'N/A') => {
    printLog(page, functionName, data, 'INFO');
}

export const error = (page = 'N/A', functionName = 'N/A', data = 'N/A') => {
    printLog(page, functionName, data, 'ERROR');
}

const printLog = (page = 'N/A', functionName = 'N/A', data = 'N/A', type = 'LOG') => {
    let data2
    if (environments.debbug) {
        try {
            data2 = data
        } catch (err) {
            console.log('logger trycatch error: ', err)
        }
        if (type === 'LOG') {
            console.log('@@@@@ Page[', page, ']', ' --Func[', functionName, '] -->[', data2, ']')
        }
        if (type === 'INFO') {
            console.log('@@@@@ Page[', page, ']', ' --Func[', functionName, '] -->[', data2, ']')
        }
        if (type === 'WARN') {
            console.warn('@@@@@ Page[', page, ']', ' --Func[', functionName, '] -->[', data2, ']')
        }
        if (type === 'ERROR') {
            console.error('@@@@@ Page[', page, ']', ' --Func[', functionName, '] -->[', data2, ']')
        }
    }
}