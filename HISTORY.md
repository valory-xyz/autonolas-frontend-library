# Release History - `autonolas-frontend-library`

## 0.1.0

- First release candidate of the initial package.

## 0.2.0

- Button props for `wallet-connect`
- Unsupported network for non-dapps

## 0.3.0

- `ServiceStatusInfo` component added

## 0.3.1

- `ServiceStatusInfo` component to have className

## 0.3.2

- `ServiceStatusInfo` component to have callback on-minimize & on-timer-end

## 0.3.3

- `ServiceStatusInfo` component updated

## 0.3.4

- `ServiceStatusInfo` component to support links for different apps such as el-collectooorr, oracle, contribution service.

## 0.3.5

- `ServiceStatusInfo` window reference bug fix

## 0.3.6

- `ServiceStatusInfo` remove `Live Service` link

## 0.3.7

- `ServiceStatusInfo` update for IEKit

## 0.3.8

- `sendTransaction` util function added

## 0.3.9

- `Disclaimer` component added

## 0.3.10

- pass supportedNetworks as props to Login component
- get symbol from chainId
- add support for `gnosis` chain in Login component
- AddressLink component added

## 0.3.11
- Remove LoginV2 component

## 0.3.12
- Add `centerContent` prop to `Footer` component
- Add simple markdown component

## 0.3.13
- Remove simple markdown component

## 0.3.14
- Replace text "Get help building" with "Built by Valory" for appType iekit

## 0.3.15
- function to remove subdomain from url

## 0.3.16
- update `ServiceStatusInfo` minor UX

## 0.3.17
- export `AddressLink` component & added `areAddressesEqual`, `isValidAddress` functions

## 0.3.18
- Text update

## 0.3.19
- Text update

## 0.4.0
- Minify /dist folder using tsup
- updated packages to latest version (Eg. react, react-dom, etc)
- Removed Login component & corresponding unused packages
- Removed fonts folder
- Removed web3 package & related functions (getBalance)

## 0.4.1
- Added govkit, mechkit, keeperkit, messagingkit links
- downgraded few packages version

## 0.4.2
- Update text in ServiceStatusInfo
- "Service Code" in ServiceStatusInfo to be external wherever applicable

## 0.4.3
- Update service ids in ServiceStatusInfo

## 0.4.4
- Disable links in ServiceStatusInfo

## 0.4.5
- Update dependencies & peerDependencies (eg. react, antd, etc)

## 0.4.6
- Move common functions from `regitry-app` to be re-used in other apps

## 0.4.7
- export the functions to be used in other apps
- add `antd` theme 

## 0.4.8
- fix a bug `window: not defined` error in `getCurrentChainId`
- add `getIpfsDetails`
- add `<Loader />` component

## 0.4.9
- update `getProvider` function to pass RPL urls
- copy text in `<AddressLink />` component

## 0.4.10
- add more functionality to `<AddressLink />` component

## 0.4.11
- add more functionality for improving `Tokenomics` App
- update `antd` theme especially for `Alert` component
- `useScreen` hook
- date format function such as `getFormattedDate`, `getFullFormattedDate`, `getCommaSeparatedNumber`

## 0.4.12
- export `AutonolasThemeProvider` component

## 0.4.13
- ethers provider to return JSON RPC provider on specific condition
- countdown bug in `ServiceStatusInfo` component

## 0.4.14
- export format functions

## 0.4.15
- update `notifyError` function to modify error message

## 0.4.16
- Functions to prohibit user from prohibited countries & addresses

## 0.4.17
- Update the functions to prohibit user from prohibited countries & addresses
- Export the JSON files for prohibited countries & addresses

## 0.4.18
- Updated prohibited functionality from JSON to constant

## 0.4.19
- export prohibited functionality to be used in other apps

## 0.4.20
- removed prohibited functionality
