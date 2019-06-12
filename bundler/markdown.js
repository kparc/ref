var unified = require('unified')
var markdown = require('remark-parse')
var remark2rehype = require('remark-rehype')
var html = require('rehype-stringify')

module.exports = text =>
  unified()
  .use(markdown)
  .use(remark2rehype)
  .use(html)
  .processSync(text)
  .contents
