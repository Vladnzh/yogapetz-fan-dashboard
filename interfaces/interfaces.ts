export interface IItem extends IParsedNFT {}

export enum SORT_TYPE {
   TYPE,
   POINTS,
   ID,
   ETH_PRICE,
   USDT_PRICE,
   POINT_PRICE,
}

export enum PAGE_TYPE {
   OWNED_LIST,
   LISTINGS_LIST,
}

export interface ITotalInfo {
   amountOfNft: number;
   totalNftsPrice: number;
   totalPoints: number;
   averagePointPrice: number;
   totalUSDTPrice: number;
}

export interface ILastSalesPriceInfo {
   tokenId: number;
   nftPrice: number;
}

export interface IParsedNFT {
   id: number;
   type: string | null;
   marketplaceLink: string | null;
   isListed: boolean | null;
   imgSrc: string | null;
   points: number | null;
   nftPrice: number | null;
   usdtPrice: number;
   pointPrice: number;
}

export interface IKeungzAPINftData {
   metadata: Metadata;
   layerInfo: LayerInfo;
   boostNFTs: BoostNfts;
   invalidBoostNFTs: InvalidBoostNfts;
   pointInfo: PointInfo;
   pointsPerDay: PointsPerDay;
   revealInfo: RevealInfo;
   totalPoints: TotalPoints;
   nftSlashLogs: NftSlashLogs;
   listings: Listings;
   lastStakedAt: LastStakedAt;
}

export interface IReservoirAPINftData {
   id: string;
   kind: string;
   side: string;
   status: string;
   tokenSetId: string;
   tokenSetSchemaHash: string;
   contract: string;
   contractKind: string;
   maker: string;
   taker: string;
   price: Price;
   validFrom: number;
   validUntil: number;
   quantityFilled: number;
   quantityRemaining: number;
   dynamicPricing: null;
   criteria: Criteria;
   source: Source;
   feeBps: number;
   feeBreakdown: any[];
   expiration: number;
   isReservoir: null;
   isDynamic: boolean;
   createdAt: Date;
   updatedAt: Date;
   originatedAt: Date;
}

export interface IReservoirLastListingsAPIData {
   tokens: TokenElement[];
   continuation: null;
}

interface TokenElement {
   token: TokenToken;
   ownership: Ownership;
}

interface Ownership {
   tokenCount: string;
   onSaleCount: string;
   floorAsk: FloorAsk;
   acquiredAt: Date;
}

interface FloorAsk {
   id: null | string;
   price: FloorAskPriceClass | null;
   maker: null | string;
   kind: null | string;
   validFrom: number | null;
   validUntil: number | null;
   source: Source | null;
}

interface FloorAskPriceClass {
   currency: Currency;
   amount: Amount;
}

interface TokenToken {
   chainId: number;
   contract: string;
   tokenId: string;
   kind: string;
   name: string;
   image: string;
   imageSmall: string;
   imageLarge: string;
   metadata: Metadata;
   description: string;
   rarityScore: number;
   rarityRank: number;
   supply: string;
   remainingSupply: string;
   media: string;
   isFlagged: boolean;
   isSpam: boolean;
   isNsfw: boolean;
   metadataDisabled: boolean;
   lastFlagUpdate: null;
   lastFlagChange: null;
   collection: Collection;
   lastSale: LastSale;
   lastAppraisalValue: number | null;
}

export interface Collection {
   id: string;
   name: string;
   slug: string;
   symbol: string;
   imageUrl: string;
   isSpam: boolean;
   isNsfw: boolean;
   metadataDisabled: boolean;
   openseaVerificationStatus: string;
   floorAskPrice: FloorAskPriceClass;
   royaltiesBps: number;
   royalties: Royalty[];
}

export interface Royalty {
   bps: number;
   recipient: string;
}

export interface LastSale {
   orderSource: null;
   fillSource: null;
   timestamp: number;
   price: LastSalePrice;
   paidFullRoyalty: boolean;
   feeBreakdown: FeeBreakdown[];
   royaltyFeeBps?: number;
}

export interface FeeBreakdown {
   kind: string;
   bps: number;
   recipient: string;
   rawAmount: string;
}

export interface LastSalePrice {
   currency: Currency;
   amount: Amount;
   netAmount?: Amount;
}

// not exported interfaces
interface Metadata {
   [key: string]: N2;
}

interface N2 {
   description: string;
   image: string;
   tokenId: number;
   name: string;
   attributes: Attribute[];
   animation_url: string;
   _tier: number;
   _locked: number;
   _staked: number;
}

interface Attribute {
   trait_type: string;
   value: any;
}

interface LayerInfo {}

interface BoostNfts {
   [key: string]: N22[];
}

interface N22 {
   collection: string;
   tokenId: number;
}

interface InvalidBoostNfts {
   [key: string]: any[];
}

interface PointInfo {
   [key: string]: N23;
}

interface N23 {
   pointNFT: number;
   pointNFTFrozen: number;
   pointNFTRedeemable: number;
   isFrozen: boolean;
   tier: number;
   lastDist: number;
   limboEnd: any;
   lsa: number;
}

interface PointsPerDay {
   [key: string]: number;
}

interface RevealInfo {
   [key: string]: N24;
}

interface N24 {
   lsa: number;
   holdingSince: number;
   owner: string;
   canReveal: boolean;
   canCantReason: string;
   revealedType: any;
   revealTx: any;
}

interface TotalPoints {
   [key: string]: number;
}

interface NftSlashLogs {}

interface Listings {
   [key: string]: string;
}

interface LastStakedAt {
   [key: string]: number;
}

interface Criteria {
   kind: string;
   data: Data;
}

interface Data {
   token: Token;
}

interface Token {
   tokenId: string;
}

interface Price {
   currency: Currency;
   amount: Amount;
   netAmount: Amount;
}

interface Amount {
   raw: string;
   decimal: number;
   usd: number;
   native: number;
}

interface Currency {
   contract: string;
   name: string;
   symbol: string;
   decimals: number;
}

interface Source {
   id: string;
   domain: string;
   name: string;
   icon: string;
   url: string;
}
