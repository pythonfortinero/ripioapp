from rest_framework import serializers
from monedaapp.models import Exchange, ExchangeRow


class MoneyTransferRowSerializer(serializers.ModelSerializer):

    class Meta:
        model = ExchangeRow
        fields = ('user_id', 'money_in', 'money_out')


class MoneyTransferSerializer(serializers.ModelSerializer):
    rows = MoneyTransferRowSerializer(many=True)

    class Meta:
        model = Exchange
        fields = '__all__'
