from django.db import models


class Crypto(models.Model):
    cmc_id = models.IntegerField(unique=True)
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=20)
    slug = models.CharField(max_length=50)
    num_market_pairs = models.IntegerField()
    date_added = models.DateTimeField()
    tags = models.JSONField(blank=True, null=True)
    max_supply = models.FloatField(null=True, blank=True)
    circulating_supply = models.FloatField()
    total_supply = models.FloatField()
    infinite_supply = models.BooleanField(default=False)
    platform = models.CharField(max_length=100, null=True, blank=True)
    cmc_rank = models.IntegerField()
    last_updated = models.DateTimeField()
    price_usd = models.FloatField()
    price_ngn = models.FloatField()

    def __str__(self):
        return f"{self.name} ({self.symbol})"
