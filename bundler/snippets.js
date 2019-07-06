const k = require('./k')

module.exports = s => {
    let inout = s
    .split('\n')
    .reduce((a, v) => v[0] == ' ' || !v[0] ? ({ input: a.input.concat([v]), output: a.output }) : ({ input: a.input, output: a.output.concat([v]) }), {
        input: [],
        output: []
    })
    inout.input = inout.input.join('\n')
    inout.output = inout.output.join('\n')
    if (!inout.input.length) {
        inout.valid = true
        inout.k = ''
    } else {
        inout.k = k(inout.input)
        inout.valid = inout.k == inout.output
    }
    return inout
}
