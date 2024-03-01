import { selectOwnerSummary, useSelector } from '@/lib/redux';

export const SummaryBlock = () => {
   const {
      amountOfNft,
      totalPoints,
      totalNftsPrice,
      totalUSDTPrice,
      averagePointPrice,
   } = useSelector(selectOwnerSummary);
   return (
      <div className='summary-container'>
         <div className='summary-item-container'>
            <span className='summary-item-title'>Amount of NFT</span>
            <span className='summary-item-title-description'>
               {amountOfNft}
            </span>
         </div>
         <div className='summary-item-container'>
            <span className='summary-item-title'>Total Points</span>
            <span className='summary-item-title-description'>
               {totalPoints}
            </span>
         </div>
         <div className='summary-item-container'>
            <span className='summary-item-title'>Invest on NFTs</span>
            <span className='summary-item-title-description'>
               <span>{totalNftsPrice + 'E '}</span>
               <span>{totalUSDTPrice + '$ '}</span>
            </span>
         </div>
         <div className='summary-item-container'>
            <span className='summary-item-title'>Average Point Price</span>
            <span className='summary-item-title-description'>
               {averagePointPrice ? averagePointPrice : 0} $
            </span>
         </div>
      </div>
   );
};
