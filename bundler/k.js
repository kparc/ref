const get = require('./get')
const exec = require('child_process').exec
const os = require('os').platform
const dir = require('path').dirname

const ex = (s, i='') => new Promise((res, rej) => {
    let stdin = exec(s, {
        cwd: dir(process.argv[1]),
        input: i,
        encoding: 'utf8'
    }, (e, out, err) => e ? rej(err) : res({e, out, err})).stdin
    stdin.write(i)
    stdin.end()
})

const platform = os === 'darwin' ? 'osx' : 'linux'

const k = ex.bind(this, 'script -qefc "./bin/k" /dev/null | cat')

get('https://api.anaconda.org/package/shaktidb/shakti/files', {
    'Accept': 'application/json'    
})
    .then(({data}) => JSON.parse(data))
    .then(data => data.filter(i =>
        i.attrs && i.attrs.platform == platform
    ).reduce((a, b) => a.upload_time > b.upload_time ? a : b).download_url)
    .then(url => 'https:' + url)
    .then(url => ex(`curl -LGs "${url}" | tar -jxf - "bin/k"`))
    //.then(nothing => k('\\h\n'))
    //.then(data => console.log(data.out))
    .catch(e => console.error(e)) 

module.exports = k
