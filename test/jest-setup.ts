import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'jest-styled-components';

process.env.NEXT_PUBLIC_MAINNET_URL =
  'https://eth-mainnet.g.alchemy.com/v2/demo';
process.env.NEXT_PUBLIC_GOERLI_URL = 'https://eth-goerli.g.alchemy.com/v2/demo';
process.env.NEXT_PUBLIC_GNOSIS_URL = 'https://eth-gnosis.g.alchemy.com/v2/demo';
process.env.NEXT_PUBLIC_POLYGON_URL =
  'https://eth-polygon.g.alchemy.com/v2/demo';
process.env.NEXT_PUBLIC_POLYGON_MUMBAI_URL =
  'https://eth-polygon-mumbai.g.alchemy.com/v2/demo';
process.env.NEXT_PUBLIC_GNOSIS_CHIADO_URL =
  'https://eth-gnposis-chido.g.alchemy.com/v2/demo';
process.env.NEXT_PUBLIC_AUTONOLAS_URL =
  'https://eth-autonolas.g.alchemy.com/v2/demo';
