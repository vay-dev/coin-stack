export interface Crypto {
  id: number;
  cmc_id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: string[] | null;
  max_supply: number | null;
  circulating_supply: number;
  total_supply: number;
  infinite_supply: boolean;
  platform: string | null;
  cmc_rank: number;
  last_updated: string;
  price_usd: number;
  price_ngn: number;
}

export interface CryptoListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Crypto[];
}

export interface BuyResponse {
  url: string;
  reference: string;
}
