from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from monedaapp.models import Exchange
from monedaapp.serializers import MoneyTransferSerializer
# Create your views here.


@login_required(login_url='/accounts/login/')
def index(request):
    return render(request, 'moneda/index.html')


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def exchange_list(request):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        exchange = Exchange.objects.all()
        serializer = MoneyTransferSerializer(exchange, many=True)
        return Response(serializer.data)
