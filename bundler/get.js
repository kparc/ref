const https = require('https')

module.exports = (url, headers = {}) => new Promise((resolve, reject) =>
    https.request(url, {headers}, (response) => {
        let data = ''
        response.setEncoding('utf8')
        response.on('data', d => data+=d)
        response.on('end', () => resolve({statusCode: response.statusCode, data}))
    })
    .on('error', e => reject(e))
    .end()
)
