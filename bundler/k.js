const execSync = require('child_process').execSync
const os = require('os').platform()

const k = (i='') => {
    const cmd = os === 'darwin' ? 'script -q /dev/null "./k"' : 'script -qefc "./k" /dev/null';
    let s = execSync(cmd + ' | cat', {
        cwd: process.cwd() + '/bundler/bin',
        input: i + '\n',
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
