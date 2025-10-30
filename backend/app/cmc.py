import requests
from datetime import datetime
from crypto.models import Crypto
import os
from dotenv import load_dotenv

load_dotenv()
APIKEY = os.getenv("APIKEY")


def fetch_and_save_coins():
    headers = {
        "X-CMC_PRO_API_KEY": APIKEY,
        "Content-Type": "application/json"
    }

    url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=5000"
    response = requests.get(url, headers=headers)
    data = response.json()

    for coin in data['data']:
        price_usd = coin['quote']['USD']['price']
        price_ngn = price_usd * 1500  # simple conversion

        # Convert string datetime to Python datetime
        date_added = datetime.fromisoformat(
            coin['date_added'].replace("Z", "+00:00"))
        last_updated = datetime.fromisoformat(
            coin['quote']['USD']['last_updated'].replace("Z", "+00:00"))

        crypto_obj, created = Crypto.objects.update_or_create(
            cmc_id=coin['id'],
            defaults={
                'name': coin['name'],
                'symbol': coin['symbol'],
                'slug': coin['slug'],
                'num_market_pairs': coin['num_market_pairs'],
                'date_added': date_added,
                'tags': coin.get('tags', []),
                'max_supply': coin['max_supply'],
                'circulating_supply': coin['circulating_supply'],
                'total_supply': coin['total_supply'],
                'infinite_supply': coin['infinite_supply'],
                'platform': coin['platform']['name'] if coin['platform'] else None,
                'cmc_rank': coin['cmc_rank'],
                'last_updated': last_updated,
                'price_usd': price_usd,
                'price_ngn': price_ngn
            }
        )

    print("All coins saved/updated successfully!")
