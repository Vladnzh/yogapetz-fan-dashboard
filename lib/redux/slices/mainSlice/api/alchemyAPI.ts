import { Alchemy } from 'alchemy-sdk';
import { IParsedNFT } from '@/interfaces/interfaces';
import { ALCHEMY_SETTINGS, NFT_CONTRACT_ADDRESS } from '@/settings/settings';
import { parseAlchemyOwnedNftData } from '@/lib/redux/slices/mainSlice/utils/data-parsers';

export const alchemy = new Alchemy(ALCHEMY_SETTINGS);

export const fetchOwnedNfts = async (
   walletAddress: string
): Promise<IParsedNFT[]> => {
   const nftForOwner = await alchemy.nft.getNftsForOwner(walletAddress);
   return nftForOwner.ownedNfts
      .filter((nft) => nft.contract.address === NFT_CONTRACT_ADDRESS)
      .map(parseAlchemyOwnedNftData);
};
