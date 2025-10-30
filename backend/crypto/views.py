from rest_framework import generics, permissions
from .models import Crypto
from .serializers import CryptoSerializer

# Create your views here.


class CryptoListView(generics.ListAPIView):
    queryset = Crypto.objects.all()
    serializer_class = CryptoSerializer
    permission_classes = [permissions.AllowAny]  # public API

# Retrieve a single coin by ID


class CryptoDetailView(generics.RetrieveAPIView):
    queryset = Crypto.objects.all()
    serializer_class = CryptoSerializer
    permission_classes = [permissions.AllowAny]

# Optional: if admin wants to create/update coins manually


class CryptoCreateView(generics.CreateAPIView):
    queryset = Crypto.objects.all()
    serializer_class = CryptoSerializer
    permission_classes = [permissions.IsAdminUser]
