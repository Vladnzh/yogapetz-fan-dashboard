import { gsap } from 'gsap';
import { useState } from 'react';
import { DEV_WALLET } from '@/lib/redux/slices/mainSlice/api/mainAPI';

export const Tips = () => {
   const [copied, setCopied] = useState(false);

   const handleCopyClick = () => {
      setCopied(true);
      navigator.clipboard.writeText(DEV_WALLET).then((r) => {
         gsap.delayedCall(2, () => {
            setCopied(false);
         });
      });
   };

   return (
      <div className='tips-for-dev' onClick={handleCopyClick}>
         <span className={`content ${copied ? 'copied' : ''}`}>
            <span>Send tips to dev </span>
            <div className='tooltip'>{copied ? 'Copied' : 'Copy'}</div>
            {DEV_WALLET}
         </span>
      </div>
   );
};
