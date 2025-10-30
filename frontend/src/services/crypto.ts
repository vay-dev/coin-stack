import api from "./api";
import type { Crypto, CryptoListResponse, BuyResponse } from "../types/crypto";

export const cryptoService = {
  getAll: async (
    page: number = 1,
    pageSize: number = 50
  ): Promise<CryptoListResponse> => {
    const response = await api.get<CryptoListResponse>("/api/cryptos/", {
      params: { page, page_size: pageSize },
    });
    return response.data;
  },

  getById: async (id: number): Promise<Crypto> => {
    const response = await api.get<Crypto>(`/api/cryptos/${id}/`);
    return response.data;
  },

  buy: async (coinId: number, quantity: number = 1): Promise<BuyResponse> => {
    const response = await api.post<BuyResponse>("/api/cryptos/buy/", {
      coin_id: coinId,
      quantity,
    });
    return response.data;
  },
};
