from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Crypto
from app.paystack import make_payment


class CryptoBuyView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        coin_id = request.data.get('coin_id')
        quantity = request.data.get('quantity', 1)

        try:
            coin = Crypto.objects.get(id=coin_id)
        except Crypto.DoesNotExist:
            return Response({"error": "Coin not found"}, status=status.HTTP_404_NOT_FOUND)

        amount = coin.price_ngn * quantity

        # Get user email, use a default if not provided
        email = request.user.email
        if not email:
            email = f"{request.user.username}@example.com"

        try:
            data = make_payment(email=email, amount=amount)
            return Response(data)  # returns 'url' and 'reference' to frontend
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
