const execSync = require('child_process').execSync
const os = require('os').platform()

const k = (i='') => {
    let s = execSync('./pty', {
        cwd: process.cwd() + '/bundler/bin',
        input: i + '\n\\\\\n',
        encoding: 'utf8'
    })
        .split('\n')
        .map(m => m.trim())
        .filter(f => f.length)
    while (s.length && !s[0].includes('© shakti')) s.shift()
    i.length && s.shift()
    return s.join('\n')
}

module.exports = k
