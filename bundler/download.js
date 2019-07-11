const get = require('./get')
const exec = require('child_process').exec
const os = require('os').platform()

const ex = (s, i='') => new Promise((res, rej) => {
    let stdin = exec(s, {
        cwd: process.cwd() + '/bundler',
        encoding: 'utf8'
    }, (e, out, err) => e ? rej(err) : res({e, out, err})).stdin
    stdin.write(i)
    stdin.end()
})

const platform = os === 'darwin' ? 'osx' : 'linux'

get('https://api.anaconda.org/package/shaktidb/shakti/files', {
    'Accept': 'application/json'
})
    .then(({data}) => JSON.parse(data))
    .then(data => data.filter(i =>
            i.attrs && i.attrs.platform == platform
        )
        .filter(i =>
            i.labels && i.labels[0] == 'dev'
        )
        .reduce((a, b) => a.upload_time > b.upload_time ? a : b).download_url
    )
    .then(url => 'https:' + url)
    .then(url => console.log(`downloading k from ${url}`) || url)
    .then(url => ex(`curl -m 10 -LGs "${url}" | tar -jxf - "bin/k"`))
    .then(nothing => console.log('done'))
    .then(nothing => process.exit(0))
    .catch(e => console.error(e) || process.exit(1)) 
