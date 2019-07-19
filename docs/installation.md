# Installation

## Direct Download / CDN

https://unpkg.com/dalitek-junction-api/dist/dalitek-junction-api 

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/dalitek-junction-api@{{ $version }}/dist/dalitek-junction-api.js
 
Include dalitek-junction-api after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/dalitek-junction-api/dist/dalitek-junction-api.js"></script>
```

## NPM

```sh
$ npm install dalitek-junction-api
```

## Yarn

```sh
$ yarn add dalitek-junction-api
```

When used with a module system, you must explicitly install the `dalitek-junction-api` via `Vue.use()`:

```javascript
import Vue from 'vue'
import dalitek-junction-api from 'dalitek-junction-api'

Vue.use(dalitek-junction-api)
```

You don't need to do this when using global script tags.

## Dev Build

You will have to clone directly from GitHub and build `dalitek-junction-api` yourself if
you want to use the latest dev build.

```sh
$ git clone https://github.com//dalitek-junction-api.git node_modules/dalitek-junction-api
$ cd node_modules/dalitek-junction-api
$ npm install
$ npm run build
```

