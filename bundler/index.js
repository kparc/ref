// #!/bin/env node
const ch = require('cheerio')
const pug = require('pug')
const fs = require('fs')
const _ = require('lodash')
const minify = require('@node-minify/core')
const uglifyes = require('@node-minify/uglify-es')
const cleanCSS = require('@node-minify/clean-css')
const { exec } = require('child_process')
//const shdn = require('showdown')

minify({
  compressor: uglifyes,
  input: './src/js/*.js',
  output: './build/js/$1.js',
  callback: function(err, min) {
    console.log('js...')
    if (err)
        throw err
  }
})

fs.readdirSync('./src/css').map(f => {
minify({
    compressor: cleanCSS,
    input: `./src/css/${f}`,
    output: `./build/css/${f}`,
    callback: function(err, min) {
        console.log(`css: ${f}`)
        if (err)
            throw err
    }
    })
})

const md = require('./markdown.js')
//const md = new shdn.Converter({tables: true, rawHeaderId: true, customizedHeaderId: true})
const postprocess = require('./postprocess.js')

const h = fs.readFileSync('./src/txt/h.txt', 'utf-8')
const indexmd = fs.readFileSync('./src/md/index.md', 'utf-8')

const html = pug.renderFile('./src/pug/index.pug', postprocess(h, md(indexmd)))

fs.writeFileSync('./build/index.html', html)

console.log('Html...')

exec('cp -R ./static/* ./build/', err => { if (err) throw err })
console.log('Static files...')
