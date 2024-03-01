import Image from 'next/image';
import ethIcon from '@/public/ethereum-icon.svg';
import { useEffect } from 'react';
import { selectCryptoETHPrice, useDispatch, useSelector } from '@/lib/redux';
import { getCryptoPrice } from '@/lib/redux/slices/mainSlice/thunks';

export const EthPriceBlock = () => {
   const currentETHPrice = useSelector(selectCryptoETHPrice);
   const dispatch = useDispatch();

   useEffect(() => {
      (async () => {
         dispatch(getCryptoPrice());
      })();
   }, []);

   return (
      <div
         title='Click to update'
         onClick={() => {
            dispatch(getCryptoPrice());
         }}
         className={'eth-price-container'}
      >
         <Image src={ethIcon} className='eth-icon' alt='eth' />
         <span className={'eth-price-text'}>{currentETHPrice + '$'}</span>
      </div>
   );
};
