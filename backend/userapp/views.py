from userapp.serializers import UserMoneyBalanceSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from userapp.models import SpaUser
from rest_framework.response import Response
from userapp.documents import SpaUserDocument


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def money_balance(request, user_id):
    if request.method == 'GET':
        exchange = SpaUser.objects.filter(id=user_id)
        serializer = UserMoneyBalanceSerializer(exchange, many=True)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def search_mail(request):
    email = request.GET.get('email')
    print("llego", email)
    docs = SpaUserDocument.search().query("match", email=email)
    return Response([{'email': d.email, "id": d.id} for d in docs])
