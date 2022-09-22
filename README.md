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
