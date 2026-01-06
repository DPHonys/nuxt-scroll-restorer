<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# My Module

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

My new Nuxt module for doing amazing things.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/my-module?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->

- ⛰ &nbsp;Foo
- 🚠 &nbsp;Bar
- 🌲 &nbsp;Baz

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add my-module
```

That's it! You can now use My Module in your Nuxt app ✨

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/my-module/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/my-module
[npm-downloads-src]: https://img.shields.io/npm/dm/my-module.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/my-module
[license-src]: https://img.shields.io/npm/l/my-module.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/my-module
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com

---

## TODO Before Publishing

### Implementation

- [x] Finish in-code TODOs
- [ ] Update playground
- [ ] Update dependencies

### Documentation

- [ ] Update README.md with actual documentation:
  - [ ] Replace "My Module" with "Nuxt Scroll Restorer"
  - [ ] Write proper description
  - [ ] Document features (scroll restoration, anchor navigation, lazy content support, Safari workaround)
  - [ ] Add usage examples for `<ScrollRestorer />` component
  - [ ] Add usage examples for `useScrollRestorer()` composable
  - [ ] Document configuration options (`lazyTimeout`, `scrollBehavior`, `anchorBehavior`, `debug`)
  - [ ] Document API methods (`saveScrollPosition`, `scrollToTop`, `disable`, `enable`, etc.)
- [ ] Update badge URLs in README.md (replace `my-module` with `nuxt-scroll-restorer`)

### Package Metadata

- [ ] Update package.json metadata:
  - [ ] Change `description` from "My new Nuxt module" to actual description
  - [ ] Change `repository` from "your-org/my-module" to actual repo URL
- [ ] Create `LICENSE` file (MIT)
- [ ] Create `CHANGELOG.md`
- [ ] Add `.nvmrc` or `engines` field to pin Node.js version

### CI/CD & Quality

- [ ] Add `typecheck` script to package.json (run `test:types` in CI)
- [ ] Set up GitHub Actions CI workflow (lint, typecheck, test:unit, test:e2e)
- [ ] Add import sorting (e.g., `eslint-plugin-import` or `@trivago/prettier-plugin-sort-imports`)
- [ ] Set up automatic changelog generation and npm publishing in CI (e.g., `changelogen` + GitHub Actions release workflow)
- [ ] Publish to JSR (JavaScript Registry)
- [ ] Add test coverage reporting (Codecov/Coveralls)

### Community & Contribution

- [ ] Add `CONTRIBUTING.md` with contribution guidelines
- [ ] Add `CODE_OF_CONDUCT.md`
- [ ] Add GitHub issue templates (bug report, feature request)
- [ ] Add GitHub PR template
- [ ] Add `SECURITY.md` for vulnerability reporting

### Nice-to-Have

- [ ] Set up Renovate or Dependabot for automated dependency updates
- [ ] Consider adding `FUNDING.yml` for sponsorship
