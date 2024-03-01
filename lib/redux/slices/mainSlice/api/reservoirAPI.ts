import {
   ILastSalesPriceInfo,
   IParsedNFT,
   IReservoirLastListingsAPIData,
} from '@/interfaces/interfaces';
import axios from 'axios';
import {
   MARKET_LISTING,
   NFT_CONTRACT_ADDRESS,
   NFT_MINT_PRICE,
   RESERVOIR_SETTINGS,
} from '@/settings/settings';
import { parseReservoirNftData } from '@/lib/redux/slices/mainSlice/utils/data-parsers';

export const fetchLastSalePrices = async (
   walletAddress: string
): Promise<ILastSalesPriceInfo[]> => {
   const count = 160;

   const response = await axios.get(
      `https://api.reservoir.tools/users/${walletAddress}/tokens/v9?contract=${NFT_CONTRACT_ADDRESS}&limit=${count}&includeLastSale=true`,
      RESERVOIR_SETTINGS
   );

   return (response.data as IReservoirLastListingsAPIData).tokens.map(
      (data: any) => {
         const tokenId = Number(data.token.tokenId);
         const nftPrice = Number(data.token.lastSale?.price?.amount?.native);
         return {
            tokenId: tokenId,
            nftPrice: nftPrice || NFT_MINT_PRICE.price,
         };
      }
   );
};

export const fetchMarketListingsNFTs = async (): Promise<IParsedNFT[]> => {
   const limit = MARKET_LISTING.limit;
   const sort = 'createdAt';
   const response = await axios.get(
      `https://api.reservoir.tools/orders/asks/v5?contracts=${NFT_CONTRACT_ADDRESS}&limit=${limit}&sortBy=${sort}`,
      RESERVOIR_SETTINGS
   );

   return response.data.orders.map(parseReservoirNftData);
};
