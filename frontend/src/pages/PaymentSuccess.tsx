import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle, Home, ArrowRight, Copy, Check } from 'lucide-react';

export const PaymentSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(10);
  const [copied, setCopied] = useState(false);

  const reference = searchParams.get('reference') || searchParams.get('trxref');

  useEffect(() => {
    // Auto redirect after 10 seconds
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const handleCopyReference = () => {
    if (reference) {
      navigator.clipboard.writeText(reference);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl animate-fade-in">
        <div className="card p-8 md:p-12 text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-green-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-full">
                <CheckCircle className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="space-y-3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
              Payment Successful! 🎉
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Your cryptocurrency purchase has been processed successfully.
            </p>
          </div>

          {/* Transaction Reference */}
          {reference && (
            <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 space-y-2">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Transaction Reference
              </p>
              <div className="flex items-center justify-center gap-2">
                <code className="text-lg font-mono font-semibold text-primary-600 dark:text-primary-400 break-all">
                  {reference}
                </code>
                <button
                  onClick={handleCopyReference}
                  className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 active:scale-95"
                  title="Copy reference"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-600" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Info Box */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              📧 A confirmation email has been sent to your registered email address with the transaction details.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={() => navigate('/')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg"
            >
              <Home size={20} />
              <span>Go to Home</span>
            </button>
            <button
              onClick={() => navigate('/buy')}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-semibold rounded-lg transition-all duration-200 active:scale-95"
            >
              <span>Buy More</span>
              <ArrowRight size={20} />
            </button>
          </div>

          {/* Auto Redirect Notice */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Automatically redirecting to home in{' '}
              <span className="font-bold text-primary-600 dark:text-primary-400">
                {countdown}
              </span>{' '}
              seconds
            </p>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="card p-4 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Instant</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Processing</p>
          </div>
          <div className="card p-4 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Secure</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Payment</p>
          </div>
          <div className="card p-4 text-center">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Verified</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Transaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};
