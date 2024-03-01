import { createSlice } from '@reduxjs/toolkit';
import { IParsedNFT, PAGE_TYPE, SORT_TYPE } from '@/interfaces/interfaces';
import {
   getCryptoPrice,
   getNftDetails,
   getNftList,
} from '@/lib/redux/slices/mainSlice/thunks';
import { isNil, round } from 'lodash';
import {
   filterIdsToFetch,
   recalculateCurrentPrice,
   sortList,
   supplementListItems,
} from '@/lib/redux/slices/mainSlice/utils/helpers';

const initialState: ListSliceState = {
   value: {
      ethPrice: 0,
      walletAddress: '',
      isSettingsPopup: false,
      currentPage: PAGE_TYPE.OWNED_LIST,
      currentFetchingPage: null,
      ownedList: {
         list: [],
         idsToFetch: [],
      },
      listingsList: {
         list: [],
         idsToFetch: [],
      },
      sorter: {
         sortType: SORT_TYPE.POINT_PRICE,
         descending: true,
      },
      allowToSendNextRequest: true,
   },
   status: 'idle',
};

export const mainSlice = createSlice({
   name: 'list',
   initialState,
   reducers: {
      sortList: (state, action) => {
         if (isNaN(action.payload)) {
            return;
         }
         if (state.value.sorter.sortType === action.payload) {
            state.value.sorter.descending = !state.value.sorter.descending;
         } else {
            state.value.sorter.sortType = action.payload;
            state.value.sorter.descending = true;
         }

         state.value.ownedList.list = sortList(
            state.value.ownedList.list,
            state.value.sorter
         );

         state.value.listingsList.list = sortList(
            state.value.listingsList.list,
            state.value.sorter
         );
      },
      clearList: (state, action) => {
         if (action.payload === PAGE_TYPE.OWNED_LIST) {
            state.value.ownedList.list = [];
            state.value.ownedList.idsToFetch = [];
         }
         if (action.payload === PAGE_TYPE.LISTINGS_LIST) {
            state.value.listingsList.list = [];
            state.value.listingsList.idsToFetch = [];
         }
      },
      setCurrentPage: (state, action) => {
         state.value.currentPage = action.payload;
      },
      setCurrentFetchingPage: (state, action) => {
         state.value.currentFetchingPage = action.payload;
      },
      setWalletAddress: (state, action) => {
         if (state.value.walletAddress !== action.payload) {
            state.value.walletAddress = action.payload;
            state.value.ownedList.list = [];
            state.value.ownedList.idsToFetch = [];
         }
      },
      toggleSettingsPopup: (state) => {
         state.value.isSettingsPopup = !state.value.isSettingsPopup;
      },
   },

   extraReducers: (builder) => {
      builder
         .addCase(getNftList.fulfilled, (state, action) => {
            const idsToFetch: number[] = [];
            const nftList: IParsedNFT[] = action.payload.map((nft) => {
               if (!isNil(nft.nftPrice)) {
                  nft.usdtPrice = round(state.value.ethPrice * nft.nftPrice);
               }
               if (isNil(nft.points)) {
                  idsToFetch.push(nft.id);
               } else {
                  nft.pointPrice = round(nft.usdtPrice / nft.points, 3);
               }
               return nft;
            });

            if (state.value.currentFetchingPage === PAGE_TYPE.OWNED_LIST) {
               state.value.ownedList.idsToFetch = [
                  ...state.value.ownedList.idsToFetch,
                  ...idsToFetch,
               ];

               state.value.ownedList.list = sortList(
                  [...state.value.ownedList.list, ...nftList],
                  state.value.sorter
               );
            }
            if (state.value.currentFetchingPage === PAGE_TYPE.LISTINGS_LIST) {
               state.value.listingsList.idsToFetch = [
                  ...state.value.listingsList.idsToFetch,
                  ...idsToFetch,
               ];

               state.value.listingsList.list = sortList(
                  [...state.value.listingsList.list, ...nftList],
                  state.value.sorter
               );
            }
            state.value.currentFetchingPage = null;
            state.status = 'idle';
         })
         .addCase(getNftDetails.fulfilled, (state, action) => {
            if (state.value.currentPage === PAGE_TYPE.OWNED_LIST) {
               state.value.ownedList.idsToFetch = filterIdsToFetch(
                  state.value.ownedList.idsToFetch,
                  action.payload.id
               );
               state.value.ownedList.list = sortList(
                  supplementListItems(
                     state.value.ownedList.list,
                     action.payload,
                     state.value.ethPrice
                  ),
                  state.value.sorter
               );
            }

            if (state.value.currentPage === PAGE_TYPE.LISTINGS_LIST) {
               state.value.listingsList.idsToFetch = filterIdsToFetch(
                  state.value.listingsList.idsToFetch,
                  action.payload.id
               );
               state.value.listingsList.list = sortList(
                  supplementListItems(
                     state.value.listingsList.list,
                     action.payload,
                     state.value.ethPrice
                  ),
                  state.value.sorter
               );
            }
            state.status = 'idle';
         })
         .addCase(getCryptoPrice.fulfilled, (state, action) => {
            state.status = 'idle';
            state.value.ethPrice = action.payload;
            state.value.ownedList.list = sortList(
               recalculateCurrentPrice(
                  state.value.ownedList.list,
                  action.payload
               ),
               state.value.sorter
            );

            state.value.listingsList.list = sortList(
               recalculateCurrentPrice(
                  state.value.listingsList.list,
                  action.payload
               ),
               state.value.sorter
            );
         })

         .addCase(getNftList.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(getNftDetails.pending, (state) => {
            state.status = 'loading';
         })
         .addCase(getCryptoPrice.pending, (state) => {
            state.status = 'loading';
         })

         .addCase(getNftList.rejected, (state, action) => {
            state.status = 'failed';
         })
         .addCase(getNftDetails.rejected, (state, action) => {
            state.status = 'failed';
         })
         .addCase(getCryptoPrice.rejected, (state, action) => {
            state.status = 'failed';
         });
   },
});

export interface ListSliceState {
   value: {
      ethPrice: number;
      walletAddress: string;
      isSettingsPopup: boolean;
      currentPage: PAGE_TYPE;
      currentFetchingPage: PAGE_TYPE | null;
      ownedList: IListObject;
      listingsList: IListObject;
      sorter: ISorterState;
      allowToSendNextRequest: boolean;
   };
   status: 'idle' | 'loading' | 'failed';
}

export interface ISorterState {
   sortType: SORT_TYPE;
   descending: boolean;
}

export interface IListObject {
   list: IParsedNFT[];
   idsToFetch: number[];
}
