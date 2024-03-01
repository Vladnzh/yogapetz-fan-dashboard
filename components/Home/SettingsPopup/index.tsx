import { useState } from 'react';
import {
   ALCHEMY_SETTINGS,
   MARKET_LISTING,
   NFT_MINT_PRICE,
   RESERVOIR_SETTINGS,
} from '@/settings/settings';
import {
   mainSlice,
   selectIsSettingsPopup,
   useDispatch,
   useSelector,
} from '@/lib/redux';
import { PAGE_TYPE } from '@/interfaces/interfaces';
import { getNftList } from '@/lib/redux/slices/mainSlice/thunks';
import { Tips } from '@/components/Home/SettingsPopup/Tips/Tips';

export const SettingsPopup = () => {
   const [alchemyApiKey, setAlchemyApiKey] = useState('');
   const [reservoirApiKey, setReservoirApiKey] = useState('');

   const [resultAlchemy, setResultAlchemy] = useState(ALCHEMY_SETTINGS.apiKey);
   const [resultReservoir, setResultReservoir] = useState(
      RESERVOIR_SETTINGS.headers['x-api-key']
   );

   const [nftMintPrice, setNftMintPrice] = useState(
      String(NFT_MINT_PRICE.price)
   );
   const [resultNftMintPrice, setResultNftMintPrice] = useState(
      String(NFT_MINT_PRICE.price)
   );

   const [amountResentMarketListings, setAmountResentMarketListings] = useState(
      String(MARKET_LISTING.limit)
   );
   const [
      resultAmountResentMarketListings,
      setAmountResultResentMarketListings,
   ] = useState(String(MARKET_LISTING.limit));

   const validateNumberInput = (nftMintPrice: string) => {
      const numberPattern = /^$|^[-+]?\d*\.?\d+$/;
      return (
         numberPattern.test(nftMintPrice) &&
         nftMintPrice !== '0' &&
         nftMintPrice !== ''
      );
   };

   const validateNumberInput2 = (amountResentMarketListings: string) => {
      const numberPattern = /^(?:[1-9]\d{0,2}|1000)$/;
      return (
         numberPattern.test(amountResentMarketListings) &&
         amountResentMarketListings !== '0' &&
         amountResentMarketListings !== ''
      );
   };

   const [isValid, setIsValid] = useState(
      validateNumberInput(String(NFT_MINT_PRICE.price))
   );

   const [isValid2, setIsValid2] = useState(
      validateNumberInput2(String(MARKET_LISTING.limit))
   );

   const isSettingsPopup = useSelector(selectIsSettingsPopup);
   const dispatch = useDispatch();

   const handleSetClick = () => {
      if (validateNumberInput(nftMintPrice)) {
         setResultNftMintPrice(nftMintPrice);
         NFT_MINT_PRICE.price = Number(nftMintPrice);
         setIsValid(true);
      } else {
         setIsValid(false);
         setNftMintPrice('');
      }

      if (validateNumberInput2(amountResentMarketListings)) {
         setAmountResultResentMarketListings(amountResentMarketListings);
         MARKET_LISTING.limit = Number(amountResentMarketListings);
         setIsValid2(true);
         dispatch(mainSlice.actions.clearList(PAGE_TYPE.LISTINGS_LIST));
         dispatch(getNftList());
      } else {
         setIsValid2(false);
         setAmountResentMarketListings('');
      }

      setResultAlchemy(alchemyApiKey);
      setResultReservoir(reservoirApiKey);
      ALCHEMY_SETTINGS.apiKey = alchemyApiKey.replace(/\s/g, '');
      RESERVOIR_SETTINGS.headers['x-api-key'] = reservoirApiKey.replace(
         /\s/g,
         ''
      );
   };

   const handleCloseButtonClick = () => {
      dispatch(mainSlice.actions.toggleSettingsPopup());
   };
   return (
      <div className={`popup-overlay ${!isSettingsPopup ? 'hidden' : ''}`}>
         <div className='popup'>
            <div onClick={handleCloseButtonClick} className='close-btn'>
               &times;
            </div>
            <div className='popup-content'>
               <div className='popup-content-api'>
                  <span hidden={!Boolean(resultAlchemy)}>
                     <span>Alchemy API key: </span>
                     {resultAlchemy}
                  </span>
                  <span hidden={!Boolean(resultReservoir)}>
                     <span>Reservoir API key: </span>
                     {resultReservoir}
                  </span>
                  <span>
                     <span>NFT mint price: </span>
                     {resultNftMintPrice}E
                  </span>
                  <span>
                     <span>Amount resent listings: </span>
                     {resultAmountResentMarketListings}
                  </span>
               </div>
               <div>
                  <label>NFT Mint price:</label>
                  <input
                     type='text'
                     className={`input-wallet-input ${isValid ? 'valid' : 'invalid'}`}
                     placeholder='Enter NFT mint price E.g: 0.3'
                     value={nftMintPrice}
                     onChange={(e) => setNftMintPrice(e.target.value)}
                  />
               </div>
               <div>
                  <label>Number of recent listings:</label>
                  <input
                     type='text'
                     className={`input-wallet-input ${isValid2 ? 'valid' : 'invalid'}`}
                     placeholder='Enter number: 1-1000'
                     value={amountResentMarketListings}
                     onChange={(e) =>
                        setAmountResentMarketListings(e.target.value)
                     }
                  />
               </div>
               <div>
                  <label>Alchemy API key:</label>
                  <input
                     type='text'
                     className={`input-wallet-input`}
                     placeholder='Enter Alchemy API key (optional)'
                     value={alchemyApiKey}
                     onChange={(e) => setAlchemyApiKey(e.target.value)}
                  />
               </div>
               <div>
                  <label>Reservoir API key:</label>
                  <input
                     type='text'
                     className={`input-wallet-input`}
                     placeholder='Enter Reservoir API key (optional)'
                     value={reservoirApiKey}
                     onChange={(e) => setReservoirApiKey(e.target.value)}
                  />
               </div>
               <div>
                  <button onClick={handleSetClick}>Update</button>
               </div>
               <Tips />
            </div>
         </div>
         <div className='overlay-blocking'></div>
      </div>
   );
};
