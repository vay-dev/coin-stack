import os
import json
import requests
from dotenv import load_dotenv

load_dotenv()

PAYSTACk = str(os.getenv("PAYSTACKkEY"))


def make_payment(email, amount):
    try:
        url = "https://api.paystack.co/transaction/initialize"

        headers = {
            "Authorization": f"Bearer {PAYSTACk}",
            "Content-Type": "application/json"
        }

        data = {
            "email": email,
            "amount": amount * 100
        }

        response = requests.post(url, headers=headers, data=json.dumps(data))
        if response.status_code == 200:
            data = response.json()
            url = data['data']['authorization_url']
            reference = data['data']['reference']
            return {
                "url": url,
                "reference": reference
            }
        return response.json()
    except Exception as error:
        raise ValueError(error)
