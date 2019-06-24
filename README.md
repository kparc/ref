## Yet another take on the refcard

### Features

* build script that produces static html
* server-side markdown render
* links to \h in markdown (you can even use regexp)
* \h loaded from a text at the build time
* `pug` template engine for html
* minified css and client-side javascript
* themes (click *kei_logo.svg* for now. if you find a better place for this button - put it there)

### How to run

```
npm i
npm run build
```
and serve the `./build/` directory over http

**Warning! The build fails if there are \h linking errors**

### Todo

* merge with updated content
* plug in test script
* add some fancy `<meta>` tags like `name` and `description`
* learn [pug](https://naltatis.github.io/jade-syntax-docs/), aka jade, it will take you ~30 minutes, if you want to modify html
