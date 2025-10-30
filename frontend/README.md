# CryptoHub Frontend

Modern React + TypeScript frontend for cryptocurrency trading platform with Paystack integration.

## Features

- 🌗 **Dark Mode** - Fully functional dark/light theme with system preference detection
- 🌍 **Multi-language Support** - English, Spanish, and French translations
- 💳 **Paystack Integration** - Secure cryptocurrency purchases
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS and smooth animations
- 📱 **Responsive** - Works perfectly on all devices
- ⚡ **Fast** - Built with Vite for lightning-fast development

## Tech Stack

- **React 19** - Latest React with TypeScript
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Lightweight state management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **i18next** - Internationalization
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Backend server running on `http://localhost:8000`

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Available Pages

- **Home** (`/`) - Browse and search cryptocurrencies
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - Create new account
- **Buy** (`/buy`) - Purchase cryptocurrency with Paystack
- **Settings** (`/settings`) - Manage theme, language, and preferences

## Features in Detail

### Dark Mode
- Three modes: Light, Dark, and System
- Smooth transitions between themes
- Persists user preference in localStorage

### Language Support
- English (🇺🇸)
- Spanish (🇪🇸)
- French (🇫🇷)
- Easy to add more languages

### Payment Integration
- Integrated with Paystack payment gateway
- Secure transaction processing
- Automatic redirect to payment page
- Support for Nigerian Naira (NGN)

### Settings
- Theme switcher (Light/Dark/System)
- Language selector
- Notification preferences
- Account management options

## Project Structure

```
src/
├── components/
│   └── layout/
│       ├── Header.tsx       # Navigation header
│       └── Layout.tsx       # Main layout wrapper
├── pages/
│   ├── Home.tsx            # Crypto listing page
│   ├── Login.tsx           # Login page
│   ├── Register.tsx        # Registration page
│   ├── Buy.tsx             # Purchase page
│   └── Settings.tsx        # Settings page
├── services/
│   ├── api.ts              # Axios configuration
│   ├── auth.ts             # Authentication API
│   └── crypto.ts           # Cryptocurrency API
├── store/
│   ├── useAuthStore.ts     # Auth state management
│   └── useThemeStore.ts    # Theme state management
├── types/
│   ├── crypto.ts           # Crypto type definitions
│   └── user.ts             # User type definitions
├── i18n/
│   ├── en.json             # English translations
│   ├── es.json             # Spanish translations
│   ├── fr.json             # French translations
│   └── index.ts            # i18n configuration
└── utils/
    ├── cn.ts               # Class name utility
    └── format.ts           # Formatting utilities
```

## Backend Configuration

The frontend expects the backend API to be running at `http://localhost:8000`.

### Required Backend Endpoints

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/cryptos/` - List cryptocurrencies
- `GET /api/cryptos/:id/` - Get crypto details
- `POST /api/cryptos/buy/` - Purchase cryptocurrency

### CORS Configuration

The backend needs to allow CORS from `http://localhost:5173`. Add to Django settings:

```python
# Install django-cors-headers first
pip install django-cors-headers

# In settings.py
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]

CORS_ALLOW_CREDENTIALS = True
```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Development Tips

- Use the browser DevTools to test dark mode
- Test different languages in Settings
- Check Network tab for API calls
- The app uses session-based authentication with cookies

## License

MIT
