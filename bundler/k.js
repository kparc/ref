const execSync = require('child_process').execSync
const os = require('os').platform()

const k = (i='') => {
    let s = execSync('./pty', {
        cwd: process.cwd() + '/bundler/bin',
        input: i,
        encoding: 'utf8'
    })
        .split('\n')
        .map(m => m.trim())
    while (s.length && !s[s.length - 1].length) s.pop()
    i.length && s.shift()
    return s.join('\n')
}

module.exports = k
