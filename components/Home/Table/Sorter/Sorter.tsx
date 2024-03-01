import { PAGE_TYPE, SORT_TYPE } from '@/interfaces/interfaces';
import {
   mainSlice,
   selectCurrentPage,
   selectSorterState,
   useDispatch,
   useSelector,
} from '@/lib/redux';
import { Loader } from '@/components/Home/Table/Sorter/Loader/Loader';
import React from 'react';
import { getClassNameOfSortType } from '@/components/Home/Table/Sorter/helpers';

export const Sorter = () => {
   const dispatch = useDispatch();
   const currentSorterState = useSelector(selectSorterState);
   const currentPage = useSelector(selectCurrentPage);

   const onClick = (event: any): void => {
      const targetSortType: SORT_TYPE = Number(event.target.dataset.sortType);
      dispatch(mainSlice.actions.sortList(targetSortType));
   };
   return (
      <thead className='thead-container' onClick={onClick}>
         <tr className='table-th'>
            <th className='loading-container'>
               <Loader />
            </th>
            <th
               className={getClassNameOfSortType(
                  currentSorterState,
                  SORT_TYPE.TYPE
               )}
               data-sort-type={SORT_TYPE.TYPE}
            >
               Type
            </th>
            <th
               className={getClassNameOfSortType(
                  currentSorterState,
                  SORT_TYPE.ID
               )}
               data-sort-type={SORT_TYPE.ID}
            >
               ID
            </th>
            <th
               className={getClassNameOfSortType(
                  currentSorterState,
                  SORT_TYPE.POINTS
               )}
               data-sort-type={SORT_TYPE.POINTS}
            >
               Points
            </th>
            <th
               className={getClassNameOfSortType(
                  currentSorterState,
                  SORT_TYPE.ETH_PRICE
               )}
               data-sort-type={SORT_TYPE.ETH_PRICE}
            >
               {currentPage === PAGE_TYPE.OWNED_LIST
                  ? 'Last Price (Sale/Mint)'
                  : currentPage === PAGE_TYPE.LISTINGS_LIST
                    ? 'ETH Price'
                    : ''}
            </th>
            <th
               className={getClassNameOfSortType(
                  currentSorterState,
                  SORT_TYPE.USDT_PRICE
               )}
               data-sort-type={SORT_TYPE.USDT_PRICE}
            >
               USDT Price
            </th>
            <th
               className={getClassNameOfSortType(
                  currentSorterState,
                  SORT_TYPE.POINT_PRICE
               )}
               data-sort-type={SORT_TYPE.POINT_PRICE}
            >
               Point Price
            </th>
         </tr>
      </thead>
   );
};
