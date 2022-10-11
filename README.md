# Autonolas Frontend Library

This repository contains the common UI modules/components for [Autonolas](https://www.autonolas.network/) frontends.

## Tech Stack

- web3.js
- ReactJS
- NextJS
- Styled-components
- Ant Design
- React-testing-library
- Jest

# Note
- To avoid multiple react packages please do the following:

1. In Application:
a) cd node_modules/react && npm link
b) cd node_modules/react-dom && npm link

2. In Library
a) npm link react
b) npm link react-dom

### Working with components in autonolas-frontend-library

When developing changes in the `autonolas-frontend-library` repo that you wish to see in any other repository, let's take for example `autonolas-protocol-frontend`, follow the yarn linking process to resolve this dependency locally rather than downloading the published library package.

1. In `autonolas-frontend-library`, run `yarn link`. This creates a symlink on your machine pointing to the library. You may require sudo permissions to run this command.
2. In `autonolas-protocol-frontend`, run `yarn link autonolas-frontend-library`. This tells yarn to get the library from your symlink instead of downloading the package from GitHub.

Once the package is linked, run `yarn run build:watch` in the `autonolas-frontend-library` repo, make changes, and see them hot reloaded into `autonolas-protocol-frontend`.

Once you are done developing in `autonolas-frontend-library`, you can follow the steps below to unlink the local package. Otherwise, you may see issues if your `autonolas-frontend-library` repo is not up to date.

1. In `autonolas-protocol-frontend`, run `yarn unlink --no-save autonolas-frontend-library`. The `--no-save` flag is important to ensure that the dependency is not removed from `package.json` and `yarn.lock`.
2. In `autonolas-protocol-frontend`, run `yarn install autonolas-frontend-library` to fetch the latest published version from GitHub.
3. In `autonolas-frontend-library`, run `yarn unlink` to delete the symlink created by yarn. You may require sudo permissions to run this command.

## Steps to update autonolas-frontend-library package to latest version

1. Find the entry for `autonolas-frontend-library` in `package.json`
2. Copy the short hash of the latest commit on [autonolas-frontend-library master](https://github.com/valory-xyz/autonolas-frontend-library/commits/main)
3. Paste the hash into the github link that controls the `autonolas-frontend-library` version in `package.json`
4. Run `yarn` to also update package-lock.json
5. Open a PR with these changes.
