import {
   selectCurrentList,
   selectCurrentLoadingStatus,
   useSelector,
} from '@/lib/redux';
import Image from 'next/image';
import loadingSVG from '@/public/loading.svg';

export const Loader = () => {
   const status = useSelector(selectCurrentLoadingStatus);
   const currentList = useSelector(selectCurrentList);
   return (
      <>
         {status !== 'loading' ? (
            <span>{currentList.length}</span>
         ) : (
            <div className='img-container'>
               <Image
                  src={loadingSVG}
                  hidden={status !== 'loading'}
                  className='loading-svg'
                  alt='loading-svg'
               />
            </div>
         )}
      </>
   );
};
