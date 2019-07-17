const execSync = require('child_process').execSync
const os = require('os').platform()

const linux = (i='') => {
    let s = execSync(`./pty ./k`, {
        cwd: process.cwd() + '/bundler/bin',
        input: i + '\n',
        encoding: 'utf8'
    })
        .split('\n')
        .map(m => m.trim())
    //while (s.length && !s[s.length - 1].length) s.pop()
    i.length && s.shift()
    return s.join('\n').trimEnd('\n')
}

const osx = (i='') => {
    const cmd = 'script -q /dev/null "./k" | cat'//'script -qc "./k" /dev/null | cat'
    let s = execSync(cmd, {
        cwd: process.cwd() + '/bundler/bin',
        input: i + '\n',
        encoding: 'utf8'
    })
        .split('\n')
        .map(m => m.trim())
    while (s.length && !s[0].includes('© shakti')) s.shift()
    i.length && s.shift()
    //while (s.length && !s[s.length - 1].length) s.pop()
    return s.join('\n').trimEnd('\n')
}

module.exports = os === 'darwin' ? osx : linux
