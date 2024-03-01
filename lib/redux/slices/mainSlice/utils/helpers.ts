import { IParsedNFT, ITotalInfo, SORT_TYPE } from '@/interfaces/interfaces';
import { ISorterState } from '@/lib/redux';
import { isNil, isNumber, round } from 'lodash';

export const calculateOwnerSummary = (nftList: IParsedNFT[]) => {
   const ownerSummary: ITotalInfo = {
      amountOfNft: 0,
      totalPoints: 0,
      totalNftsPrice: 0,
      totalUSDTPrice: 0,
      averagePointPrice: 0,
   };
   let amountItemsWithPoints = 0;
   nftList.forEach((nftDetails) => {
      if (isNumber(nftDetails.points)) {
         ownerSummary.totalPoints += nftDetails.points;
      }
      if (isNumber(nftDetails.nftPrice)) {
         ownerSummary.totalNftsPrice += nftDetails.nftPrice;
      }

      ownerSummary.totalUSDTPrice += nftDetails.usdtPrice;
      if (isFinite(nftDetails.pointPrice)) {
         ownerSummary.averagePointPrice += nftDetails.pointPrice;
         amountItemsWithPoints++;
      }
   });

   ownerSummary.amountOfNft = nftList.length;
   ownerSummary.totalUSDTPrice = round(ownerSummary.totalUSDTPrice, 3);
   ownerSummary.totalNftsPrice = round(ownerSummary.totalNftsPrice, 3);
   if (amountItemsWithPoints > 0) {
      ownerSummary.averagePointPrice /= amountItemsWithPoints;
      ownerSummary.averagePointPrice = round(
         ownerSummary.totalUSDTPrice / ownerSummary.totalPoints,
         2
      );
   }

   if (!isFinite(ownerSummary.averagePointPrice)) {
      ownerSummary.averagePointPrice = ownerSummary.totalUSDTPrice;
   }

   return ownerSummary;
};

export const sortList = (nftList: IParsedNFT[], sorter: ISorterState) => {
   return nftList.sort((itemPrev, itemNext) => {
      let a;
      let b;
      if (sorter.descending) {
         a = itemPrev;
         b = itemNext;
      } else {
         a = itemNext;
         b = itemPrev;
      }
      switch (sorter.sortType) {
         case SORT_TYPE.TYPE: {
            if (!isNil(a.type) && !isNil(b.type)) {
               if (a.type < b.type) {
                  return -1;
               }
               if (a.type > b.type) {
                  return 1;
               }
               return 0;
            }
         }
         case SORT_TYPE.POINTS: {
            if (!isNil(a.points) && !isNil(b.points)) {
               return a.points - b.points;
            }
         }
         case SORT_TYPE.ID: {
            return a.id - b.id;
         }
         case SORT_TYPE.USDT_PRICE: {
            return a.usdtPrice - b.usdtPrice;
         }

         case SORT_TYPE.POINT_PRICE: {
            return a.pointPrice - b.pointPrice;
         }

         case SORT_TYPE.ETH_PRICE: {
            if (!isNil(a.nftPrice) && !isNil(b.nftPrice)) {
               return a.nftPrice - b.nftPrice;
            }
         }
         default: {
            return a.id - b.id;
         }
      }
   });
};

export const filterIdsToFetch = (idsToFetch: number[], idFetched: number) => {
   return idsToFetch.filter((id) => {
      return id !== idFetched;
   });
};

export const recalculateCurrentPrice = (
   nftList: IParsedNFT[],
   currentETHPrice: number
) => {
   return nftList.map((nft) => {
      if (!isNil(nft.nftPrice)) {
         nft.usdtPrice = round(currentETHPrice * nft.nftPrice);
         if (!isNil(nft.points)) {
            nft.pointPrice = round(nft.usdtPrice / nft.points, 3);
         }
      }
      return nft;
   });
};

export const supplementListItems = (
   currentNFTList: IParsedNFT[],
   fetchedNFT: IParsedNFT,
   ETHPrice: number
) => {
   return currentNFTList.map((nft) => {
      if (nft.id === fetchedNFT.id) {
         if (isNil(nft.imgSrc)) {
            nft.imgSrc = fetchedNFT.imgSrc;
         }
         if (isNil(nft.marketplaceLink)) {
            nft.marketplaceLink = fetchedNFT.marketplaceLink;
         }
         if (isNil(nft.type)) {
            nft.type = fetchedNFT.type;
         }
         if (isNil(nft.points)) {
            nft.points = fetchedNFT.points;
         }
         if (isNil(nft.nftPrice)) {
            nft.nftPrice = fetchedNFT.nftPrice;
         }
         if (isNil(nft.usdtPrice) && !isNil(nft.nftPrice)) {
            nft.usdtPrice = nft.nftPrice * ETHPrice;
         }
         if (!isNil(nft.points) && !isNil(nft.usdtPrice)) {
            nft.pointPrice = round(nft.usdtPrice / nft.points, 3);
         }
      }
      return nft;
   });
};
