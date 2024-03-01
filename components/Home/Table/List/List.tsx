import {
   useDispatch,
   useSelector,
   selectCurrentPage,
   selectCurrentIdsToFetch,
   selectCurrentList,
   selectWalletAddress,
} from '@/lib/redux';
import { IParsedNFT } from '@/interfaces/interfaces';
import { Item } from '@/components/Home/Table/List/Item/Item';
import { useEffect } from 'react';
import { getNftDetails, getNftList } from '@/lib/redux/slices/mainSlice/thunks';
import { isEmpty } from 'lodash';

export const List = () => {
   const currentPage = useSelector(selectCurrentPage);
   const walletAddress = useSelector(selectWalletAddress);
   const list = useSelector(selectCurrentList);
   const idsToFetch = useSelector(selectCurrentIdsToFetch);
   const dispatch = useDispatch();

   useEffect(() => {
      (async () => {
         if (isEmpty(list)) {
            dispatch(getNftList());
         }
      })();
   }, [currentPage, walletAddress]);

   useEffect(() => {
      (async () => {
         if (!isEmpty(idsToFetch)) {
            dispatch(getNftDetails(idsToFetch[0]));
         }
      })();
   }, [idsToFetch]);

   return (
      <tbody className='tbody-container'>
         {list.map((item: IParsedNFT, index: number) => {
            return (
               <Item
                  key={index}
                  id={item.id}
                  type={item.type}
                  marketplaceLink={item.marketplaceLink}
                  isListed={item.isListed}
                  imgSrc={item.imgSrc}
                  points={item.points}
                  nftPrice={item.nftPrice}
                  usdtPrice={item.usdtPrice}
                  pointPrice={item.pointPrice}
               />
            );
         })}
      </tbody>
   );
};
