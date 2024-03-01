import { Network } from 'alchemy-sdk';

export {
   NFT_API_1,
   NFT_CONTRACT_ADDRESS,
   ALCHEMY_SETTINGS,
   RESERVOIR_SETTINGS,
   NFT_MINT_PRICE,
   MARKET_LISTING,
};

// get your own API key on https://www.alchemy.com/
let ALCHEMY_SETTINGS = {
   apiKey: '',
   network: Network.ETH_MAINNET,
};

// get your own API key on https://reservoir.tools/
let RESERVOIR_SETTINGS = {
   method: 'GET',
   headers: {
      accept: '*/*',
      'x-api-key': '',
   },
};

// official YOGAPETZ API
const NFT_API_1: string = 'https://genesis-api.keungz.com/ygpz/info/';

// contract address of YOGAPETZ collection
const NFT_CONTRACT_ADDRESS = '0x142e03367eDE17Cd851477A4287D1F35676E6dC2';

// if no sales used NFT_MINT_PRICE - instead market last sale price
let NFT_MINT_PRICE: { price: number } = {
   price: 0.2,
};

let MARKET_LISTING: { limit: number } = {
   limit: 30,
};
