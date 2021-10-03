# Favify

[![Code Style: Google](https://img.shields.io/badge/code%20style-google-blueviolet.svg)](https://github.com/google/gts) [![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/) ![devDependecies](https://img.shields.io/david/dev/namchee/favify) ![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/github/namchee/favify)

Simple library to fetch all favicons from a webpage.

> While this library is usable in the browser environment, the library won't bypass the CORS policy.

## Features

1. 💡 Very simple API
2. ✨ Supports modern favicon features
3. 🗺️ Works both in browser and Node
4. 🌐 Parses with Web Manifests
5. 🛂 Written in TypeScript
6. 📦 Very compact, 1kB-ish gzipped

## Installation

You can install `favify` with any NodeJS package managers. Below is the example of installing `favify` with `npm`

```bash
npm install @namchee/favify
```

> Note: [favify](https://www.npmjs.com/package/favify) is an old-and-unmaintained version of the library. For the latest version, always use `@namchee/favify`
## API

### fetchFavicons

Fetches all favicons from the provided `url`.

**Parameters**

`url` (_required_)

Web page source for searching favicons

`config`

List of request headers to be used when fetching contents. Useful if the target web page has crawler protection.

`config['User-Agent']`

Value of `User-Agent` header to be used when fetching data.

For example, to mimic normal browser behavior, you can use [your browser `User-Agent` value](https://www.whatismybrowser.com/detect/what-is-my-user-agent)

`config['Referrer']`

Value of `Referrer` header to be used when fetching data.

For example, `https://www.google.com` is a good start, since it basically transform your request as it has been searched via Google.

## License

This project is licensed under the [MIT license](./LICENSE)
