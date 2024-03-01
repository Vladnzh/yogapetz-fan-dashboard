import { useState } from 'react';
import { mainSlice, useDispatch } from '@/lib/redux';
import { PAGE_TYPE } from '@/interfaces/interfaces';
import Image from 'next/image';
import settingsIcon from '@/public/settings.svg';

export const InputWallet = () => {
   const [inputValue, setInputValue] = useState('');
   const [isValid, setIsValid] = useState(false);
   const dispatch = useDispatch();

   const handleInputChange = (event: any) => {
      const value = event.target.value;
      setInputValue(value);
      setIsValid(/^0x[0-9a-fA-F]{40}$/.test(value));
   };

   const handleSearchButtonClick = () => {
      setIsValid(/^0x[0-9a-fA-F]{40}$/.test(inputValue));
      if (isValid) {
         dispatch(mainSlice.actions.setWalletAddress(inputValue));
         dispatch(mainSlice.actions.setCurrentPage(PAGE_TYPE.OWNED_LIST));
      }
   };

   const handleSettingsButtonClick = () => {
      dispatch(mainSlice.actions.toggleSettingsPopup());
   };

   return (
      <div className='input-wallet-container'>
         <div className='input-wallet-wrapper'>
            <input
               type='text'
               className={`input-wallet-input ${isValid ? 'valid' : 'invalid'}`}
               placeholder='Enter wallet address 0x...'
               value={inputValue}
               onChange={handleInputChange}
            />
            <button
               className='input-settings-button'
               onClick={handleSettingsButtonClick}
            >
               <Image
                  className='settings-icon'
                  src={settingsIcon}
                  alt={'settings'}
               />
            </button>

            <button
               className='input-wallet-button'
               onClick={handleSearchButtonClick}
            >
               Search
            </button>
         </div>
      </div>
   );
};
