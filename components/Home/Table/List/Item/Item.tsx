'use client';
import { IItem } from '@/interfaces/interfaces';
import Image from 'next/image';

export const Item = (props: IItem) => {
   return (
      <tr
         className={props.isListed ? 'listing' : ''}
         onClick={() => {
            if (props.isListed && props.marketplaceLink) {
               window.open(props.marketplaceLink, '_blank');
            }
         }}
      >
         <td>
            {props.imgSrc && (
               <div className='img-container'>
                  <Image
                     src={props.imgSrc}
                     className='img-nft'
                     width={50}
                     height={50}
                     alt={''}
                  />
               </div>
            )}
         </td>
         <td>{props.type}</td>
         <td>#{props.id}</td>
         <td>{props.points}</td>
         <td>{props.nftPrice + 'E'}</td>
         <td>{props.usdtPrice + '$'}</td>
         <td>{isFinite(props.pointPrice) ? `${props.pointPrice}$` : '???'}</td>
      </tr>
   );
};
