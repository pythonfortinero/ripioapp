from userapp.serializers import UserMoneyBalanceSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from userapp.models import SpaUser
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def money_balance(request, user_id):
    if request.method == 'GET':
        exchange = SpaUser.objects.filter(id=user_id)
        serializer = UserMoneyBalanceSerializer(exchange, many=True)
        return Response(serializer.data)
