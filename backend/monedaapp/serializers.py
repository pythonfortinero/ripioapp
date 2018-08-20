from rest_framework import serializers
from monedaapp.models import Exchange, ExchangeRow


class MoneyTransferRowSerializer(serializers.ModelSerializer):

    class Meta:
        model = ExchangeRow
        fields = ('user', 'money_in', 'money_out')


class MoneyTransferSerializer(serializers.ModelSerializer):
    rows = MoneyTransferRowSerializer(many=True)

    class Meta:
        model = Exchange
        fields = '__all__'

    def create(self, validated_data):
        rows = validated_data.pop('rows')
        new_exchange = Exchange(**validated_data)
        new_exchange.save()
        for row in rows:
            e = ExchangeRow()
            e.user = row['user']
            e.money_in = row['money_in']
            e.money_out = row['money_out']
            e.exchange = new_exchange
            e.save()
        return new_exchange
