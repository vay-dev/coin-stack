# Create a new file: crypto/pagination.py
from rest_framework.pagination import PageNumberPagination


class CryptoPagination(PageNumberPagination):
    page_size = 50  # Default size
    page_size_query_param = 'page_size'  # Enable ?page_size=X
    max_page_size = 200  # Maximum allowed
