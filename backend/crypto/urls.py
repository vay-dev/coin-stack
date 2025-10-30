# crypto/urls.py
from django.urls import path
from .views import CryptoListView, CryptoDetailView, CryptoCreateView
from .paystack_views import CryptoBuyView

urlpatterns = [
    path('', CryptoListView.as_view(), name='crypto-list'),
    path('<int:pk>/', CryptoDetailView.as_view(), name='crypto-detail'),
    path('create/', CryptoCreateView.as_view(), name='crypto-create'),
    path('buy/', CryptoBuyView.as_view(), name="crypto-but")
]
