# Vue Naive Admin

![image](./public/favicon.svg)

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE) [![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

A fresh and elegant admin template, based on Vue 3, Vite 6, TypeScript, Naive UI and UnoCSS.

`VueNaiveAdmin` is a clean, elegant, beautiful and powerful admin template, based on the latest front-end technology stack, including Vue 3, Vite 6, TypeScript, Pinia and UnoCSS. It has built-in rich theme configuration and components, strict code specifications, and an automated file routing system. In addition, it also uses the online mock data solution based on ApiFox. `VueNaiveAdmin` provides you with a one-stop admin solution, no additional configuration, and out of the box. It is also a best practice for learning cutting-edge technologies quickly.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Features](#features)
- [Browser Support](#browser-support)
- [Maintainer](#maintainer)
- [Contributing](#contributing)
- [License](#license)

## Install

Make sure your environment meets the following requirements:

- [git](https://git-scm.com).
- [node](http://nodejs.org) >=18.12.0, recommended 18.19.0 or higher.
- [pnpm](https://pnpm.io) >= 8.7.0, recommended 8.14.0 or higher.

```bash
# Clone project
git clone https://github.com/loicduong/vue-naive-admin.git

# Install dependencies
pnpm i
```

## Usage

```bash
# Start project
pnpm dev

# Build project on production environment
pnpm build

# Build project on development environment
pnpm build:dev

# Build project on testing environment
pnpm build:tst

# Clean cache & related files
pnpm cleanup

# Check format of commit message
pnpm commit

# Start project on development environment
pnpm dev

# Start project on testing environment
pnpm dev:tst

# Start project on production environment
pnpm dev:prd

# Lint
pnpm lint

# Lint & auto fix
pnpm lint:fix

# Install & configure simple-git-hooks
pnpm prepare

# Release project
pnpm release

# Preview project
pnpm preview

# Check type
pnpm typecheck

# Update package
pnpm update-pkg
```

## Features

- Cutting-edge technology application: using the latest popular technology stack such as Vue 3, Vite 6, TypeScript, Pinia and UnoCSS.
- Clear project architecture: using pnpm monorepo architecture, clear structure, elegant and easy to understand.
- Strict code specifications: follow the [Antfu Eslint Config](https://eslint-config.antfu.me/), integrate eslint and simple-git-hooks to ensure the code is standardized.
- TypeScript: support strict type checking to improve code maintainability.
- Rich theme configuration: built-in a variety of theme configurations, perfectly integrated with UnoCSS.
- Built-in internationalization solution: easily realize multi-language support.
- Automated file routing system: automatically generate route import, declaration and type. For more details, please refer to [unplugin-vue-router](https://github.com/posva/unplugin-vue-router) & [vite-plugin-vue-layouts-next](https://github.com/loicduong/vite-plugin-vue-layouts-next).
- Flexible permission routing: support both front-end static routing and back-end dynamic routing.
- Rich page components: built-in a variety of pages and components, including 403, 404, 500 pages, as well as layout components, tag components, theme configuration components, etc.
- Command line tool: built-in efficient command line tool, git commit, delete file, release, etc.
- Mobile adaptation: perfectly support mobile terminal to realize adaptive layout.
- Components auto importing: [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) & [unplugin-icons](https://github.com/unplugin/unplugin-icons).
- APIs auto importing: use [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import) to import APIs directly.
- Deploy on Vercel, zero-config.
- Apply [standard-readme](https://github.com/RichardLitt/standard-readme) to ensure the quality of the README file.
- PWA

## Browser Support

It is recommended to use the latest version of Chrome in development for a better experience.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/archive/internet-explorer_9-11/internet-explorer_9-11_48x48.png" alt="IE" width="24px" height="24px"  />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/) |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| not support                                                                                                                                                                                                                             | last 2 versions                                                                                                                                                                               | last 2 versions                                                                                                                                                                                       | last 2 versions                                                                                                                                                                                    | last 2 versions                                                                                                                                                                                    |

## Maintainer

[Loic Duong](https://github.com/loicduong)

## Contributing

See [the contributing file](CONTRIBUTING.md). PRs accepted.

## License

[MIT © 2024 Loic Duong](./LICENSE)
