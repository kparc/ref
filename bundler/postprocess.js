const ch = require('cheerio')
const _ = require('lodash')
const prism = require('prismjs')
const loadLang = require('prismjs/components/')
const moment = require('moment')
const validate = require('./snippets')
const k = require('./k')

const e = i => i ? -i : ''
const ifregexp = s => /^\/.*\/$/.test(s) ? new RegExp(s.slice(1, -1)) : s
loadLang(['q'])

module.exports = function(html) {
    var $ = ch.load(html)
    var text = k('\\h')

    // get rid of trailing whitespace
    text = text.split('\n').map(s => s.trimRight()).join('\n')
    
    // validate snippets
    let snippets = []
    console.log('validating snippets')
    console.log(k())
    $('code.language-kc').each((k,v) => console.log(`ran ${k} tests so far`) ||snippets.push(validate($(v).text())))
    snippets = snippets.filter(f => !f.valid)
    if (snippets.length) {
        console.error(snippets)
        // uncomment the following line to make the build fail if errors were detected
        throw "invalid snippets detected"
    }

    // invoke syntax highlighter, but only on the input lines    
    $('code.language-kc, code.language-kc-no-tests, code.language-kc-nyi').each((k, v) => $(v).replaceWith(
        $(v)
            .text()
            .split('\n')
            .map(s => {
                if(!s.length)
                    return s
                return s[0] == '•' 
                    ? `<code class="language-q in">${prism.highlight(s.slice(1), prism.languages.q, 'q')}</code>`
                    // : `<code class="language-q out">${prism.highlight(s, prism.languages.q, 'q')}</code>`
                    : `<code class="language-q out">${s}</code>`
            })
            .join('\n')
        || $.html($(v))
    ))
    
    // linking the refcard to the text
    var d = {}
    $('h2,h3,h4').each((k, v) => {
        let a = $(v).find('strong')
        if (!a.length)
            return

        // in case you need an actual <strong> in your heading for some reason
        // i steal only the last one of them
        a = $(a[a.length - 1])
        let id = a.text()
        a.replaceWith('')
        let kebab = _.kebabCase($(v).text())
        if (!kebab)
            return
        if (!d[kebab])
            d[kebab] = []
        d[kebab].push({ el: $(v), id })
    })

    _(d).forOwn((v, k) => {
        let id = v[0].id
        let i = 0
        let r = ifregexp(id)
        let t = typeof(r) == "string" ? id : text.match(r)
        if (!t)
            throw `Lost a link to the refcard: ${id}, ${i}`
        text = text
            .split(r)
            .reduce((a, b) => {
                i++;
                if (!v.length)
                    return a + id + b
                v.shift().el.attr('id', `${k}${e(i - 1)}`)
                return `${a}<a href="#${k}${e(i - 1)}">${t}</a>${b}`
            })
        if (v.length)
            throw `Lost a link to the refcard: ${id}, ${i}`
    })
    
    // tables will screw with us unless contaminated in a div
    $('table').each((i, el) => $(el).replaceWith(`<div style="width: 100%; overflow-x: auto">${$.html($(el))}</div>`))
    return { h: k() + '\n' + text, md: $.html(), date: moment().format("LL") }
}
