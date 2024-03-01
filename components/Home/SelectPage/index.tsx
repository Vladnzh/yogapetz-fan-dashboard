import { PAGE_TYPE, SORT_TYPE } from '@/interfaces/interfaces';
import {
   mainSlice,
   selectCurrentPage,
   useDispatch,
   useSelector,
} from '@/lib/redux';
import { getClassNameOfPageType } from '@/components/Home/Table/Sorter/helpers';

export const SelectPage = () => {
   const dispatch = useDispatch();
   const currentPage = useSelector(selectCurrentPage);

   const onClick = (event: any): void => {
      const targetPageType: SORT_TYPE = Number(event.target.dataset.pageType);
      dispatch(mainSlice.actions.setCurrentPage(targetPageType));
   };
   return (
      <div className='select-page-container' onClick={onClick}>
         <div
            className={
               getClassNameOfPageType(currentPage === PAGE_TYPE.OWNED_LIST) +
               'select-page-item'
            }
            data-page-type={PAGE_TYPE.OWNED_LIST}
         >
            Owned
         </div>
         <div
            className={
               getClassNameOfPageType(currentPage === PAGE_TYPE.LISTINGS_LIST) +
               'select-page-item'
            }
            data-page-type={PAGE_TYPE.LISTINGS_LIST}
         >
            Resent Listings
         </div>
      </div>
   );
};
