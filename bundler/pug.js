const md = require('./markdown.js')
const postprocess = require('./postprocess.js')
const fs = require('fs')

module.exports = function() {
    const indexmd = fs.readFileSync('./src/md/index.md', 'utf-8')
    return postprocess(md(indexmd))
}
