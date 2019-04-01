# docs

Community docs for Shakti's k7.

Trial versions of k7 for macOS and Linux can be downloaded from anaconda:

https://anaconda.org/shaktidb

The docs are a clickable version of the k7 quickref, accessible in k7 with `\`.

To add a page:

1. Select a word that you'd like to contribute docs for in the quickref
2. Add it to the `links` array in `index.html`
3. Search for the string 'template' in `index.html`, and copy it. Add the word as an id to the `h3` and fill in content beneath it.

Edit the docs by editing `index.html`.

TODO:

* ...write...more...docs
* Figure out how to sync `index.html` with changes to the quickref (may need Shakti's help)