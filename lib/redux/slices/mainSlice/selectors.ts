import type { ReduxState } from '@/lib/redux';
import { createSelector } from 'reselect';
import { calculateOwnerSummary } from '@/lib/redux/slices/mainSlice/utils/helpers';
import { PAGE_TYPE } from '@/interfaces/interfaces';

export const selectCurrentPage = createSelector(
   [(state) => state.main.value.currentPage],
   (currentPage) => {
      return currentPage;
   }
);

export const selectWalletAddress = createSelector(
   [(state) => state.main.value.walletAddress],
   (currentPage) => {
      return currentPage;
   }
);

export const selectCurrentIdsToFetch = createSelector(
   [(state) => state.main],
   (mainState) => {
      const { currentPage, ownedList, listingsList } = mainState.value;

      switch (currentPage) {
         case PAGE_TYPE.OWNED_LIST:
            return ownedList.idsToFetch;
         case PAGE_TYPE.LISTINGS_LIST:
            return listingsList.idsToFetch;
         default:
            return [];
      }
   }
);

export const selectIsSettingsPopup = createSelector(
   [(state) => state.main.value.isSettingsPopup],
   (isSettingsPopup) => isSettingsPopup
);

export const selectCurrentList = createSelector(
   [(state) => state.main],
   (mainState) => {
      const { currentPage, ownedList, listingsList } = mainState.value;

      switch (currentPage) {
         case PAGE_TYPE.OWNED_LIST:
            return ownedList.list;
         case PAGE_TYPE.LISTINGS_LIST:
            return listingsList.list;
         default:
            return [];
      }
   }
);

export const selectSorterState = createSelector(
   [(state) => state.main.value.sorter],
   (sorterState) => {
      return sorterState;
   }
);

export const selectCryptoETHPrice = (state: ReduxState) =>
   state.main.value.ethPrice;

export const selectOwnerSummary = createSelector(
   [(state) => state.main.value.ownedList.list],
   (nftList) => {
      return calculateOwnerSummary(nftList);
   }
);

export const selectCurrentLoadingStatus = createSelector(
   [(state) => state.main.status],
   (status) => {
      return status;
   }
);
