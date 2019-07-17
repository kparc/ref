## unofficial k reference card

### features

* build script that produces static html
* server-side markdown render
* links to \h in markdown (you can even use regexp)
* \h is loaded from the latest k binary at the build time
* `pug` template engine for html
* minified css and client-side javascript
* themes (click *kei_logo.svg* for now. if you find a better place for this button - put it there)

### how to run

```
npm i
npm run build
```
and serve the `./build/` directory over http

