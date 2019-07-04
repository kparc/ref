const k = require('./k')

k('\\h\n').then(r => console.log(r.out))
k('\\l\n').then(r => console.log(r.out))
