import { createAppAsyncThunk } from '@/lib/redux/slices/mainSlice/utils/decorators';
import { fetchOwnedNfts } from '@/lib/redux/slices/mainSlice/api/alchemyAPI';
import {
   fetchMarketListingsNFTs,
   fetchLastSalePrices,
} from '@/lib/redux/slices/mainSlice/api/reservoirAPI';
import { IParsedNFT, PAGE_TYPE } from '@/interfaces/interfaces';
import {
   fetchCryptoPrice,
   fetchNftDetails,
} from '@/lib/redux/slices/mainSlice/api/mainAPI';
import { isEmpty } from 'lodash';
import { mainSlice } from '@/lib/redux';

export const getNftDetails = createAppAsyncThunk(
   'list/getNftDetails',
   async (id: number) => {
      return await fetchNftDetails(id);
   }
);

export const getNftList = createAppAsyncThunk(
   'list/getNftList',
   async (_, { getState, dispatch }) => {
      const { currentPage, walletAddress, ownedList, listingsList } =
         getState().main.value;

      dispatch(mainSlice.actions.setCurrentFetchingPage(currentPage));

      let nftList: IParsedNFT[] = [];
      if (
         currentPage === PAGE_TYPE.OWNED_LIST &&
         !isEmpty(walletAddress) &&
         isEmpty(ownedList.list)
      ) {
         const myNFTsLastSalePrices = await fetchLastSalePrices(walletAddress);
         nftList = await fetchOwnedNfts(walletAddress);

         nftList = nftList.map((nft) => {
            nft.nftPrice = Number(
               myNFTsLastSalePrices.find(
                  (NFTLastSale) => NFTLastSale.tokenId === nft.id
               )?.nftPrice
            );
            return nft;
         });
      }
      if (
         currentPage === PAGE_TYPE.LISTINGS_LIST &&
         isEmpty(listingsList.list)
      ) {
         nftList = await fetchMarketListingsNFTs();
      }
      return nftList;
   }
);

export const getCryptoPrice = createAppAsyncThunk(
   'cryptoPrice/getCryptoPrice',
   async () => {
      return await fetchCryptoPrice();
   }
);
