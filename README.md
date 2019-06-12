<<<<<<< HEAD
# k reference card

https://kparc.github.io/ref

An unofficial clickable version of the k help, accessible in the REPL with `\h`.

It provides examples, short recipes, dev progress notes, and links to other resources.

Trial versions of k for macOS and Linux can be downloaded from Anaconda - follow the instructions [here](https://github.com/kparc/kcc/blob/master/README.md#get).

To add a section:

1. Select a word that you'd like to contribute docs for in the quickref
2. Add it to the `links` array in `index.html`
3. Search for the string 'template' in `index.html`, and copy it. Add the word as an id to the `h2` or `h3` or `h4` and fill in content beneath it.

Edit the docs by editing `index.html`.

TODO:

* Write more docs
* Convert to markdown, implement code validation vs. latest release
* Figure out how to sync `index.html` with changes to the quickref (may need Shakti's help)
* Tempted to switch to [MkDocs/Material](https://squidfunk.github.io/mkdocs-material/), but want to keep it simple for now
* Consider [Zig's docs approach](https://ziglang.org/documentation/master/#Introduction) - easily downloaded single file + code samples form part of the test suite
* Get a better system for dynamically adding links, that can handle a word appearing more than once in the help (eg maybe subsequent mentions become '#list2')
* Consider moving 'contribute' link to right-hand side of banner (just be wary of impact on small mobile phone screens)
=======
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
* create a build hook

>>>>>>> initial commit
