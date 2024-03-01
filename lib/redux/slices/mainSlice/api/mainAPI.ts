import { IKeungzAPINftData, IParsedNFT } from '@/interfaces/interfaces';
import axios from 'axios';
import { NFT_API_1 } from '@/settings/settings';
import { parseData } from '@/lib/redux/slices/mainSlice/utils/data-parsers';

export const fetchNftDetails = async (id: number): Promise<IParsedNFT> => {
   // keungz genesis API
   const url = `${NFT_API_1 + id}`;
   const response = await axios.get(url);
   return parseData(response.data as IKeungzAPINftData);
};

export const fetchCryptoPrice = async (): Promise<number> => {
   const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price',
      {
         params: {
            ids: 'ethereum',
            vs_currencies: 'usd',
         },
      }
   );

   return response.data.ethereum.usd;
};

export const DEV_WALLET = '0x21D5DEC0E64444283123da588FeE238B6B0Dc0B1';
