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
            "amount": int(amount * 100),  # Convert to kobo and ensure integer
            "callback_url": "http://localhost:5173/payment-success"  # Add callback URL
        }

        response = requests.post(url, headers=headers, data=json.dumps(data))
        response_data = response.json()

        if response.status_code == 200 and response_data.get('status'):
            authorization_url = response_data['data']['authorization_url']
            reference = response_data['data']['reference']
            return {
                "url": authorization_url,
                "reference": reference
            }
        else:
            # Return error from Paystack
            error_message = response_data.get('message', 'Payment initialization failed')
            raise ValueError(f"Paystack error: {error_message}")
    except Exception as error:
        print(f"Payment error: {error}")  # Log for debugging
        raise ValueError(f"Payment processing error: {str(error)}")
