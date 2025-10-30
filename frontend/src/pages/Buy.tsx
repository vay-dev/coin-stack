import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ShoppingCart, CreditCard, AlertCircle } from "lucide-react";
import { cryptoService } from "../services/crypto";
import type { Crypto } from "../types/crypto";
import { formatCurrency } from "../utils/format";
import { useAuthStore } from "../store/useAuthStore";

export const Buy = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [cryptos, setCryptos] = useState<Crypto[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<Crypto | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchCryptos = async () => {
      try {
        setLoading(true);
        const data = await cryptoService.getAll(1, 100);
        setCryptos(data.results);

        const coinId = searchParams.get("coin");
        if (coinId) {
          const crypto = data.results.find((c) => c.id === parseInt(coinId));
          if (crypto) setSelectedCrypto(crypto);
        }
      } catch (err: any) {
        setError("Failed to load cryptocurrencies");
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, [isAuthenticated, navigate, searchParams]);

  const handleBuy = async () => {
    if (!selectedCrypto) {
      setError("Please select a cryptocurrency");
      return;
    }

    if (quantity <= 0) {
      setError("Quantity must be greater than 0");
      return;
    }

    try {
      setProcessing(true);
      setError("");

      const response = await cryptoService.buy(selectedCrypto.id, quantity);

      // Redirect to Paystack checkout
      window.location.href = response.url;
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to process purchase");
      setProcessing(false);
    }
  };

  const totalAmount = selectedCrypto ? selectedCrypto.price_ngn * quantity : 0;

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          {t("common.loading")}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4">
          <ShoppingCart className="w-8 h-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {t("buy.title")}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Purchase cryptocurrency securely with Paystack
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3 animate-slide-up">
          <AlertCircle
            className="text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5"
            size={20}
          />
          <span className="text-red-700 dark:text-red-400 text-sm">
            {error}
          </span>
        </div>
      )}

      {/* Buy Form */}
      <div className="card p-8 space-y-6">
        {/* Crypto Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("buy.selectCrypto")}
          </label>
          <select
            value={selectedCrypto?.id || ""}
            onChange={(e) => {
              const crypto = cryptos.find(
                (c) => c.id === parseInt(e.target.value)
              );
              setSelectedCrypto(crypto || null);
            }}
            className="input"
          >
            <option value="">Select a cryptocurrency...</option>
            {cryptos.map((crypto) => (
              <option key={crypto.id} value={crypto.id}>
                {crypto.name} ({crypto.symbol}) -{" "}
                {formatCurrency(crypto.price_ngn, "NGN")}
              </option>
            ))}
          </select>
        </div>

        {/* Quantity Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t("buy.quantity")}
          </label>
          <input
            type="number"
            min="0.00000001"
            step="0.00000001"
            value={quantity}
            onChange={(e) => setQuantity(parseFloat(e.target.value) || 0)}
            className="input"
          />
        </div>

        {/* Summary */}
        {selectedCrypto && (
          <div className="p-6 bg-gray-50 dark:bg-gray-900/50 rounded-lg space-y-3 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Cryptocurrency:
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {selectedCrypto.name} ({selectedCrypto.symbol})
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Price per unit:
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {formatCurrency(selectedCrypto.price_ngn, "NGN")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Quantity:
              </span>
              <span className="font-semibold text-gray-900 dark:text-white">
                {quantity}
              </span>
            </div>
            <div className="pt-3 border-t border-gray-300 dark:border-gray-600">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t("buy.totalAmount")}:
                </span>
                <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {formatCurrency(totalAmount, "NGN")}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Buy Button */}
        <button
          onClick={handleBuy}
          disabled={!selectedCrypto || quantity <= 0 || processing}
          className="w-full flex items-center justify-center space-x-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg"
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <CreditCard size={20} />
              <span>{t("buy.buyButton")}</span>
            </>
          )}
        </button>

        {/* Payment Info */}
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            💳 You will be redirected to Paystack to complete your payment
            securely. Your purchase will be processed instantly.
          </p>
        </div>
      </div>
    </div>
  );
};
