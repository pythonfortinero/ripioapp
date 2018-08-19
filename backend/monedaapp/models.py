from django.db import models
from userapp.models import SpaUser


class Exchange(models.Model):

    timestamp = models.DateTimeField(auto_now_add=True)
    description = models.TextField()


class ExchangeRow(models.Model):

    user = models.ForeignKey(SpaUser, on_delete=models.CASCADE)
    exchange = models.ForeignKey(Exchange, on_delete=models.CASCADE)
    money_in = models.FloatField(default=0.)
    money_out = models.FloatField(default=0.)
