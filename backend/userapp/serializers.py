from rest_framework import serializers
from userapp.models import SpaUser


class UserMoneyBalanceSerializer(serializers.ModelSerializer):

    class Meta:
        model = SpaUser
        fields = ('money_balance', 'email')