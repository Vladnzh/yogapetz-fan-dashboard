import {
   IKeungzAPINftData,
   IParsedNFT,
   IReservoirAPINftData,
} from '@/interfaces/interfaces';
import { OwnedNft } from 'alchemy-sdk';

export const parseData = (data: IKeungzAPINftData): IParsedNFT => {
   const id = Number(Object.keys(data.metadata)[0]);
   const points = Math.round(Number(data.pointInfo[id].pointNFT));

   return {
      id: id,
      type: data.metadata[id].name,
      isListed: null,
      marketplaceLink: null,
      imgSrc: data.metadata[id].image,
      points: points,
      nftPrice: null,
      usdtPrice: 0,
      pointPrice: 0,
   };
};

export const parseAlchemyOwnedNftData = (data: OwnedNft): IParsedNFT => {
   return {
      id: Number(data.tokenId),
      type: String(data.name),
      isListed: null,
      marketplaceLink: null,
      imgSrc: data.image.cachedUrl ? String(data.image.cachedUrl) : null,
      points: null,
      nftPrice: null,
      usdtPrice: 0,
      pointPrice: Infinity,
   };
};

export const parseReservoirNftData = (
   data: IReservoirAPINftData
): IParsedNFT => {
   return {
      id: Number(data.criteria.data.token.tokenId),
      type: null,
      isListed: Boolean(data.source.url),
      marketplaceLink: String(data.source.url),
      imgSrc: null,
      points: null,
      nftPrice: Number(data.price.amount.native),
      usdtPrice: 0,
      pointPrice: Infinity,
   };
};
