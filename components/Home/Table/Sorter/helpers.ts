import { ISorterState } from '@/lib/redux';
import { SORT_TYPE } from '@/interfaces/interfaces';

export const getClassNameOfSortType = (
   currentSorterState: ISorterState,
   targetSortType: SORT_TYPE
): string => {
   if (currentSorterState.sortType === targetSortType) {
      return currentSorterState.descending ? 'arrow-down' : 'arrow-up';
   } else {
      return '';
   }
};
export const getClassNameOfPageType = (selected: boolean): string => {
   return selected ? 'selected-page ' : '';
};
